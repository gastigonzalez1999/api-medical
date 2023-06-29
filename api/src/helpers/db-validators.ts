import User from '../models/user';
import Role from '../models/role';

export const isValidRole = async (role = '') => {
    const roleExist = await Role.findOne({role: role});
    if (!roleExist) {
        throw new Error(`The role:${role} is not registered in the database`);
    }
};

export const emailExist = async (email: string) => {
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) {
        throw new Error(`The email:${email} is already registered`);
    }
};

export const userIdExists = async (id: string) => {
    const checkId = await User.findById({ id: id });

    if (!checkId) {
        throw new Error(`The user Id:${id} does not exist`);
    }
};
