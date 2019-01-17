import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/shared/budget.model';
import { BudgetService } from 'src/app/budget.service';

@Component({
  selector: 'app-budget-settings',
  templateUrl: './budget-settings.component.html',
  styleUrls: ['./budget-settings.component.css']
})
export class BudgetSettingsComponent implements OnInit {
  budgets: Budget[];
  budgetCounter:number = 0;
  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.budgets = this.budgetService.getBudgets();
  }

  onAddBudget(inputName, inputAmount){
    this.budgetService.onAddBudget(new Budget(this.budgetService.getCounter(), inputName.value, inputAmount.value));
    this.budgetService.increaseCounter();
    
    
  }

}
