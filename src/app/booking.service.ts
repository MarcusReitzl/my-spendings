import { Booking } from './shared/booking.model'

export class BookingService{

    bookings: Booking[] = [
        new Booking(1, "Billa", 120, "Einnahmen", "Lebensmittel", new Date().toISOString().split("T")[0]),
        new Booking(2, "Billa", 120, "Einnahmen", "Lebensmittel", new Date().toISOString().split("T")[0]),
        new Booking(3, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date().toISOString().split("T")[0]),
        new Booking(4, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date().toISOString().split("T")[0]),
        new Booking(5, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date("2018-12-24").toISOString().split("T")[0]),
        new Booking(6, "Billa", 120, "Einnahmen", "Lebensmittel", new Date("2018-12-24").toISOString().split("T")[0]),
        new Booking(7, "Billa", 120, "Einnahmen", "Reinigungsmaterial", new Date("2018-11-24").toISOString().split("T")[0]),
        new Booking(8, "Billa", 120, "Einnahmen", "Lebensmittel", new Date("2018-10-24").toISOString().split("T")[0]),
    

    
    
    ];

      counter:number = 1;

    onAddNew(text: string, value: number, type: string, kategorie:string){
        this.bookings.push(new Booking(this.counter, text, value, type, kategorie, new Date().toISOString().split("T")[0]));
        this.counter++;
    }
    
    getBookings(){
        return this.bookings.slice();
    }
}