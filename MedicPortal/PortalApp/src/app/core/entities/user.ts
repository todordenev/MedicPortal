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
}
