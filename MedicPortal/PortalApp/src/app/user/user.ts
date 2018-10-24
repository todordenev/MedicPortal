export class User {
    Id: string;
    userName: string;
    familyName: string;
    givenName: string;
    email: string;
    Phone: string;
    roles: string[];

    constructor(jwt?: string) {
        if (jwt) {
            this.fromJwt(jwt);
        }
    }

    fromJwt(jwt: any): any {
        this.Id = jwt.id;
        this.userName = jwt.sub;
        this.familyName = jwt.family_name;
        this.givenName = jwt.given_name;
        this.email = jwt.email;
        this.Phone = jwt.phone;
        this.roles = jwt.role;
    }
}
