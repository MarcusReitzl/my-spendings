import { Booking } from './shared/booking.model'
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Subject } from 'rxjs';

@Injectable()
export class BookingService{
    bookingchanged = new Subject<Booking[]>();
    latest:number;
    bookings: any[] = [];

    constructor(private serverService: ServerService){ }

    addBooking(data){
        this.serverService.postBookings(data).subscribe(
        (bookings: any[]) => {
            this.bookings = bookings;
            this.bookingchanged.next(this.bookings);
        });
    }

    getBookings(){
        return this.bookings;
    }

    setBookings(booking: Booking[]){
        this.bookings = booking;
        for(let book of booking){
            book.date = book.date.split("T")[0];
        }
        this.bookingchanged.next(this.bookings);   
    }

    getSingleBooking(id){
        for(let booking of this.bookings){
            if(booking.id === id){
                return booking;
            }
        }
    }

    updateBooking(data){
        this.serverService.updateBooking(data).subscribe((booking: any[])=>{
            this.bookings = booking;
            this.bookingchanged.next(this.bookings);
        });
    }

    deleteBooking(id){
        this.serverService.deleteBooking(id).subscribe(
        (bookings: any[]) => {
            this.bookings = bookings;
            this.bookingchanged.next(this.bookings);
        });
    }
}

    
