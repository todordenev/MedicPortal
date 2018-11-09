export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roles: string[] = [];
    avatarImage: string;
    get displayName() {
        return this.firstName + ' ' + this.lastName;
    }
    constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.firstName = obj.firstName;
            this.lastName = obj.lastName;
            this.email = obj.email;
            this.phoneNumber = obj.phoneNumber;
            for (const role in obj.roles) {
                this.roles.push(role);
            }
        }
    }
}
