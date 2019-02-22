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

    saveImage(file: File) {
        const formData = new FormData();
        formData.append('imageData', file);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        return this.http.post(this.endpointUrl, formData, { 'headers': headers })
            .pipe(
                map(serverResult => serverResult),
                catchError(handleError)
            );
    }

    getImages(): Observable<string[]> {
        return this.http.get(this.endpointUrl)
            .pipe(
                map(serverResult => serverResult as string[]),
                catchError(handleError)
            );
    }
}
