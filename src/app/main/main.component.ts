import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import { KategorieService } from '../kategorie.service';
import { Chart } from 'chart.js';
import { Categorie } from '../shared/categorie.model';
import { ServerService } from '../server.service';
import { Booking } from '../shared/booking.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categorieArray: Categorie[];
  bookingResponse: string;
  chart: any;
  @ViewChild('lineChart') private chartRef;
  data: number[] = [];
  labels: string[] = [];
  booking: Booking;
  


  constructor(private bookingservice: BookingService, private kategorieservice: KategorieService, private serverService: ServerService) {
  }

  ngOnInit() {
    this.categorieArray = this.kategorieservice.getCategorie();
    this.prepareArray();

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            borderColor: 'blue',
            fill: false
          }]
      }
    });

 

    this.kategorieservice.valueChanged
    .subscribe(
      (categorie: Categorie[])=>{
       this.prepareArray();
       this.chart.update();     
      }
    ) 
  }


  onAddAusgaben(inputText, inputNumber, inputKategorie) {
    this.bookingservice.onAddNew(inputText.value, inputNumber.value, 'Ausgaben', inputKategorie.value);
    this.bookingResponse = "Ausgang: " + inputText.value + " mit der Kategorie " + inputKategorie.value + " verbucht."
    this.kategorieservice.addOutcome(inputKategorie.value, inputNumber.value);
  };  

  onAddEinnahmen(inputText, inputNumber, inputKategorie) {
    this.bookingservice.onAddNew(inputText.value, inputNumber.value, 'Einnahmen', inputKategorie.value);
    this.bookingResponse = "Eingang: " + inputText.value + " mit der Kategorie " + inputKategorie.value + " verbucht."
    
  };

  prepareArray(){
    for(let i = 0; i < this.categorieArray.length;i++){
      this.labels[i] = this.categorieArray[i].name;
      this.data[i] = this.categorieArray[i].value;
    }
  }
}