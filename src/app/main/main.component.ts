import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../booking.service';
import { CategorieService } from '../categorie.service';
import { Chart } from 'chart.js';
import { Categorie } from '../shared/categorie.model';
import { ServerService } from '../server.service';
import { Booking } from '../shared/booking.model';
import { BudgetService } from '../budget.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  categorieArray: any[];
  bookingResponse: string;
  chart: any;
  @ViewChild('lineChart') private chartRef;
  data: number[] = [];
  labels: string[] = [];
  booking: Booking;
  


  constructor(private bookingservice: BookingService, 
    private categorieService: CategorieService, 
    private serverService: ServerService,
    private budgetService: BudgetService) {
  }

  ngOnInit() {  
    this.categorieArray = this.categorieService.getCategories();
    this.prepareArray();
    
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            borderColor: 'black',
            backgroundColor: ['#FF8080', '#8091FF', '#F7FF80', '#A6FF80' , '#DA80FF'],
            fill: false
          }]
      }
    });

    this.categorieService.valueChanged
    .subscribe(
      (categorie: Categorie[])=>{
      this.categorieArray = this.categorieService.getCategories();
      this.prepareArray();
      this.chart.update();
      this.chart.render();
      }
    );    
  }

  onAddAusgaben(inputText, inputNumber, inputCategorie) {
    if(inputCategorie.value === 'unselected'){
      this.bookingResponse = 'Bitte Kategorie auswählen.'
    } else {
      this.bookingResponse = "Ausgang: " + inputText.value + " mit der Kategorie " + inputCategorie.value + " verbucht."
      
      let catId = this.categorieService.getIdOf(inputCategorie.value)
      let bookingText = inputText.value;
      let bookingAmount = inputNumber.value;
      let bookingCategorie = inputCategorie.value;
      
      let data = { 
        text: bookingText,
        katId: catId,   
        amount: bookingAmount,
        date: new Date()
      }

      let categorieUpdate = {
        katId: catId,
        categorie: bookingCategorie,
        amount: bookingAmount
      }
      
      this.bookingservice.addBooking(data);
      this.categorieService.updateSpendings(categorieUpdate);
    };  
  }
    
  prepareArray(){
    for(let i = 0; i < this.categorieArray.length;i++){
      this.labels[i] = this.categorieArray[i].name;
      this.data[i] = this.categorieArray[i].value;
    }
  }
}