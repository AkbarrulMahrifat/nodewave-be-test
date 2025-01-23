import { Router } from 'express';
import UserController from '../controllers/rest/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const UserRouter = Router({mergeParams:true});

UserRouter.route('/detail/:id').get(authMiddleware, UserController.getById);

UserRouter.route('/import').get(authMiddleware, UserController.importFile);

export default UserRouter;