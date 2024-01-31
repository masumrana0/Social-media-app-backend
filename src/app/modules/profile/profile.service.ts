import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IPaginationOptions } from '../../../inerfaces/pagination';
import { IGenericResponse } from '../../../shared/sendResponse';
import { profileSearchableFields } from './profile.constant';
import { IProfile, IProfileFilters } from './profile.interface';
import { Profile } from './profile.model';

const createProfile = async (
    payload: IProfile,
): Promise<IProfile> => {
    const result = await Profile.create(payload);
    return result;
};


const getAllProfile = async (
    filters: IProfileFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProfile[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: profileSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Profile.find(whereConditions)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Profile.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleProfole = async (id: string): Promise<IProfile | null> => {
    const result = await Profile.findOne({ id })
        .populate('user')
    return result;
};

const updateProfile = async (
    id: string,
    payload: Partial<IProfile>
): Promise<IProfile | null> => {
    const isExist = await Profile.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found !');
    }

    const { ...profileData } = payload;

    const updatedProfileData: Partial<IProfile> = { ...profileData };

    const result = await Profile.findOneAndUpdate({ id }, updatedProfileData, {
        new: true,
    })
        .populate('user')
        ;

    return result;
};

const deleteProfile = async (id: string): Promise<IProfile | null> => {
    // check if the Profile is exist
    const isExist = await Profile.findOne({ id });

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found !');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //delete Profile first
        const profile = await Profile.findOneAndDelete({ id }, { session });
        if (!profile) {
            throw new ApiError(404, 'Failed to delete profile');
        }
        //delete user
        await Profile.deleteOne({ id });
        session.commitTransaction();
        session.endSession();

        return profile;
    } catch (error) {
        session.abortTransaction();
        throw error;
    }
};

export const ProfileService = {
    createProfile,
    getAllProfile,
    getSingleProfole,
    updateProfile,
    deleteProfile
};

