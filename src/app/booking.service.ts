import { Booking } from './shared/booking.model'
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Subject } from 'rxjs';

@Injectable()
export class BookingService{
 
    bookingchanged = new Subject<Booking[]>();
    latest:number;
    bookings: any[] = [];

    

    constructor(){ }

    onAddNew(text: string, value: number, type: string, kategorie:string){
        // this.booking = new Booking(text, value, type, kategorie, new Date().toISOString().split("T")[0]);
        let booking = {
            id: null,
            text: text,
            value: value,
            kategorie: kategorie,
            
        }
        
        this.bookings.push(booking);
        this.bookingchanged.next(this.bookings);
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

    deleteBooking(id){
    for(let i=0; i < this.bookings.length; i++){
        if(this.bookings[i].id === id){
            
            this.bookings.splice(i,1);

            this.bookingchanged.next(this.bookings);

        }
    }

    }
   
    
}