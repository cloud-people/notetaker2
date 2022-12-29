import { Component } from '@angular/core';
import INote from '../models/iNote';
import NotesService from '../services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NotesService],
})
export class AppComponent {
  private emptyNote: INote = {
    title: '',
    content: '',
  };

  public notes: INote[] = [];
  public currentNote: INote = { ...this.emptyNote };

  public constructor(
    private readonly notesService: NotesService,
  ) {
    this.fetchNotes();
  }

  private async fetchNotes(): Promise<void> {
    this.notes = await this.notesService.getAllNotes();
    if (this.notes.length) {
      this.currentNote = { ...this.notes[0] };
    }
    else {
      this.addNote();
    }
  }

  public async addNote(): Promise<void> {
    this.currentNote = { ...this.emptyNote };
  }

  public async deleteNote(noteId: string): Promise<void> {
    await this.notesService.deleteNote(noteId);
    const i = this.notes.findIndex(note => note._id === noteId);
    this.notes.splice(i, 1);
    this.currentNote = { ...this.emptyNote };
  }

  public selectNote(note: INote): void {
    this.currentNote = { ...note };
  }

  public async saveNote(incomingNote: INote): Promise<void> {
    const note: INote | undefined = this.notes.find(note => note._id === incomingNote._id);
    if (note) {
      const updatedNote: INote = await this.notesService.updateNote(incomingNote);
      note.title = updatedNote.title;
      note.content = updatedNote.content;
    }
    else {
      const newNote: INote = await this.notesService.addNote(incomingNote);
      this.notes.push(newNote);
      this.selectNote(newNote);
    }
  }
}
