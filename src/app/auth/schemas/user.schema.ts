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

@Prop({ select: false })
password: string;

@Prop({
    type: String, 
    enum: Role,   
    required: true,
  })
  role: Role;


@Prop({ unique: [true, 'This phonenumber exist in the database'] })
phoneNumber:string

@Prop()
images?: any[];

resetToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
