import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { BudgetService } from '../budget.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private serverService: ServerService, 
  private router:Router,
  private categorieService: CategorieService,
  private budgetService: BudgetService,
  private bookingService: BookingService) { }

  ngOnInit() {
  }

  onLogin(username, password){
    let data = {
      'user' : username.value,
      'pass' : password.value
    }

    //post logindata
    this.serverService.login(data).subscribe(
      (token) => {this.serverService.setToken(token['token']);
      this.serverService.toogleLoggedIn();
      
    // get categories
      this.serverService.getCategories().subscribe(
        (categories: any[])=>{this.categorieService.setCategorie(categories);}
      );

    // get Budgets
      this.serverService.getBudgets().subscribe(
      (budgets:any)=>{this.budgetService.setBudgets(budgets); 
        for(let budget of budgets){
            this.serverService.getCategorieOfBudget(budget.budgetId).subscribe(
            (categorie)=>{console.log(categorie); this.budgetService.setincludedCategories(budget.budgetId,categorie);});
        }  
      });

    //get Bookings
      this.serverService.getBookings().subscribe(
        (bookings: any[]) => {     
        for(let booking of bookings ){
          let date = booking.date;
          booking.date = date.split("T")[0];
        };
        this.bookingService.setBookings(bookings);
      });
      this.router.navigate(['main']);
      },
      (error) => (console.log(error))     
    );

  
    
    
  }

}
