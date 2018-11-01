import { Worktime } from '../doctor/worktime';
export class Doctor {
    id: string;
    name: string;
    worktimes: Worktime[] = [];
    spezialisations: string[] = [];
    firstName: string;
    lastName: string;
    displayName: string;
    constructor(serverObject?: any) {
        this.id = serverObject.id;
        this.firstName = serverObject.firstName;
        this.lastName = serverObject.lastName;
        this.displayName = this.firstName + ' ' + this.lastName;


        serverObject.worktimes.forEach(worktime => {
            this.worktimes.push(new Worktime(serverObject));
        });

        serverObject.doctorSpezialisations.forEach(docSpec => {
            this.spezialisations.push(docSpec.spezialisation.name);
        });
    }
}
