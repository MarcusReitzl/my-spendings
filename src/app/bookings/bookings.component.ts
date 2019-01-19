import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Booking } from '../shared/booking.model';
import { BookingService } from '../booking.service';
import { KategorieService } from '../kategorie.service';
import { Categorie } from '../shared/categorie.model';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings: Booking[];
  filterBookings: Booking[] = [];
  categorieArray: Categorie[];
  showFilter: boolean = false;


  constructor(private bookingService: BookingService, private kategorieService: KategorieService, private serverService: ServerService) { }

  ngOnInit() {
    this.bookings = this.bookingService.getBookings(); 
    this.categorieArray = this.kategorieService.getCategorie();

   
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

  onSaveBookings(){
    // this.serverService.putBookings(this.bookings).subscribe(
    //   (response: Response) => (console.log(response)),
    //   (error) => (console.log(error))
      
    // );
  }

  onGetBookings(){
    this.serverService.initialRequest().subscribe(
      (response:Response) => {
      const data = response.json();
      this.bookings = data;
      this.bookingService.setBookings(data);
    },
      (error) => {console.log(error);}
     );
  }
}
