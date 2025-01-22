import { Request, Response } from 'express';
import { response_success, response_not_found } from '$utils/response.utils';
import { prisma } from '$utils/prisma.utils';

class UserController {
    async getById(req: Request, res: Response) {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
        });

        if (!user)
            return response_not_found(res, 'User not found');

        return response_success(res, user, "Success!")
    }
}

export default new UserController();