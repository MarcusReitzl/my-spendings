import { Booking } from './shared/booking.model'
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';
import { Subject } from 'rxjs';

@Injectable()
export class BookingService{
    booking: Booking;
    bookingchanged = new Subject<Booking[]>();
    latest:number;
    bookings: Booking[] = [];

    

    constructor(private serverService: ServerService){ }

    onAddNew(text: string, value: number, type: string, kategorie:string){
        this.booking = new Booking(text, value, type, kategorie, new Date().toISOString().split("T")[0])
        this.bookings.push(this.booking);
    }
    
    getBookings(){
        return this.bookings;
    }

    setBookings(booking: Booking[]){
        this.bookings = booking;
        this.bookingchanged.next(booking);   
    }
   
    
}