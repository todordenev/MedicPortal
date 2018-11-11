import * as moment from 'moment';

export class Worktime {
    id: number;
    dayOfWeek: number;
    from: number;
    till: number;
    fromLabel: string;
    tillLabel: string;
    constructor(serverObject: any) {
        this.id = serverObject.id;
        this.dayOfWeek = serverObject.dayOfWeek;
        this.from = serverObject.from;
        this.till = serverObject.till;
        this.fromLabel = moment().startOf('day').add('hour', this.from).format('HH:mm');
        this.tillLabel = moment().startOf('day').add('hour', this.till).format('HH:mm');
    }
}
