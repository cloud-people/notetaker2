export default class ConfigService {
    public static DB = {
        HOST: process.env.DB_HOST,
        DATABASE: process.env.DB_BASE,
        PORT: process.env.DB_PORT,
        USER: process.env.DB_USER,
        PWD: process.env.DB_PWD,
    };

    public static PORT = process.env.PORT;
}
