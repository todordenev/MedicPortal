export class Worktime {
    id: number;
    dayOfWeek: number;
    from: number;
    till: number;
    constructor(serverObject: any) {
        this.id = serverObject.id;
        this.dayOfWeek = serverObject.dayOfWeek;
        this.from = serverObject.from;
        this.till = serverObject.till;
    }
}
