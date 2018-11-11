import { Workday } from './workday';
import { GetWorkdays } from './helpers';
export class Doctor {
    id: string;
    name: string;
    workdays: Workday[] = [];
    spezialisations: string[] = [];
    firstName: string;
    lastName: string;
    displayName: string;
    constructor(serverObject?: any) {
        this.id = serverObject.id;
        this.firstName = serverObject.firstName;
        this.lastName = serverObject.lastName;
        this.displayName = this.firstName + ' ' + this.lastName;
        this.workdays = GetWorkdays(serverObject.worktimes);
        serverObject.doctorSpezialisations.forEach(docSpec => {
            this.spezialisations.push(docSpec.spezialisation.name);
        });
    }
}
