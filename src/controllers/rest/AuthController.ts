import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { response_success, response_not_found, response_bad_request, response_unauthorized } from '$utils/response.utils';
import { prisma } from '$utils/prisma.utils';
import jwt from '$utils/jwt.utils';

class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return response_bad_request(res, 'Some required fields are missing', req.body);
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return response_not_found(res, 'User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response_unauthorized(res, 'Invalid password');
        }

        const token = jwt.sign({ id: user.id, email: user.email });

        return response_success(res, token, "Success!")
    }
}

export default new AuthController();