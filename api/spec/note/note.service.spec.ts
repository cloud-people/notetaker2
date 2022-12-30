import 'reflect-metadata';
import { MongoRepository } from 'typeorm';
import Note from '../../src/note/note.entity';
import NoteService from '../../src/note/note.service';

describe('src/note/note.service.ts', (): void => {
    const mockRepo = {
        delete: () => null as any,
    } as unknown as MongoRepository<Note>;
    const noteService: NoteService = new NoteService(mockRepo);

    it('deleteById', async (): Promise<void> => {
        // SETUP
        spyOn(mockRepo, 'delete').and.stub();
        // TEST
        const id = '451';
        await noteService.deleteById(id);
        // ASSERT
        expect(mockRepo.delete).toHaveBeenCalledWith(id);
    });
});
