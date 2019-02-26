import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { handleError } from '../entities/helpers';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    endpointUrl = '/api/images';
    constructor(private http: HttpClient) { }

    getImages(): Observable<string[]> {
        return this.http.get(this.endpointUrl)
            .pipe(
                map(serverResult => serverResult as string[]),
                catchError(handleError)
            );
    }

    saveImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('imageData', file);
        return this.http.post(this.endpointUrl, formData)
            .pipe(
                map(serverResult => serverResult),
                catchError(handleError)
            );
    }
    deleteImage(imageId) {
        const deleteEndpoint = this.endpointUrl + '/' + imageId;
        return this.http.delete(deleteEndpoint)
            .pipe(
                map(serverResult => serverResult),
                catchError(handleError)
            );
    }
    deleteImageByUrl(avatarImgSrc: string): any {
        return this.http.delete(avatarImgSrc)
            .pipe(
                map(serverResult => serverResult),
                catchError(handleError)
            );
    }
}
