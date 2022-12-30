import { ObjectId } from 'mongodb';
import { inject, injectable } from 'tsyringe';
import { MongoRepository, ObjectID } from "typeorm";
import Note from "./note.entity";

@injectable()
export default class NoteService {
    public constructor(
        @inject('note-repo') private readonly repo: MongoRepository<Note>,
    ) { }

    public getAllNotes(): Promise<Note[]> {
        return this.repo.find();
    }

    public getById(id: ObjectID | string): Promise<Note> {
        return this.repo.findOne(id as any);
    }

    public createNote(incomingNote: Note): Promise<Note> {
        return this.repo.save(incomingNote);
    }

    public async updateNote(incomingNote: Note): Promise<Note> {
        const result = await this.repo.updateOne(
            {
                _id: new ObjectId(incomingNote._id as any),
            },
            {
                $set: {
                    title: incomingNote.title,
                    content: incomingNote.content,
                },
            },
            {
                upsert: true,
            },
        );
        return this.getById(incomingNote._id);
    }

    public async deleteById(id: string): Promise<void> {
        await this.repo.delete(id);
    }

    public async searchByTitle(title: string): Promise<Note[]> {
        return this.repo.find({
            where: {
                title: new RegExp(title, 'g') as any,
            },
        });
    }
}
