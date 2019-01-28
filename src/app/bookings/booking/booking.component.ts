import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/booking.service';
import { CategorieService } from 'src/app/categorie.service';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
booking;
categories: any[];
id;

  constructor(private route: ActivatedRoute, 
    private bookingService:BookingService, 
    private categorieService: CategorieService,
    private serverService: ServerService,
    private router:Router) { }

  ngOnInit() {
    let sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.booking = this.bookingService.getSingleBooking(this.id);
      },(error) => (console.log(error)
      ))
      this.categories = this.categorieService.getCategories();
      this.categorieService.valueChanged.subscribe(
        ()=>(this.categories=this.categorieService.getCategories())
      );      
  }

  onChangeBooking(buchungstext, buchungsbetrag, kategorie){
    let katId = this.categorieService.getIdOf(kategorie.value);
    let data = {
      id: this.id, 
      name: buchungstext.value,
      price: buchungsbetrag.value,
      date: this.booking.date,
      katId: katId
    }
    
    this.serverService.updateBooking(data).subscribe((response: any[])=>(this.bookingService.setBookings(response)));


  }
  onDeleteBooking(){
    this.serverService.deleteBooking(this.id).subscribe(
      (response: any[]) => (this.bookingService.setBookings(response))
    );
    this.router.navigate(['bookings']);
  }
}
