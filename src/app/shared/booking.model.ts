export class Booking{
    id:number;
    text: string;
    value: number;
    type:string;
    kategorie: string;
    date: string;

    constructor(id:number, text:string, value:number, type:string, kategorie:string, date){
        this.id = id;
        this.text = text;
        this.value = value;
        this.type = type;
        this.kategorie = kategorie;
        this.date = date;
    }
}

