import { Component, OnInit } from '@angular/core';
import { Booking } from '../shared/booking.model';
import { BookingService } from '../booking.service';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../shared/categorie.model';
import { FilterService } from '../filter.service';

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
  page:number = 1;
  displayArray: any[] = [];


  constructor(private bookingService: BookingService, 
    private kategorieService: CategorieService, 
    
    private filterService: FilterService) { }

  ngOnInit() {
    this.bookings = this.bookingService.getBookings(); 
    this.categorieArray = this.kategorieService.getCategories();

    this.kategorieService.valueChanged.subscribe(
      (categories) => {   
        this.categorieArray = categories;
      });
    

    this.bookingService.bookingchanged.subscribe(
      (bookings: any[]) => {
        for(let booking of bookings){
          let date = booking.date;
          booking.date = date.split("T")[0];
        };
        this.bookings = bookings;
        
      }
    );
  }

  onSetFilter(inputFromDate, inputToDate, inputSelKat){
    this.filterBookings = this.filterService.filterArray(inputFromDate.value, inputToDate.value, inputSelKat.value, this.bookings);
    this.showFilter = true;
  }

  onClearFilter(){
      this.showFilter = false;
      this.filterBookings = [];  
  }   

  setDisplayArry(){
    let fromIndex = this.page * 10 - 10
    let toIndex
    this.displayArray = []
    for(fromIndex; fromIndex < toIndex; fromIndex++){
      this.displayArray.push(this.bookings[fromIndex]);
    }
  }

  nextPage(){
    this.page++;
  }
  previousPage(){
    this.page--;
  } 

  
}


