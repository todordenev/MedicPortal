import { Worktime } from "@app/core/entities/worktime";

export class Workday {
    private _dayNumber: number;
    get dayNumber() {
        return this._dayNumber;
    }
    get dayName() {
        return "";
    }
    worktimes: Worktime[] = [];

    constructor(dayNumber) {
        this._dayNumber = dayNumber;
    }
}

