import { Worktime } from './worktime';
import { Workday } from './workday';

export function GetWorkdays(worktimes: Worktime[]) {

    const workdaysDict = {};
    for (const worktime of worktimes) {

        let workday = workdaysDict[worktime.dayOfWeek];
        if (!workday) {
            workday = new Workday(worktime.dayOfWeek);
            workdaysDict[worktime.dayOfWeek] = workday;
        }
        workday.worktimes.push(new Worktime(worktime));
    }
    return SortWorkdays(workdaysDict);
}
function SortWorkdays(workdaysDict) {
    const workdays = [];
    for (let i = 0; i < 7; i++) {
        const workday = workdaysDict[i] as Workday;
        if (workday) {
            workdays.push(workday);
            workday.worktimes.sort((n1, n2) => n1.from - n2.from);
        }
    }
    return workdays;
}
