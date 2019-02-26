import { parse } from 'date-fns';

export class Patient {
    id: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    address: string;
    phoneNumber: string;
    avatarImgSrc: string;
    constructor(serverObject?: any) {
        if (serverObject) {
            this.id = serverObject.id;
            this.firstName = serverObject.firstName;
            this.lastName = serverObject.lastName;
            this.birthdate = serverObject.birthdate;
            this.address = serverObject.address;
            this.phoneNumber = serverObject.phoneNumber;
            this.avatarImgSrc = serverObject.avatarImgSrc;
        }
    }
}
