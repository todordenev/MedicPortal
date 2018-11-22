import { NgModule } from '@angular/core';
import { CaptureImageComponent } from './capture-image/capture-image.component';
import * as bgLocale from 'date-fns/locale/bg/index.js';

const dnsConfigService = new DateFnsConfigurationService();
dnsConfigService.setLocale(bgLocale);

import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { PatientListitemComponent } from '@app/shared/patient-listitem/patient-listitem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguredDatepickerModule } from './ConfiguredDatepickerModule';
import { DayViewComponent } from './calendar/day-view/day-view.component';
import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ConfiguredDatepickerModule,
        ReactiveFormsModule,
        DateFnsModule.forRoot()
    ],
    exports: [
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        ConfiguredDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        CaptureImageComponent,
        PatientListitemComponent,
        DayViewComponent
    ],
    declarations: [
        CaptureImageComponent,
        PatientListitemComponent,
        DayViewComponent
    ],
    providers: [

        { provide: DateFnsConfigurationService, useValue: dnsConfigService } // <-- All pipies in bg by default
    ]
})
export class SharedModule { }

export { CaptureImageComponent };
