import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  setNotes = async (notes: string): Promise<void> => {
    if (notes) {
      const storeNotes = notes;
      await Storage.set({
        key: 'notes',
        value: storeNotes
      });
    } else {
      this.removeNotes();
    }
  };

  checkNotes = async (): Promise<string> => {
    const { value } = await Storage.get({ key: 'notes' });
    if (value) {
      return value;
    }
  };

  removeNotes = async (): Promise<void>  => {
    await Storage.remove({ key: 'notes' });
  };

  setColor = async (color: string): Promise<void> => {
    const storeColor = color;

    await Storage.set({
      key: 'color',
      value: storeColor
    });
  };

  checkColor = async (): Promise<string> => {
    const { value } = await Storage.get({ key: 'color' });
    if (value) {
      return value;
    }
  };
}
