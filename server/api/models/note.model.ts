import {model, Schema, Model, Document}from 'mongoose';

export interface INote extends Document {
    name: string;
    description: string;
  }
  
  const NoteSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
  });
const Note: Model<INote> = model<INote>('User', NoteSchema);

export default Note;