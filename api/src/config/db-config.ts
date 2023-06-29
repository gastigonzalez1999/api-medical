import mongoose, { ConnectOptions } from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect('', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        console.log('Database is online and running');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error at database start up');
    }
};