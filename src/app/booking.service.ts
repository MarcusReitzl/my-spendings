import { Booking } from './shared/booking.model'
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';

@Injectable()
export class BookingService{
    booking: Booking;
    latest:number;
    bookings: Booking[] = [
        // new Booking(1, "Billa", 120, "Einnahmen", "Lebensmittel", new Date().toISOString().split("T")[0]),
        // new Booking(2, "Billa", 120, "Einnahmen", "Lebensmittel", new Date().toISOString().split("T")[0]),
        // new Booking(3, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date().toISOString().split("T")[0]),
        // new Booking(4, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date().toISOString().split("T")[0]),
        // new Booking(5, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date("2018-12-24").toISOString().split("T")[0]),
        // new Booking(6, "Billa", 120, "Einnahmen", "Lebensmittel", new Date("2018-12-24").toISOString().split("T")[0]),
        // new Booking(7, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date("2018-11-24").toISOString().split("T")[0]),
        // new Booking(8, "Billa", 120, "Einnahmen", "Lebensmittel", new Date("2018-10-24").toISOString().split("T")[0]),
    

    
    
    ];

    

    constructor(private serverService: ServerService){ }

    onAddNew(text: string, value: number, type: string, kategorie:string){
        this.latest = this.bookings.length;
        this.booking = new Booking(this.latest, text, value, type, kategorie, new Date().toISOString().split("T")[0])
        this.bookings.push(this.booking);
        this.serverService.putBookings(this.booking).subscribe(
            (response: Response) => (console.log(response))
        );
        
    }
    
    getBookings(){
        return this.bookings.slice();
    }

    setBookings(bookings: Booking[]){
        this.bookings = bookings;
    }
   
    
}