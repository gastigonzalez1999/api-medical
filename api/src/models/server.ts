import express from 'express';
import cors from 'cors';
import { dbConnection } from '../config/db-config';

class Server {
    private app: express.Application;
    private port: string;
    private paths: {
        auth: '/api/auth',
        users: '/api/users',
        categories: '/api/categories',
        products: '/api/products',
        search: '/api/search',
        uploads: '/api/uploads',
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.connectDb();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Port listening on', this.port);
        });
    }

    async connectDb() {
        await dbConnection();
    }
}

export default Server;