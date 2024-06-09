import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService } from '../services';

const register = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password, deviceToken } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    if (deviceToken) {
        user.deviceToken = deviceToken;
        if (deviceToken) await userService.updateUserById(user._id, user);
    }
    let emailsend;
    if (!!user && !!tokens) {
        console.log('Email sent successfully');
        // emailsend = await emailService.sendEmail(user.email, 'Login Successfully', 'You are logged in successfully..!!');
    }
    res.send({ user, tokens, emailsend });
});

export { register, login };
