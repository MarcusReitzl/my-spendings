import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Booking } from '../shared/booking.model';
import { BookingService } from '../booking.service';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../shared/categorie.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: any[];
  filterBookings: Booking[] = [];
  categorieArray: Categorie[];
  showFilter: boolean = false;
  converter: Date;
  date:string;


  constructor(private bookingService: BookingService, private kategorieService: CategorieService, private serverService: ServerService) { }

  ngOnInit() {
    this.bookings = this.bookingService.getBookings(); 
    this.categorieArray = this.kategorieService.getCategories();

    this.bookingService.bookingchanged.subscribe(
      () => (this.bookings = this.bookingService.getBookings()));
      
    this.kategorieService.valueChanged.subscribe(
      () => (this.categorieArray = this.kategorieService.getCategories())
    )
  }

  onSetFilter(inputFromDate, inputToDate, inputSelKat){


    if(this.filterBookings.length > 0){
      this.onClearFilter()
    }
    
    //Filter FromDate
    if(inputFromDate.value !== "" && inputToDate.value === "" && inputSelKat.value === "unselected"){
    // for(let i = 0; i < this.bookings.length; i++){ 
    //   if(this.bookings[i].date >= inputFromDate.value){
    //     this.filterBookings.push(this.bookings[i]);
    //   }
    //  }  
    for(let booking of this.bookings){
      if(booking['date'] >= inputFromDate.value){
        this.filterBookings.push(booking);
      }
    }
      this.showFilter = true;
      console.log("Filter FromDate");

    //Filter ToDate  
    }else if(inputToDate.value !== "" && inputFromDate.value === "" && inputSelKat.value ==="unselected"){
      // for(let i = 0; i < this.bookings.length; i++){ 
      //   if(this.bookings[i].date <= inputToDate.value){
      //     this.filterBookings.push(this.bookings[i]);
      //   }
      //  }  
      for(let booking of this.bookings){
        if(booking['date'] <= inputFromDate.value){
          this.filterBookings.push(booking);
        }
      }
      this.showFilter = true;
      console.log("Filter ToDate");

      //Filter Kategorie
    }else if(inputSelKat.value !== "unselected" && inputToDate.value === "" && inputFromDate.value === ""){
      // for(let i = 0; i < this.bookings.length; i++){ 
      //   if(this.bookings[i].kategorie === inputSelKat.value){
      //     this.filterBookings.push(this.bookings[i]);
          
      //   }
      //  }  
      for(let booking of this.bookings){
          console.log(booking.kategorie);
          
        if(booking['kategorie'] === inputSelKat.value){
          this.filterBookings.push(booking);
        }
      }
       this.showFilter = true;
       console.log("Filter Kategorie");

       //Filter FromDate and ToDate
    }else if(inputFromDate.value !== "" && inputToDate.value !== "" && inputSelKat.value === "unselected"){
      // for(let i = 0; i < this.bookings.length; i++){ 
      //   if(this.bookings[i].date >= inputFromDate.value && this.bookings[i].date <= inputToDate.value){
      //     this.filterBookings.push(this.bookings[i]);
      //   }
      //  }  
      for(let booking of this.bookings){
        if(booking['date'] >= inputFromDate.value && booking['date'] <= inputToDate.value){
          this.filterBookings.push(booking);
        }
      }
       this.showFilter = true;
       console.log("Filter FromDate and ToDate");

       //Filter FromDate and Kategorie
    }else if(inputFromDate.value !== "" && inputToDate.value === "" && inputSelKat.value !== "unselected"){
      // for(let i = 0; i < this.bookings.length; i++){ 
      //   if(this.bookings[i].date >= inputFromDate.value && this.bookings[i].kategorie === inputSelKat.value){
      //     this.filterBookings.push(this.bookings[i]);
      //   }
      //  }  
      for(let booking of this.bookings){
        if(booking['date'] >= inputFromDate.value && booking['kategorie'] === inputSelKat.value){
          this.filterBookings.push(booking);
        }
      }
       this.showFilter = true;
       //Filter ToDate and Kategorie

    }else if(inputToDate.value != "" && inputFromDate.value === "" &&inputSelKat.value != "unselected" ){
      // for(let i = 0; i < this.bookings.length; i++){ 
      //   if(this.bookings[i].date <= inputToDate.value && this.bookings[i].kategorie === inputSelKat.value){
      //     this.filterBookings.push(this.bookings[i]);
      //   }
      //  }  
      for(let booking of this.bookings){
        if(booking['date'] <= inputToDate.value && booking['kategorie'] === inputSelKat.value){
          this.filterBookings.push(booking);
        }
      }
       
       this.showFilter = true;
       
       //Filter ToDate, FromDate and Kategorie

    }else if(inputToDate !== "" && inputFromDate.value !== "" && inputSelKat.value !== "unselected") {
      // for(let i = 0; i < this.bookings.length; i++){ 
      //   if(this.bookings[i].date <= inputToDate.value && this.bookings[i].kategorie === inputSelKat.value && this.bookings[i].date >= inputFromDate.value){
      //     this.filterBookings.push(this.bookings[i]);
      //   }
      //  }  
      for(let booking of this.bookings){
        if(booking['date'] <= inputToDate.value && booking['kategorie'] === inputSelKat.value && booking['date'] >= inputFromDate.value){
          this.filterBookings.push(booking);
        }
      }
       this.showFilter = true;
       

       // No Filter Selected
    }else {
      console.log("No Filter selected");
      
    }   
  }

  onClearFilter(){
      this.showFilter = false;
      this.filterBookings = [];  
  }       
}
