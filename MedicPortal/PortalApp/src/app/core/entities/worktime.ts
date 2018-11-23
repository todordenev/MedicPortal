
import { startOfDay, addHours } from 'date-fns';

export class Worktime {
    id: number;
    dayOfWeek: number;
    from: Date;
    till: Date;
    fromLabel: string;
    tillLabel: string;
    constructor(serverObject: any) {
        this.id = serverObject.id;
        this.dayOfWeek = serverObject.dayOfWeek;
        const midnight = startOfDay(new Date());
        this.from = addHours(midnight, serverObject.from);
        this.till = addHours(midnight, serverObject.till);
    }
}
