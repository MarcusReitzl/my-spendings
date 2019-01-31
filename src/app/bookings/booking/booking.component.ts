import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import { CategorieService } from 'src/app/categorie.service';
import { ServerService } from 'src/app/server.service';
import { BudgetService } from 'src/app/budget.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
booking;
categories: any[];
id;
response = '';

constructor(private route: ActivatedRoute, 
  private bookingService:BookingService, 
  private categorieService: CategorieService,
  private serverService: ServerService,
  private router:Router,
  private budgetService: BudgetService) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
    this.id = +params['id']; 
    this.booking = this.bookingService.getSingleBooking(this.id);
    },
    (error) => (console.log(error))
    );

    this.categories = this.categorieService.getCategories();
    this.categorieService.valueChanged.subscribe(
      (categories)=>(this.categories=categories)
    );  
  }

  onChangeBooking(buchungstext, buchungsbetrag, kategorie){
    if(buchungsbetrag === 0){
      this.response = 'Bitte Buchungsbetrag eingeben.'

    } else if(kategorie.value === 'unselected' || kategorie.value === this.booking.kategorie) {
      let katId = this.categorieService.getIdOf(this.booking.kategorie);
      let differ = (parseInt(this.booking.value) - parseInt(buchungsbetrag.value))*(-1);
    
      let dataNew = {
        id: this.id, 
        name: buchungstext.value,
        amount: buchungsbetrag.value,
        date: this.booking.date,
        categorie: this.booking.kategorie,
        katId: katId
      }

      let dataCatNew = {
        katId: katId,
        categorie: this.booking.kategorie,
        amount: differ,
      }
      this.categorieService.updateSpendings(dataCatNew);
      this.bookingService.updateBooking(dataNew);
      
    } else {

      let katId = this.categorieService.getIdOf(kategorie.value);
      let dataNew = {
        id: this.id, 
        name: buchungstext.value,
        amount: buchungsbetrag.value,
        date: this.booking.date,
        categorie: kategorie.value,
        katId: katId
      }
     
      let oldCatId = this.categorieService.getIdOf(this.booking.kategorie);
      let dataOld = {
        katId: oldCatId,
        categorie: this.booking.kategorie,
        amount: (this.booking.value)*(-1)
      }

      let dataCatNew = {
        katId: katId,
        categorie: kategorie.value,
        amount: buchungsbetrag.value
      }
        
      this.bookingService.updateBooking(dataNew);
      this.categorieService.updateSpendings(dataOld);
      this.categorieService.updateSpendings(dataCatNew);
    }
  }  
    
  onDeleteBooking(){
    let data = {
      katId: this.categorieService.getIdOf(this.booking.kategorie),
      categorie: this.booking.kategorie,
      amount: this.booking['value']*(-1)
    }
    this.bookingService.deleteBooking(this.booking.id);
    this.categorieService.updateSpendings(data);
    this.router.navigate(['bookings']);
  }
}
