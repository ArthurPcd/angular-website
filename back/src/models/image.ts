import {model, Schema} from 'mongoose';

interface IImage {
  _id?: string;
  data: Buffer;
  contentType: string;
}

const schema = new Schema<IImage>({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

const Image = model<IImage>('Image', schema);

export type {IImage};
export {Image};
