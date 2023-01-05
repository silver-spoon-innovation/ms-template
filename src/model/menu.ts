import { Schema, model } from 'mongoose';
import { MONGO_DOCUMENTS, TIMESTAMP_MONGOOSE } from '@src/constant';

export interface Menu {
  name: string;
  description?: string;
  retails: [
    {
      price: number;
      size: string;
      cost: number;
    }
  ];
}

const MenuSchema = new Schema<Menu>(
  {
    name: { type: String, required: true },
    description: { type: String },
    retails: [
      {
        price: { type: Number, required: true },
        size: { type: String, required: true },
        cost: { type: Number, required: true },
      },
    ],
  },
  { timestamps: TIMESTAMP_MONGOOSE }
);

export const MenuModel = model<Menu>(MONGO_DOCUMENTS.Menu, MenuSchema);