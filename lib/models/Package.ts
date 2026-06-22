import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const packageSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    // Free-form string so custom categories created in /studio are allowed.
    category: { type: String, default: 'Nusa Penida Tours', trim: true },
    description: { type: String, default: '' },
    descriptionId: { type: String, default: '' },
    duration: { type: String, default: '' },
    durationId: { type: String, default: '' },
    priceValue: { type: Number, required: true, min: 0 },
    /** Image URL or base64 data URL. */
    image: { type: String, default: '' },
    destinations: { type: [String], default: [] },
    includes: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type PackageDoc = InferSchemaType<typeof packageSchema> & {
  _id: mongoose.Types.ObjectId;
};

// Reuse the compiled model across hot reloads.
export const PackageModel: Model<PackageDoc> =
  (mongoose.models.Package as Model<PackageDoc>) ||
  mongoose.model<PackageDoc>('Package', packageSchema);
