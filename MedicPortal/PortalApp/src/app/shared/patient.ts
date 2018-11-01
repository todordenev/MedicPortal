export class Patient {
    id: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    adress: string;
    telefon: string;

    constructor(serverObject?: any) {
        if (serverObject) {
            this.id = serverObject.id;
            this.firstName = serverObject.firstName;
            this.lastName = serverObject.lastName;
            this.birthdate = serverObject.birthdate;
            this.adress = serverObject.adress;
            this.telefon = serverObject.telefon;
        }
    }
}
