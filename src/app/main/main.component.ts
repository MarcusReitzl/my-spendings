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
    private kategorieservice: CategorieService, 
    private serverService: ServerService,
    private budgetService: BudgetService) {
  }

  ngOnInit() {  
    this.categorieArray = this.kategorieservice.getCategories();
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

    this.bookingservice.bookingchanged
    .subscribe(
      ()=>{
        this.categorieArray = this.kategorieservice.getCategories();
        this.prepareArray();
        this.chart.update();
        this.chart.render();
        }
    )

    this.kategorieservice.valueChanged
    .subscribe(
      (categorie: Categorie[])=>{
      this.categorieArray = this.kategorieservice.getCategories();
      this.prepareArray();
      this.chart.update();
      this.chart.render();
      }
    );
   
     
  }


  onAddAusgaben(inputText, inputNumber, inputKategorie) {
    if(inputKategorie.value === 'unselected'){
      this.bookingResponse = 'Bitte Kategorie auswählen.'
    } else {
      //this.bookingservice.onAddNew(inputText.value, inputNumber.value, 'Ausgaben', inputKategorie.value);
      this.bookingResponse = "Ausgang: " + inputText.value + " mit der Kategorie " + inputKategorie.value + " verbucht."
      this.kategorieservice.addOutcome(inputKategorie.value, inputNumber.value);
      
      let katId = this.kategorieservice.getIdOf(inputKategorie.value);   
      let data = {
         
        text: inputText.value,
        katId: katId,   
        amount: inputNumber.value,
        date: new Date().toISOString().slice(0,19).replace("T", " ")
      }

      let updateData = {
        katId: katId,
        amount: inputNumber.value,
      }
      
      this.serverService.postBookings(data).subscribe(
        (response: any[]) => (this.bookingservice.setBookings(response)
        ));
  
      this.serverService.updateCategorieAmount(updateData).subscribe(
      (response) =>(console.log(response)),
      (error) => (console.log(error))
      );
      this.serverService.getBudgets().subscribe(
        (budgets:any)=>{this.budgetService.setBudgets(budgets); 
          for(let budget of budgets){
            this.serverService.getCategorieOfBudget(budget.budgetId).subscribe(
            (categorie)=>{console.log(categorie); this.budgetService.setincludedCategories(budget.budgetId,categorie);});
          }  
        });
      
    };  
  
    }
    
  // onAddEinnahmen(inputText, inputNumber, inputKategorie) {
  //   this.bookingservice.onAddNew(inputText.value, inputNumber.value, 'Einnahmen', inputKategorie.value);
  //   this.bookingResponse = "Eingang: " + inputText.value + " mit der Kategorie " + inputKategorie.value + " verbucht."
    
  // };

  prepareArray(){
    for(let i = 0; i < this.categorieArray.length;i++){
      this.labels[i] = this.categorieArray[i].name;
      this.data[i] = this.categorieArray[i].value;
    }
  }
}