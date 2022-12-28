import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import NoteController from './note/note.controller';
import Note from './note/note.entity';
import ConfigService from './services/config.service';

const init = async (): Promise<void> => {
    // DB
    const conn = new DataSource({
        authSource: 'admin',
        type: 'mongodb',
        host: ConfigService.DB.HOST,
        port: Number(ConfigService.DB.PORT),
        database: ConfigService.DB.DATABASE,
        username: ConfigService.DB.USER,
        password: ConfigService.DB.PWD,
        entities: [
            Note,
        ],
    });
    await conn.initialize();

    // SERVER
    const server: Hapi.Server = Hapi.server({
        debug: { request: ['error'] },
        port: ConfigService.PORT,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // DI SETUP
    container.register(Hapi.Server, { useValue: server });
    container.register('note-route', { useValue: '/api/notes' });
    container.register('note-repo', { useValue: conn.getMongoRepository<Note>(Note) });
    
    const notesRouter: NoteController = container.resolve(NoteController);
    notesRouter.setupRoutes();

    await server.register(Inert);
    await server.start();

    console.log(`Notes App running on port ${ConfigService.PORT}.`);

    // ERROR HANDLING
    process.on('unhandledRejection', (e) => {
        console.log('unhandledRejection', e);
        process.exit(1);
    });

    // EXIT
    process.on('SIGINT', async () => {
        await server.stop();
        await conn.close()
        console.log('Notes App stopped.');
        setTimeout(() => {
            process.exit(0);
        }, 2000);
    });

};

void init();
