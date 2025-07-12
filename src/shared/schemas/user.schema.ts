import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../app/auth/enums/role.enum';

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

@Prop({ unique: [true, 'This phonenumber exist in the database'] })
phoneNumber:string

@Prop({
type: String, 
enum: Role,   
required: true,
})
role: Role;

@Prop()
images?: any[];

resetToken: string;


@Prop({ default:false })
accountActivation: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
