import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {BookingService} from '../booking.service';
import {KategorieService} from '../kategorie.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categorieArray: string[];
  bookingResponse: string;
  chart: any;
  @ViewChild('lineChart') private chartRef;
  data = [120, 50, 30];
  labels: string[] = ['Essen', 'Reinigung', 'Katzen'];


  constructor(private bookingservice: BookingService, private kategorieservice: KategorieService) {
  }

  ngOnInit() {
    this.categorieArray = this.kategorieservice.getCategorie();
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
  }


  onAddAusgaben(inputText, inputNumber, inputKategorie) {
    this.bookingservice.onAddNew(inputText.value, inputNumber.value, 'Ausgaben', inputKategorie.value);
    this.bookingResponse = "Ausgang: " + inputText.value + " mit der Kategorie " + inputKategorie.value + " verbucht."
  };

  onAddEinnahmen(inputText, inputNumber, inputKategorie) {
    this.bookingservice.onAddNew(inputText.value, inputNumber.value, 'Einnahmen', inputKategorie.value);
    this.bookingResponse = "Eingang: " + inputText.value + " mit der Kategorie " + inputKategorie.value + " verbucht."

  };


}
