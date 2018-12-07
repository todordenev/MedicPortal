import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-capture-image',
    templateUrl: './capture-image.component.html',
    styleUrls: ['./capture-image.component.css']
})
export class CaptureImageComponent implements OnInit {

    @ViewChild('video')
    public video: ElementRef;

    @ViewChild('canvas')
    public canvas: ElementRef;
    isCapturing = false;
    @Input()
    imgSrc = '';
    @Output()
    imgChanged = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }
    startCapture() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                const videoElement = this.video.nativeElement;
                this.canvas.nativeElement.width = videoElement.videoWidth;
                this.canvas.nativeElement.height = videoElement.videoHeight;
                this.video.nativeElement.srcObject = stream;
                this.video.nativeElement.play();
            });
            this.isCapturing = true;
        }
    }
    captureImage() {
        const videoElement = this.video.nativeElement;
        this.canvas.nativeElement.width = videoElement.videoWidth;
        this.canvas.nativeElement.height = videoElement.videoHeight;
        const context = this.canvas.nativeElement.getContext('2d');
        context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
        this.imgSrc = this.canvas.nativeElement.toDataURL('image/png');
        this.isCapturing = false;
        this.imgChanged.emit(this.imgSrc);
    }
}
