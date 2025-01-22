import { Router } from 'express';
import UserController from '../controllers/rest/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const UserRouter = Router({mergeParams:true});

UserRouter.route('/:id').get(authMiddleware, UserController.getById);

export default UserRouter;