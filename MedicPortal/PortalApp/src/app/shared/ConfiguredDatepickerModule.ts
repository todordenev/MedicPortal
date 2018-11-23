import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


export const MY_FORMATS = {
    parse: {
        dateInput: 'DD.MM.YYYY', // Zum parsen des Inputs
    },
    display: {
        dateInput: 'DD.MM.YYYY', // Die Anzeige im Input
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'MMM',
        monthYearA11yLabel: 'MM YYYY',
    },
};

@NgModule({
    imports: [
        MatDatepickerModule
    ],
    exports: [
        MatDatepickerModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'bg-BG' },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class ConfiguredDatepickerModule { }
