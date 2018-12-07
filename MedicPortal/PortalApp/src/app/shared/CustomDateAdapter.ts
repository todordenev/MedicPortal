import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Inject, Optional } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

export class CustomDateAdapter extends NativeDateAdapter {
    /**
     *
     */
    constructor(@Optional() @Inject(MAT_DATE_FORMATS) formats: any,
        @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string, platform: Platform) {
        super(dateLocale, platform);

    }
    getYear(date: Date): number {
        console.log('getYear');
        const year = super.getYear(date);
        return year;
    }
    getMonth(date: Date): number {
        console.log('getMonth');

        return super.getMonth(date);
    }
    getDate(date: Date): number {
        console.log('getDate');
        return super.getDate(date);
    }
    getDayOfWeek(date: Date): number {
        console.log('getDayOfWeek');
        return super.getDayOfWeek(date);
    }
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        console.log('getMonthNames');
        return super.getMonthNames(style);
    }
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        console.log('getDayOfWeekNames');
        return super.getDayOfWeekNames(style);
    }
    getYearName(date: Date): string {
        console.log('getYearName');
        return super.getYearName(date);
    }
    getFirstDayOfWeek(): number {
        console.log('getFirstDayOfWeek');
        const firstDayOfWeek = super.getFirstDayOfWeek();
        return 1;
    }
    getNumDaysInMonth(date: Date): number {
        console.log('getNumDaysInMonth');
        return super.getNumDaysInMonth(date);
    }
    clone(date: Date): Date {
        console.log('clone');
        return super.clone(date);
    }
    createDate(year: number, month: number, date: number): Date {
        console.log('createDate');
        const newDate = super.createDate(year, month, date);
        return newDate;
    }
    today(): Date {
        console.log('today');
        return super.today();
    }
    parse(value: any): Date {
        const parseFormat = MAT_DATE_FORMATS;
        const date = super.parse(value);
        console.log('parse');
        return date;
    }
    format(date: Date, displayFormat: any): string {
        console.log('format');

        return super.format(date, displayFormat);
    }
    addCalendarYears(date: Date, years: number): Date {
        console.log('addCalendarYears');
        return super.addCalendarYears(date, years);
    }
    addCalendarMonths(date: Date, months: number): Date {
        console.log('addCalendarMonths');
        return super.addCalendarMonths(date, months);
    }
    addCalendarDays(date: Date, days: number): Date {
        console.log('addCalendarDays');
        return super.addCalendarDays(date, days);
    }
    toIso8601(date: Date): string {
        console.log('toIso8601');
        return super.toIso8601(date);
    }
    isDateInstance(obj: any): boolean {
        console.log('isDateInstance');
        return super.isDateInstance(obj);
    }
    isValid(date: Date): boolean {
        return super.isValid(date);
    }
    invalid(): Date {
        return super.invalid();
    }
}
