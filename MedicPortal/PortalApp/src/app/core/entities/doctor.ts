import { Workday } from './workday';
import { Worktime } from '.';
export class Doctor {
    id: string;
    name: string;
    workdays: Workday[] = [];
    spezialisations: string[] = [];
    firstName: string;
    lastName: string;
    worktimes: Worktime[];
}
