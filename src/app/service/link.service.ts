import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private apiUrl = 'https://api-ssl.bitly.com/v4/shorten'

  constructor(private http: HttpClient) { }

  getShortenLink(longUrl: string): Observable<any> {
    const token = '3c7ea3aca0fbe262774476f4f98af1db170dcc19'

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      long_url: longUrl
    }

    return this.http.post(this.apiUrl, body, { headers })
  }
}
