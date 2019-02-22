import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '@app/core/services';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
    @ViewChild('fileInput')
    fileInput: ElementRef;
    imgSrc = '';
    images: string[];
    constructor(private imageService: ImageService) { }

    get imageFile(): File {
        const input = this.fileInput.nativeElement;
        if (input.files && input.files[0]) {
            return input.files[0];
        }
        return null;
    }
    ngOnInit() {
        this.imageService.getImages().subscribe(result => this.images = result);
    }

    fileChangeEvent() {
        const file = this.imageFile;
        if (file) {
            const reader = new FileReader();
            reader.onload = ((e) => {
                this.imgSrc = e.target['result'];
            });
            reader.readAsDataURL(file);
        }
    }

    saveImage() {
        const file = this.imageFile;
        if (file) {
            this.imageService.saveImage(file).subscribe(result => alert(result));
        }
    }
}
