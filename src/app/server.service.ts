import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Booking} from './shared/booking.model'


@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  initialRequest() {
    return this.http.get('https://ng-http-15f7a.firebaseio.com/response.json');
  }

  putBookings(booking: Booking){
    return this.http.post('https://ng-http-15f7a.firebaseio.com/response.json', booking);
  }

}
