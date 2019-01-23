export class Booking{
    id:number = null;
    text: string;
    value: number;
    type:string;
    kategorie: string;
    date: string;

    constructor( text:string, value:number, type:string, kategorie:string, date){
        
        this.text = text;
        this.value = value;
        this.type = type;
        this.kategorie = kategorie;
        this.date = date;
    }
}

