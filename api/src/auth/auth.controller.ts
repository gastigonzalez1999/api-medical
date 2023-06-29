import { Request, Response } from 'express';
import AuthResource from './auth.resource';
//const { googleVerify } = require('../helpers/google-verify');

// const login = async (req: request, res: response) => {

//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email : email});

//         if (!user) {
//             return res.status(400).json({
//                 msg: 'User/password are not correct - email',
//             });
//         }

//         if (!user.status) {
//             return res.status(400).json({
//                 msg: 'User/password are not correct - status: false',
//             });
//         }

//         const validPassword = bcrypt.compareSync(password, user.password);

//         if (!validPassword) {
//             return res.status(400).json({
//                 msg: 'User/password are not correct - password',
//             });
//         }

//         const token = await generateJwt(user.id);


//         res.json({
//             user,
//             token,
//         });
        
//     } catch (error) {
//         return res.json({
//             msg: 'Talk to admin',
//         });
//     }
// }

// const googleSignIn = async (req: request, res: response) => {
//     const { id_token } = req.body;

//     try {
//         const googleUser = await googleVerify(id_token);

//         let user = await User.findOne({email : googleUser.email});

//         if (!user) {
//             const data = {
//                 name: googleUser.name,
//                 email: googleUser.email,
//                 password: '',
//                 img: googleUser.picture,
//                 google: true,
//             };

//             user = new User(data);
//             await user.save();
//         }

//         if (!user.status) {
//             return res.status(401).json({
//                 msg: 'Contact the admin - User blocked',
//             });
//         }

//         const token = await generateJwt(user.id);

//         res.json({
//            user,
//            token,
//         });
        
//     } catch (error) {
//         json.status(400).json({
//             ok: false,
//             msg: 'Not able to verify token',
//         });
//     }
// };

// module.exports = {
//     login,
//     googleSignIn,
// }

export default class AuthController {
    private authResource: AuthResource;
    constructor() {
        this.authResource = new AuthResource();
    }

    register = async (req: Request, res: Response) => {
        return this.authResource.register(req, res);
    };

    login = async (req: Request, res: Response) => {
        return this.authResource.login(req, res);
    };
}
