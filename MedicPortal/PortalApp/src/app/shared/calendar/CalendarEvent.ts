export class CalendarEvent {
    overlapingCounter: number;
    start: number;
    end: number;
    title: string;
    body: string;

    constructor(start?: number, end?: number, title?: string, body?: string) {
        this.start = start;
        this.end = end;
        this.title = title;
        this.body = body;
    }
}
