import { Worktime } from '@app/core/entities/worktime';
import { startOfWeek, addDays, format } from 'date-fns';
import * as bgLocale from 'date-fns/locale/bg/index.js';



export class Workday {
    private _dayNumber: number;
    private _daylabel: string;
    get dayNumber() {
        return this._dayNumber;
    }
    get dayLabel() {
        return this._daylabel;
    }
    today: Date;
    worktimes: Worktime[] = [];
    constructor(dayNumber) {
        this.today = new Date();
        this._dayNumber = dayNumber;
        const day = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), this._dayNumber);
        this._daylabel = format(day, 'dd', { locale: bgLocale });

    }
}

