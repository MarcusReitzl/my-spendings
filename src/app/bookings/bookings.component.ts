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
    this.categorieArray = this.kategorieService.getCategorie();

    this.bookingService.bookingchanged.subscribe(
      () => (this.bookings = this.bookingService.getBookings())
    )
    this.kategorieService.valueChanged.subscribe(
      () => (this.categorieArray = this.kategorieService.getCategorie())
    )
   
  }

  onSetFilter(inputFromDate, inputToDate, inputSelKat){

    console.log(inputFromDate.value);
    console.log(inputToDate.value);
    console.log(inputSelKat.value);
    if(this.filterBookings.length > 0){
      this.onClearFilter()
    }
    
    //Filter FromDate
    if(inputFromDate.value != "" && inputToDate.value === "" && inputSelKat.value === "unselected"){
    for(let i = 0; i < this.bookings.length; i++){ 
      if(this.bookings[i].date >= inputFromDate.value){
        this.filterBookings.push(this.bookings[i]);
      }
     }  
      this.showFilter = true;
      console.log("Filter FromDate");

    //Filter ToDate  
    }else if(inputToDate.value != "" && inputFromDate.value === "" && inputSelKat.value ==="unselected"){
      for(let i = 0; i < this.bookings.length; i++){ 
        if(this.bookings[i].date <= inputToDate.value){
          this.filterBookings.push(this.bookings[i]);
        }
       }  
      this.showFilter = true;
      console.log("Filter ToDate");

      //Filter Kategorie
    }else if(inputSelKat.value !== "unselected" && inputToDate.value === "" && inputFromDate.value === ""){
      for(let i = 0; i < this.bookings.length; i++){ 
        if(this.bookings[i].kategorie === inputSelKat.value){
          this.filterBookings.push(this.bookings[i]);
          
        }
       }  
       this.showFilter = true;
       console.log("Filter Kategorie");

       //Filter FromDate and ToDate
    }else if(inputFromDate.value !== "" && inputToDate.value !== "" && inputSelKat.value === "unselected"){
      for(let i = 0; i < this.bookings.length; i++){ 
        if(this.bookings[i].date >= inputFromDate.value && this.bookings[i].date <= inputToDate.value){
          this.filterBookings.push(this.bookings[i]);
        }
       }  
       this.showFilter = true;
       console.log("Filter FromDate and ToDate");

       //Filter FromDate and Kategorie
    }else if(inputFromDate.value !== "" && inputToDate.value === "" && inputSelKat.value !== "unselected"){
      for(let i = 0; i < this.bookings.length; i++){ 
        if(this.bookings[i].date >= inputFromDate.value && this.bookings[i].kategorie === inputSelKat.value){
          this.filterBookings.push(this.bookings[i]);
        }
       }  
       this.showFilter = true;
       //Filter ToDate and Kategorie

    }else if(inputToDate.value != "" && inputFromDate.value === "" &&inputSelKat.value != "unselected" ){
      for(let i = 0; i < this.bookings.length; i++){ 
        if(this.bookings[i].date <= inputToDate.value && this.bookings[i].kategorie === inputSelKat.value){
          this.filterBookings.push(this.bookings[i]);
        }
       }  
       this.showFilter = true;
       console.log("Filter ToDate and Kategorie");
       //Filter ToDate, FromDate and Kategorie

    }else if(inputToDate !== "" && inputFromDate.value !== "" && inputSelKat.value !== "unselected") {
      for(let i = 0; i < this.bookings.length; i++){ 
        if(this.bookings[i].date <= inputToDate.value && this.bookings[i].kategorie === inputSelKat.value && this.bookings[i].date >= inputFromDate.value){
          this.filterBookings.push(this.bookings[i]);
        }
       }  
       this.showFilter = true;
       console.log("Filter all");

       // No Filter Selected
    }else {
      console.log("No Filter selected");
      
    }   
  }

  onClearFilter(){
      this.showFilter = false;
      this.filterBookings = [];  
  }  

  onGetBookings(){
    this.serverService.initialRequest().subscribe(
      (response: any[]) => {
      const data = response;
     
      this.bookingService.setBookings(data);
      this.bookings = data;

      for(let booking of this.bookings ){
        this.date = booking.date;
        booking.date = this.date.split("T")[0];
      }

     
    },
      (error) => {console.log(error);}
     );
  }
}
