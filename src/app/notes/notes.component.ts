import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  addNotes = false;
  notesInput: string;
  notesSaved: string;
  colors: string[] = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'dark',
    'medium'
  ];
  colorInput = 'medium';
  colorSaved: string;
  addColor = false;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.checkNotes().then((saved) => this.notesSaved = saved);
    this.notesService.checkColor().then((saved) => this.colorSaved = saved);
  }

  onClickAddNotes(): void {
    this.addNotes = true;
    this.notesInput = (this.notesSaved) ? this.notesSaved : null;
    this.colorInput = (this.colorSaved) ? this.colorSaved : 'medium';
  }

  onClear(): void {
    this.addNotes = false;
    this.addColor = false;
  }

  onSave(): void {
    this.addNotes = false;
    this.notesService.setNotes(this.notesInput);
    this.notesService.setColor(this.colorInput);
    this.notesSaved = this.notesInput;
    this.colorSaved = this.colorInput;
    this.addColor = false;
  }

  onClickAddColor(): void {
    this.addColor = !this.addColor;
  }

  pickColor(color: string): void {
    this.colorInput = color;
  }
}
