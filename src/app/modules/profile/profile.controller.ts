import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { profileFilterableFields } from './profile.constant';
import { IProfile } from './profile.interface';
import { ProfileService } from './profile.service';


const createProfile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { ...profileData } = req.body;
        const tokenData = req.user

        if (tokenData && 'userid' in tokenData) {
            const { userid } = tokenData;
            if (!profileData.user) {
                profileData.user = userid as string;
            }
        }
        const result = await ProfileService.createProfile(profileData);

        sendResponse<IProfile>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Profile created successfully!',
            data: result,
        });
    }
);

const getProfiles = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, profileFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ProfileService.getAllProfile(
        filters,
        paginationOptions
    );

    sendResponse<IProfile[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile fetched successfully !',
        meta: result.meta,
        data: result.data,
    });
});

const getSingleProfile = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ProfileService.getSingleProfole(id);

    sendResponse<IProfile>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile fetched successfully !',
        data: result,
    });
});


const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await ProfileService.updateProfile(id, updatedData);

    sendResponse<IProfile>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully !',
        data: result,
    });
});
const deleteProfile = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ProfileService.deleteProfile(id);

    sendResponse<IProfile>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile deleted successfully !',
        data: result,
    });
});




export const ProfileController = {
    createProfile,
    getProfiles,
    deleteProfile,
    updateProfile,
    getSingleProfile
};
