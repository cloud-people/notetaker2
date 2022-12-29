import { Injectable } from '@angular/core';
import INote from '../models/iNote';

@Injectable()
export default class NotesService {
    private url: string = 'http://localhost:3040/api/notes';

    public async addNote(note: INote): Promise<INote> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(
            this.url,
            {
                method: 'POST',
                body: JSON.stringify(note),
                headers,
            },
        );
        const data: INote = await response.json();
        return data;
    }

    public async updateNote(note: INote): Promise<INote> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(
            this.url,
            {
                method: 'PUT',
                body: JSON.stringify(note),
                headers,
            },
        );
        const data: INote = await response.json();
        return data;
    }

    public async getAllNotes(): Promise<INote[]> {
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    }

    public async deleteNote(noteId: string): Promise<void> {
        const response = await fetch(
            `${this.url}/${noteId}`,
            {
                method: 'DELETE',
            },
        );
        await response.json();
    }
}
