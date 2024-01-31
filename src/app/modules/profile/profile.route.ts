import express from 'express';
import validateRequest from '../../middlewares/ValidateRequest';
import { ProfileController } from './profile.controller';
import { profileZodValidation } from './profile.validation';


const router = express.Router();
router.post(
    '/create-profile',
    validateRequest(profileZodValidation.createProfileZodScehma),
    ProfileController.createProfile,
);
router.get('/', ProfileController.getProfiles);
router.get('/:id', ProfileController.getSingleProfile);
router.delete('/:id', ProfileController.deleteProfile);
router.patch('/:id', validateRequest(profileZodValidation.createProfileZodScehma), ProfileController.updateProfile);

export const ProfileRoutes = router;
