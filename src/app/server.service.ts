import { Injectable } from '@angular/core';

import { Booking} from './shared/booking.model'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable()
export class ServerService {
baseurl = 'http://localhost:3000/';
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};
loggedIn:boolean = false;
name:string

loggedInchanged = new Subject<Boolean>();
  
constructor(private http: HttpClient) { }  

  login(data){ return this.http.post(this.baseurl + 'login', data, this.httpOptions); };

  register(data){ return this.http.post(this.baseurl+ 'register', data, this.httpOptions); };

// ------------------------------------  Booking Operations  -----------------------------------------

  getBookings() { return this.http.get(this.baseurl + 'booking', this.httpOptions); };

  postBookings(booking: Booking){ return this.http.post(this.baseurl + 'booking/save', booking, this.httpOptions); };

// ------------------------------------  Budget Operations  -----------------------------------------

  getBudgets(){ return this.http.get(this.baseurl + 'budgets', this.httpOptions); };

  postBudget(data){ return this.http.post(this.baseurl + 'budgets/save',  data, this.httpOptions); };

  updateBudgetAmount(data){ return this.http.put(this.baseurl + 'budgets/update/' + data.id, data, this.httpOptions); };

  deleteBudget(data:number){ return this.http.delete(this.baseurl + 'budgets/delete/' + data, this.httpOptions); };

// ------------------------------------  Categorie Operations  -----------------------------------------

  getCategories(){ return this.http.get(this.baseurl + 'categories', this.httpOptions); };

  postCategorie(data){ return this.http.post(this.baseurl + 'categories/save', data, this.httpOptions); };

  deleteCategorie(data){ return this.http.delete(this.baseurl + 'categories/delete/' + data.id, this.httpOptions)}; 

  updateCategorieAmount(data){ return this.http.put(this.baseurl + 'categories/update/' + data.id, data.amount, this.httpOptions);};

  addCategorieToBudget(data){ return this.http.put(this.baseurl + 'categories/budgetID/' + data.categorieID, data, this.httpOptions); };

  getCategorieOfBudget(data){ return this.http.get(this.baseurl + `categories/budgetCat/` + data, this.httpOptions); };

  // ------------------------------------  Set Token  -----------------------------------------

  setToken(token:string){ this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + token); };


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
