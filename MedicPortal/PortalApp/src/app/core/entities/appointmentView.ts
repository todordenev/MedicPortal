import { Patient } from './patient';
import { Doctor } from './doctor';

export class AppointmentView {
    id: string;
    title: string;
    start: Date;
    durationInMinutes: number;
    categoryId: number;
    patient: Patient;
    doctor: Doctor;
}
