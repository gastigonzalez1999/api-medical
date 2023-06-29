import jwt, { Secret } from 'jsonwebtoken';

export const generateJwt = (uid: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY as Secret, {
            expiresIn: '4h'
        }), (err, token) => {
            if (err) {
                console.log(err);
                reject('Token was not generated correctly');
            } else {
                resolve(token);
            }
        }
    });
};
