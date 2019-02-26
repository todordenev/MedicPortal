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
    newImage: File;
    constructor(private imageService: ImageService) { }

    get imageFile(): File {
        const input = this.fileInput.nativeElement;
        if (input.files && input.files[0]) {
            return input.files[0];
        }
        return null;
    }
    ngOnInit() {
        this.loadImages();
    }

    loadImages() {
        this.imageService.getImages().subscribe(result => this.images = result);
    }

    fileChangeEvent() {
        this.newImage = this.imageFile;
        if (this.newImage) {
            const reader = new FileReader();
            reader.onload = ((e) => {
                this.imgSrc = e.target['result'];
            });
            reader.readAsDataURL(this.newImage);
        }
    }

    saveImage() {
        if (this.newImage) {
            this.imageService.saveImage(this.newImage).subscribe(() => this.loadImages());
        }
    }
    deleteImage(imageId) {
        const result = confirm('Delete Image with ID:' + imageId);
        if (result) {
            this.imageService.deleteImage(imageId).subscribe(() => this.loadImages());
        }
    }
}
