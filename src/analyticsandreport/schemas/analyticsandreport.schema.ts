import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class AnalyticsandReport extends  Document{
  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  reportType: string;


}

export const AnalyticsandReportSchema = SchemaFactory.createForClass(AnalyticsandReport);