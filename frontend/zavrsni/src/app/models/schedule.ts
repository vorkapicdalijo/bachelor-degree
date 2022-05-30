export class Schedule {
   Id: number;
   Subject: string;
   Description: string;
   IsAllDay: boolean;
   Location: string;
   RecurrenceRule: string;
   RecurrenceException: string;
   RecurrenceID: string;
   EventID: string;
   EndTime: Date;
   EndTimezone: Date;
   StartTime: Date;
   StartTimezone: Date;
}