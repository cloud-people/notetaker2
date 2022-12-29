import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { inject, singleton } from 'tsyringe';
import Note from './note.entity';
import NoteService from './note.service';

@singleton()
export default class NoteController {
    public constructor(
        @inject('note-route') private readonly path: string,
        private readonly hapi: Hapi.Server,
        private readonly notesService: NoteService,
    ) {}

    public setupRoutes(): void {
        this.hapi.route({
            method: 'GET',
            path: `${this.path}`,
            handler: async (): Promise<Note[]> => {
                return this.notesService.getAllNotes();
            },
        });

        this.hapi.route({
            method: 'GET',
            path: `${this.path}/{id}`,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().hex().length(24).required(),
                    }),
                }
            },
            handler: async (req: Hapi.Request): Promise<Note> => {
                const note: Note = await this.notesService.getById(req.params.id);
                if (!note) {
                    throw Boom.notFound();
                }
                return note;
            },
        });

        this.hapi.route({
            method: 'GET',
            path: `${this.path}/title`,
            options: {
                validate: {
                    query: Joi.object({
                        title: Joi.string().min(3).required(),
                    }),
                }
            },
            handler: async (req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Note[]> => {
                return this.notesService.searchByTitle(req.query.title);
            },
        });

        this.hapi.route({
            method: 'DELETE',
            path: `${this.path}/{id}`,
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.string().hex().length(24).required(),
                    }),
                }
            },
            handler: async (req: Hapi.Request, h: Hapi.ResponseToolkit): Promise<{ id: string }> => {
                await this.notesService.deleteById(req.params.id);
                return {
                    id: req.params.id,
                };
            },
        });

        this.hapi.route({
            method: 'POST',
            path: `${this.path}`,
            options: {
                validate: {
                    payload: Joi.object({
                        title: Joi.string().required(),
                        content: Joi.string().required(),
                    }),
                },
            },
            handler: async (req: Hapi.Request): Promise<Note> => {
                const incomingNote: Note = req.payload as Note;
                return this.notesService.createNote(incomingNote);
            },
        });

        this.hapi.route({
            method: 'PUT',
            path: `${this.path}`,
            options: {
                validate: {
                    payload: Joi.object({
                        _id: Joi.string().hex().length(24).required(),
                        title: Joi.string().required(),
                        content: Joi.string().required(),
                    }),
                },
            },
            handler: async (req: Hapi.Request): Promise<Note> => {
                const incomingNote: Note = req.payload as Note;
                return this.notesService.updateNote(incomingNote);
            },
        });
    }
}
