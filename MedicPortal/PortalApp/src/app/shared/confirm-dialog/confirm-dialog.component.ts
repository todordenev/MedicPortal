import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmDialogOption {
    label: string;
    value: any;
}

export interface ConfirmDialogData {
    caption: string;
    message: string;
    options: ConfirmDialogOption[];
}


@Component({
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

}
