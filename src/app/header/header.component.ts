import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { BudgetService } from '../budget.service';
import { CategorieService } from '../categorie.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  name:string;

  constructor(private serverService:ServerService, 
    private router: Router,
    private budgetService: BudgetService,
    private categorieService: CategorieService,
    private bookingService: BookingService) { }

  ngOnInit() {
    this.serverService.loggedInchanged.subscribe(
      ()=>{
        this.loggedIn = this.serverService.getStatus();
        this.name = this.serverService.getName();
      }
    )
  }

  logOut(){
    this.serverService.toogleLoggedIn();
    this.serverService.httpOptions.headers.set('Authorization', "");
    this.budgetService.setBudgets([]);
    this.bookingService.setBookings([]);
    this.categorieService.setCategorie([]);
    // this.router.navigate(['main']);
  }
  


}
