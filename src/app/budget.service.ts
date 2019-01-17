import { Budget } from './shared/budget.model';


export class BudgetService {
 budgets: Budget[] = [];
 private budgetCounter:number = 0;


 onAddBudget(budget: Budget){
    this.budgets.push(budget);
 }

 getBudgets(){
     return this.budgets;
 }

 getSingleBudget(id:number){
     if(this.budgets[+id]){
         return this.budgets[+id];
     }
    
 }
 increaseCounter(){
    this.budgetCounter++;
 }
 getCounter(){
     return this.budgetCounter;
 }
}