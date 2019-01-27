import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/shared/budget.model';
import { BudgetService } from 'src/app/budget.service';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-budget-settings',
  templateUrl: './budget-settings.component.html',
  styleUrls: ['./budget-settings.component.css']
})
export class BudgetSettingsComponent implements OnInit {
  budgets: Budget[];
  
  constructor(private budgetService: BudgetService, private serverService: ServerService) { }

  ngOnInit() {
    this.budgets = this.budgetService.getBudgets();
    this.budgetService.budgetChanged.subscribe(
      ()=> (this.budgets = this.budgetService.getBudgets())
    );
  }

  onAddBudget(inputName, inputAmount){
    let data = {
      name: inputName.value,
      amount: inputAmount.value
    };

    this.budgetService.onAddBudget(new Budget(inputName.value, inputAmount.value));
    this.serverService.postBudget(data).subscribe(
      (response) => {this.budgetService.setID(response)}
    )
    
    
    
  }

}
