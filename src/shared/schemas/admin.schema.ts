import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../app/auth/enums/role.enum';

@Schema({
timestamps: true,
})
export class Admin extends Document {

@Prop({ unique: [true, 'This email exist in the database'] })
email: string;

@Prop({ select: false })
password: string;


}

export const AdminSchema = SchemaFactory.createForClass(Admin);
