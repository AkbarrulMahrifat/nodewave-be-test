import { Router } from 'express';
import AuthController from '../controllers/rest/AuthController';

const AuthRouter = Router({mergeParams:true});

AuthRouter.route('/').post(AuthController.login);

export default AuthRouter;