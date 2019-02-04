import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import { CategorieService } from 'src/app/categorie.service';
import { ServerService } from 'src/app/server.service';
import { BudgetService } from 'src/app/budget.service';


// Komponente für einzelne Buchungen (ändern) angelegt wird sie in der Main
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
//einzelnen Buchung wird als Module übergeben
export class BookingComponent implements OnInit {
booking;
categories: any[];
id;
response = '';

//Services werden injected
constructor(private route: ActivatedRoute, 
  private bookingService:BookingService, 
  private categorieService: CategorieService,
  private serverService: ServerService,
  private router:Router,
  private budgetService: BudgetService) { }


  //holt sich den Parameter aus der URL, und ladet die Buchung wo die ID übereinstimmt
  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
    this.id = +params['id']; 
    this.booking = this.bookingService.getSingleBooking(this.id);
    },
    (error) => (console.log(error))
    );
    //setze Kategorien für DropDown Menu
    this.categories = this.categorieService.getCategories();
    this.categorieService.valueChanged.subscribe(   //subcribed ValueChange aus dem KategorieService und holt sich gegebenenfalls die neuen Kategorien
      (categories)=>(this.categories=categories)
    );  
  }

  //Es wird an einer bestehenden Buchung etwas geändert
  onChangeBooking(buchungstext, buchungsbetrag, kategorie){
    if(buchungsbetrag === 0){
      this.response = 'Bitte Buchungsbetrag eingeben.'

    } else if(kategorie.value === 'unselected' || kategorie.value === this.booking.kategorie) { //unselected bzw. unverändert
      let katId = this.categorieService.getIdOf(this.booking.kategorie);
      let differ = (parseInt(this.booking.value) - parseInt(buchungsbetrag.value))*(-1);
    
      //Buchung wird als JSON Objekt angelegt
      let dataNew = {
        id: this.id, 
        name: buchungstext.value,
        amount: buchungsbetrag.value,
        date: this.booking.date,
        categorie: this.booking.kategorie,
        katId: katId
      }

      //Kategorie wird als JSON Objekt angelegt
      let dataCatNew = {
        katId: katId,
        categorie: this.booking.kategorie,
        amount: differ,
      }

      //Übergibt jeweilige Werte an die dazugehörigen Services (schicken PostRequest)
      this.categorieService.updateSpendings(dataCatNew);
      this.bookingService.updateBooking(dataNew);
      
      //Kategorie nicht mehr unselected bzw. unverändert -> Fall das sich Kategorie auch geändert hat
      //Die aktuelle Kategorie wird um den Wert der Buchung verringert und der neuen Kategroie hinzugefügt
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


  //Buchung wird aus der Datenbank gelöscht und verringert die betreffende Kategorie um den Wert der Buchung  
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
