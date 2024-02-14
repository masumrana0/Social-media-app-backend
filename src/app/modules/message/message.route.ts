import express from 'express';
import { MessageController } from './message.controller';

const router = express.Router();

router.post('/', MessageController.sendMessage);

router.get('/', MessageController.getMessage);

export const messageRouter = router;
