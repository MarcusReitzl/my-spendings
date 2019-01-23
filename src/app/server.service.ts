import { Injectable } from '@angular/core';

import { Booking} from './shared/booking.model'
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class ServerService {

  



  constructor(private http: HttpClient) { }

  initialRequest() {
    return this.http.get('http://localhost:3000/booking');
  }

  putBookings(booking: Booking){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(booking);
    
    return this.http.post('http://localhost:3000/booking/save', booking, httpOptions);
  }

}
