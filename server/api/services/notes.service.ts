import L from '../../common/logger';
import INote from '../models/note.model'
import {model, Schema, Model, Document} from 'mongoose';

interface INote extends Document {
    name: string;
    description: string;
  }
  
  const NoteSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
  });
const Note: Model<INote> = model<INote>('User', NoteSchema);



export class NotesService{
    create(name: string, description: string): Promise<INote> {
        L.info(`create note with name ${name}`);
        let note = await INote.create({
            name: name,
            description: description,
          });

        return Promise.resolve(note);
      }
    }

export default new NotesService();