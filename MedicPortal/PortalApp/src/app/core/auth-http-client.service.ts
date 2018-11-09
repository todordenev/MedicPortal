import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { authTokenNameConst, serverApiUrl } from '../shared/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthHttpClientService {
  private swapUrl: boolean;

  get httpOptions() {
    const authToken = localStorage.getItem(authTokenNameConst);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Authorization': `Bearer ${authToken}`
    });
    return { headers: headers };
  }
  constructor(private http: HttpClient) {
    if (location.origin !== serverApiUrl) {
    //  this.swapUrl = true;
    }
  }

  get(url) {
    if (this.swapUrl) {
      url = serverApiUrl + url;
    }
    return this.http.get(url, this.httpOptions);
  }

  post(url, body?) {
    if (this.swapUrl) {
      url = serverApiUrl + url;
    }
    return this.http.post(url, body, this.httpOptions);
  }
  patch(url, body?) {
    if (this.swapUrl) {
      url = serverApiUrl + url;
    }
    return this.http.patch(url, body, this.httpOptions);
  }
  delete(url: string): any {
    if (this.swapUrl) {
      url = serverApiUrl + url;
    }
    return this.http.delete(url, this.httpOptions);
  }
}
