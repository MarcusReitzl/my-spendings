import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BudgetService } from '../budget.service';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
@ViewChild('lineChart') private chartRef;
chart:any;
budgets: any[] = [];
categories: any[] = [];
labels: any[] = [];
budgetMax: any[] = [];

  constructor(private budgetService: BudgetService, private categorieService: CategorieService) { }
  barChartData;
  barChartLabels;
  barChartOptions;
  barChartLegend;
  barChartType;



  ngOnInit() {
    this.barChartOptions = {scaleShowVerticalLines: false, responsive: true};
    this.barChartType = 'bar';
    this.barChartLegend = 'true';
    this.barChartLabels = ['Essen', 'Trinken', 'Spiele'];
    this.barChartData = [
      {data: [120, 50, 200], label: 'Limit'},
      {data: [100, 23, 199], label: 'Verbraucht'}
    ]

  }

  prepareArray(){
    for(let i = 0; i < this.budgets.length;i++){
      this.labels[i] = this.budgets[i].budgetName;
      this.budgetMax[i] = this.budgets[i].value;
    }
  }
}
