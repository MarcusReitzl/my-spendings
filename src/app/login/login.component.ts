// by David Langmeier
//
// gets data (username and pw) from form (onLogin)
// sends (posts) data to server via serverService
// if login data ok -> server generates and sends JSON Web Token back
// token is saved in serverService "httpOptions.headers"
// login procedure -> get categories, budget and bookings from server
// route to main

import {Component, OnInit, ViewChild} from '@angular/core';
import {ServerService} from '../server.service';
import {Router} from '@angular/router';
import {CategorieService} from '../categorie.service';
import {BudgetService} from '../budget.service';
import {BookingService} from '../booking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private serverService: ServerService,
              private router: Router,
              private categorieService: CategorieService,
              private budgetService: BudgetService,
              private bookingService: BookingService) {
  }

  ngOnInit() {
  }

  onLogin(username, password) {
    const data = {
      'user': username.value,
      'pass': password.value
    };

    // post logindata
    this.serverService.login(data).subscribe(
      (token) => {
        this.serverService.setToken(token['token']);
        this.serverService.toogleLoggedIn();

        // get categories
        this.serverService.getCategories().subscribe(
          (categories: any[]) => {
            this.categorieService.setCategorie(categories);
          }
        );

        // get Budgets
        this.serverService.getBudgets().subscribe(
          (budgets: any) => {
            this.budgetService.setBudgets(budgets);
            this.budgetService.getCategorieOfBudget();
          });

        // get Bookings
        this.serverService.getBookings().subscribe(
          (bookings: any[]) => {
            for (const booking of bookings) {
              const date = booking.date;
              booking.date = date.split('T')[0];
            }
            this.bookingService.setBookings(bookings);
          });
        this.router.navigate(['main']);
      },
      (error) => (console.log(error))
    );
  }
}
