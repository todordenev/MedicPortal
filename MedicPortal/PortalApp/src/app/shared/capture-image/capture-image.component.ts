import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-capture-image',
    templateUrl: './capture-image.component.html',
    styleUrls: ['./capture-image.component.css']
})
export class CaptureImageComponent implements OnInit {

    @Input()
    imgSrc = '';
    @Output()
    imgChanged = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    fileChangeEvent(fileInput) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();

            reader.onload = ((e) => {
                this.imgSrc = e.target['result'];
                this.imgChanged.emit(this.imgSrc);
            });

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
}
