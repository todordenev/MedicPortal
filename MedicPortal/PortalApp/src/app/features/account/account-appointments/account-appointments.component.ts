import { Component, OnInit } from '@angular/core';
import { AppointmentService, AppointmentView } from '@app/core';
import { format } from 'date-fns';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/confirm-dialog/confirm-dialog.component';
import { DomPortalHost } from '@angular/cdk/portal';

@Component({
    selector: 'app-account-appointments',
    templateUrl: './account-appointments.component.html',
    styleUrls: ['./account-appointments.component.css']
})
export class AccountAppointmentsComponent implements OnInit {
    appointments: AppointmentView[];
    allLoaded = false;
    now: Date;
    constructor(
        private appointmentService: AppointmentService,
        public dialog: MatDialog
    ) { }


    ngOnInit() {
        this.appointmentService.getAccountAppointments().subscribe(appointments => this.appointments = appointments);
        this.now = new Date();
    }
    isExpired(appointment) {
        const now = new Date();
        return appointment.start < now;
    }
    cancel(appointment: AppointmentView) {
        this.now = new Date();
        if (appointment.start < this.now) {
            return;
        }
        let confirmMessage = 'Откажи час за ' + appointment.patient.firstName;
        confirmMessage += ' от ' + format(appointment.start, 'HH:mm');
        confirmMessage += ' на ' + format(appointment.start, 'DD.MM.YYYY (dddd)');
        const dialogData: ConfirmDialogData = {
            caption: 'Отказване на час',
            message: confirmMessage,
            options: [{ label: 'Не', value: false }, { label: 'Да', value: true }]
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.appointmentService.cancel(appointment.id).subscribe(() => appointment.isCanceled = true);
            }
        });
    }
    loadAll() {
        this.appointmentService.getAllAccountAppointments()
            .subscribe(appointments => { this.appointments = appointments; this.allLoaded = true; });
    }
}
