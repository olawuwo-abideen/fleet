import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'This email exist in the database'] })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{ type: String, enum: Role }],
  })

  role: Role[];

  @Prop()
  phoneNumber:string
  
  @Prop()
  images?: object[];

  
  resetToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
