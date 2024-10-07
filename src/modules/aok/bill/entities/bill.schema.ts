import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Bill extends Document {
  @Prop({ unique: true }) // Ensure bill_number is unique
  bill_number: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  mobile: string;

  // Define the type for the 'work' field
  @Prop([{ work_name: String, price: Number }])
  works: { work_name: string; price: number }[];

  @Prop()
  work_date: Date;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop()
  total: number;

  @Prop({ default: Date.now }) // Automatically set the creation date
  create_at: Date;

  @Prop({ default: null }) // Allow for a soft delete
  delete_at: Date | null;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
