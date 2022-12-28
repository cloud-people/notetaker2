import { Repository } from "typeorm";
import Note from "./note.entity";
import { inject, injectable } from 'tsyringe';

@injectable()
export default class NoteService {
    public constructor(
        @inject('note-repo') private readonly repo: Repository<Note>,
    ) { }

    public getAllNotes(): Promise<Note[]> {
        return this.repo.find();
    }

    public getById(id: string): Promise<Note> {
        return this.repo.findOne(id as any);
    }

    public createNote(incomingNote: Note): Promise<Note> {
        return this.repo.save(incomingNote);
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
