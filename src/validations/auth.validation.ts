import Joi from '@hapi/joi';
import { password } from './custom.validation';

// Define types for request bodies
interface RequestBody {
    body: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
}

// Define the validation schemas
const register: RequestBody = {
    body: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        displayName: Joi.string(),
        dob: Joi.date()
            .format('DD/MM/YYYY')
            .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
            .message('Age Should be Greater than 18')
            .raw()
            .required(),
        privacy: Joi.string().required(),
        deviceToken: Joi.string()
    }),
};

const login: RequestBody = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        deviceToken: Joi.string(),
    }),
};

const refreshTokens: RequestBody = {
    body: Joi.object({
        refreshToken: Joi.string().required(),
    }),
};

const forgotPassword: RequestBody = {
    body: Joi.object({
        email: Joi.string().email().required(),
    }),
};

const resetPassword: RequestBody = {
    query: Joi.object({
        token: Joi.string().required(),
    }),
    body: Joi.object({
        password: Joi.string().required().custom(password),
    }),
};

const logout: RequestBody = {
    body: Joi.object({
        refreshToken: Joi.string().required(),
    }),
};

const changePassword: RequestBody = {
    body: Joi.object({
        password: Joi.string().required(),
    }),
};

const updateUserInfo: RequestBody = {
    body: Joi.object({
        display_name: Joi.string(),
        profileImage: Joi.string(),
    }),
};

const apps: RequestBody = {
    body: Joi.object({
        appname: Joi.string().required(),
        status: Joi.string().required(),
        // bannerImage: Joi.string()
    }),
};

const editapps: RequestBody = {
    body: Joi.object({
        appname: Joi.string().required(),
        status: Joi.string().required(),
        appid: Joi.string().required(),
    }),
};

const deleteapp: RequestBody = {
    body: Joi.object({
        appid: Joi.string().required(),
    }),
};

const groups: RequestBody = {
    body: Joi.object({
        groupname: Joi.string().required(),
        appid: Joi.string().required(),
        status: Joi.string().required(),
    }),
};

const editgroups: RequestBody = {
    body: Joi.object({
        groupid: Joi.string().required(),
        groupname: Joi.string().required(),
        appid: Joi.string().required(),
        status: Joi.string().required(),
    }),
};

const deletegroups: RequestBody = {
    body: Joi.object({
        groupid: Joi.string().required(),
    }),
};

const groupsbyapp: RequestBody = {
    body: Joi.object({
        appid: Joi.string().required(),
    }),
};

const stickers: RequestBody = {
    body: Joi.object({
        groupid: Joi.string().required(),
        appid: Joi.string().required(),
        status: Joi.string().required(),
    }),
};

const editstickers: RequestBody = {
    body: Joi.object({
        groupid: Joi.string().required(),
        stickerid: Joi.string().required(),
        appid: Joi.string().required(),
        status: Joi.string().required(),
    }),
};

const deletestickers: RequestBody = {
    body: Joi.object({
        stickerid: Joi.string().required(),
    }),
};

export {
    register,
    login,
    refreshTokens,
    forgotPassword,
    resetPassword,
    logout,
    changePassword,
    updateUserInfo,
    apps,
    editapps,
    deleteapp,
    groups,
    groupsbyapp,
    editgroups,
    deletegroups,
    stickers,
    editstickers,
    deletestickers,
};
