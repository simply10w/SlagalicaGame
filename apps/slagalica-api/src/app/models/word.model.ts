import { model, Schema, Document } from 'mongoose';
import { Word as BaseWord } from '@slagalica/data';

type Word = BaseWord & Document;

export const WordSchema = new Schema<Word>({
  word: {
    type: String,
    required: [true, 'Word is required.']
  }
});

export const WordModel = model<Word>('words', WordSchema);
