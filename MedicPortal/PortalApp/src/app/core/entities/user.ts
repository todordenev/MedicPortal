export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roles: string[] = [];
    avatarImage: string;
    claims: any[];
}
