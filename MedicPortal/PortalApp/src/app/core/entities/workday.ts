import { Worktime } from '@app/core/entities/worktime';
import * as moment from 'moment';
import 'moment/locale/bg';

export class Workday {
    private _dayNumber: number;
    private _daylabel: string;
    get dayNumber() {
        return this._dayNumber;
    }
    get dayLabel() {
        return this._daylabel;
    }

    worktimes: Worktime[] = [];

    constructor(dayNumber) {
        this._dayNumber = dayNumber;
        this._daylabel = moment().weekday(this._dayNumber).format('ddd');
    }
}

