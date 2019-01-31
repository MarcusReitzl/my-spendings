import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BudgetService } from '../budget.service';
import { CategorieService } from '../categorie.service';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
filtered: boolean = false
@ViewChild('barChart') private chartRef;
chart:any;
budgets: any[] = [];
labels: any[] = [];
dataUsed: any[] = [];
dataAvailable: any[] = [];


  constructor(private budgetService: BudgetService, 
    private categorieService: CategorieService,
    private filterService: FilterService) { }

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
          {data:this.dataAvailable, label: 'verfügbar', backgroundColor: '#FF8080', alpha: 0.5},
          {data:this.dataUsed, label:'verbraucht', backgroundColor: '#8091FF', alpha: 0.5 }          
        ]},
        options:{
          tooltips:{
            mode:'label'
        },
          scales: {
            yAxes: [{
              ticks:{
                beginAtZero:true
              }
            }]
          },
        scaleShowVerticalLines: false,
        responsive: true
        }
      }
    );
    
  this.budgetService.budgetChanged.subscribe(
    (budgets:any[])=>{
      
      this.prepareArray(this.budgets);
      this.chart.update();
      this.chart.render(); 
    }
  )

  this.categorieService.valueChanged.subscribe(
    ()=>{
      this.prepareArray(this.budgets);
      this.chart.update();
      this.chart.render();
    }
  )
}

 
    
  setFilter(fromDate, toDate, budgetInput){
    let filteredArray: any[] = [];
    filteredArray = this.filterService.filterArray(fromDate.value, toDate.value, 'unselected', this.budgets);
    if(budgetInput === 'unselected'){
  //   this.chart = new Chart(this.chartRef.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: this.labels,
  //       datasets:[
  //         {data:this.dataAvailable, label: 'available', backgroundColor: '#FF8080', alpha: 0.5},
  //         {data:this.dataUsed, label:'used', backgroundColor: '#8091FF', alpha: 0.5 }          
  //       ],
  //       options:{
        
  //       scaleShowVerticalLines: false,
  //       responsive: true
  //     }
  //   }
  // });
  // this.chart.update();
} else {
  console.log('else?');
  let newLabels: string[] = [];
  let filteredArray: any[] = [];
  for(let budget of this.budgets){
    if(budget.budgetName === budgetInput.value){ 
      for(let categorie of budget.includedCategories){
      newLabels.push(categorie.name);
      filteredArray.push(categorie.amount);
      }
    }
  }
  this.chart.destroy();
  this.chart = new Chart(this.chartRef.nativeElement, {
    type: 'bar',
    data: {
      labels: newLabels,
      datasets:[
        {data:filteredArray, 
          backgroundColor: ['#FF8080', '#8091FF', ]}       
      ],
    },
      options:{
        scales: {
          yAxes: [{
            ticks:{
              beginAtZero:true
            }
          }]
        },
      scaleShowVerticalLines: false,
      responsive: true,
      legend:{
        display:false
      }
    }
  }
);

}
    this.prepareArray(filteredArray);
    this.filtered = true;
    this.chart.update();
  }
  
  clearFilter(){
   this.filtered = false;
   this.prepareArray(this.budgets);
   this.chart.destroy();
   
   this.chart = new Chart(this.chartRef.nativeElement, {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets:[
        {data:this.dataAvailable, label: 'verfügbar', backgroundColor: '#FF8080', alpha: 0.5},
        {data:this.dataUsed, label:'verbraucht', backgroundColor: '#8091FF', alpha: 0.5 }          
      ]
    },
      options:{
        tooltips:{
          mode:'label'
        },
        scales: {
          yAxes: [{
            ticks:{
              beginAtZero:true
            }
          }]
        },
        scaleShowVerticalLines: false,
        responsive: true
      }
    }
  );
   this.chart.update();
  }

  prepareArray(budgets: any[]){
    this.dataUsed = [];
    this.dataAvailable = [];
    this.labels = [];
    this.budgetService.getCategorieOfBudget();

    for(let budget of budgets){
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
