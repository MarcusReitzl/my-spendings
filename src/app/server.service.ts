import { Injectable } from '@angular/core';

import { Booking} from './shared/booking.model'
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class ServerService {
baseurl = 'http://localhost:3000/';
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'my-auth-token'
  })
};
  



  constructor(private http: HttpClient) { }

  initialRequest() { return this.http.get(this.baseurl + 'booking'); }

  putBookings(booking: Booking){ return this.http.post(this.baseurl + 'booking/save', booking, this.httpOptions); }

  login(data){ return this.http.post(this.baseurl + 'login', data, this.httpOptions); }

  register(data){ return this.http.post(this.baseurl+'register', data, this.httpOptions); }

}
