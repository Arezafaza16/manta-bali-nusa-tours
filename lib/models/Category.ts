import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type CategoryDoc = InferSchemaType<typeof categorySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const CategoryModel: Model<CategoryDoc> =
  (mongoose.models.Category as Model<CategoryDoc>) ||
  mongoose.model<CategoryDoc>('Category', categorySchema);
