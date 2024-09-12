import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Borrowing extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  mobile: string;

  @Prop()
  work_name: String;

  @Prop()
  work_date: Date;

  @Prop()
  address: string;

  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  create_at: Date;

  @Prop({ default: null })
  delete_at: Date | null;
}

export const BorrowingSchema = SchemaFactory.createForClass(Borrowing);
