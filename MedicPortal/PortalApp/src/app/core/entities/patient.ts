import { parse } from 'date-fns';

export class Patient {
    id: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    adress: string;
    telefon: string;
    avatarImgSrc: string;
    constructor(serverObject?: any) {
        if (serverObject) {
            this.id = serverObject.id;
            this.firstName = serverObject.firstName;
            this.lastName = serverObject.lastName;
            this.birthdate = serverObject.birthdate;
            this.adress = serverObject.adress;
            this.telefon = serverObject.telefon;
            this.avatarImgSrc = serverObject.avatarImgSrc;
        }
    }
}
