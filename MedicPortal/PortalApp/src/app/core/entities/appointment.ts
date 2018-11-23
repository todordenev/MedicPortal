export class Appointment {
    id?: string;
    patientId?: string;
    doctorId?: string;
    confirmedByDoctor?: boolean;
    confirmedByUser?: boolean;
    start?: Date;
    durationInMinutes: number;
}
