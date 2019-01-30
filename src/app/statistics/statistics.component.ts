import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BudgetService } from '../budget.service';
import { CategorieService } from '../categorie.service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
@ViewChild('barChart') private chartRef;
chart:any;
budgets: any[] = [];
labels: any[] = [];
dataUsed: any[] = [];
dataAvailable: any[] = [];


  constructor(private budgetService: BudgetService, 
    private categorieService: CategorieService) { }

  ngOnInit() {

    this.budgets = this.budgetService.getBudgets();
    

    for(let budget of this.budgets){
      this.labels.push(budget.budgetName);
      this.dataAvailable.push(budget.value);
      let budgetUsedCounter: number = 0;
      for(let include of budget.includedCategories){ 
        budgetUsedCounter = budgetUsedCounter + parseInt(include.amount);
      }
     this.dataUsed.push(budgetUsedCounter);
    }

    

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets:[
          {data:this.dataAvailable, label: 'available', backgroundColor: '#FF8080', alpha: 0.5},
          {data:this.dataUsed, label:'used', backgroundColor: '#8091FF', alpha: 0.5 }          
        ],
        options:{
        
        scaleShowVerticalLines: false,
        responsive: true
      }
    }
  });
    
    this.budgetService.budgetChanged.subscribe(
      (budgets:any[])=>{
        
        this.prepareArray();
        this.chart.update();
        this.chart.render(); 
      }
    )

    this.categorieService.valueChanged.subscribe(
      ()=>{
        this.prepareArray();
        this.chart.update();
        this.chart.render();
      }
    )
}

  prepareArray(){
    this.dataUsed = [];
    this.dataAvailable = [];
    this.labels = [];
    this.budgetService.getCategorieOfBudget();

    for(let budget of this.budgets){
      this.labels.push(budget.budgetName);
      this.dataAvailable.push(budget.value);
      let budgetUsedCounter: number = 0;

      for(let include of budget.includedCategories){ 
        budgetUsedCounter = budgetUsedCounter + parseInt(include.amount);
      }
     this.dataUsed.push(budgetUsedCounter);
    }
    
    

  }

}
