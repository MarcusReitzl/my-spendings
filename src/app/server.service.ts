import { Injectable } from '@angular/core';

import { Booking} from './shared/booking.model'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable()
export class ServerService {
baseurl = 'http://localhost:3000/';
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
    
  })
};
loggedIn:boolean = false;
name:string

loggedInchanged = new Subject<Boolean>();
  



  constructor(private http: HttpClient) { }

  initialRequest() { return this.http.get(this.baseurl + 'booking', this.httpOptions); }

  putBookings(booking: Booking){ return this.http.post(this.baseurl + 'booking/save', booking, this.httpOptions); }

  login(data){ return this.http.post(this.baseurl + 'login', data, this.httpOptions); }

  register(data){ return this.http.post(this.baseurl+ 'register', data, this.httpOptions); }

  getCategories(){ return this.http.get(this.baseurl + 'categorie', this.httpOptions); }

  getBudgets(){ return this.http.get(this.baseurl + 'budgets', this.httpOptions); }

  postCategorie(data){ return this.http.post(this.baseurl + 'categorie/save', data, this.httpOptions); }

  postBudget(data){ return this.http.post(this.baseurl + 'budget/save', data, this.httpOptions); }

  setToken(token:string){
   this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + token);
     
  }
  toogleLoggedIn(){
   this.loggedIn = !this.loggedIn;
   this.loggedInchanged.next();
  }
  setName(firstname, lastname){
    this.name = firstname + ' ' + lastname
  }

  getName(){ return this.name; }

  getStatus(){ return this.loggedIn }
}
