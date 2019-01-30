import { Budget } from './shared/budget.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { CategorieService } from './categorie.service';

@Injectable()
export class BudgetService {
 budgets: any[] = [];
 
 budgetChanged = new Subject<Budget[]>();

constructor(private serverService: ServerService){}



    onAddBudget(data){
        this.serverService.postBudget(data).subscribe(
        (budgets: any[]) => {
        this.budgets = budgets    
        this.budgetChanged.next();
    });
}

    getBudgets(){
        return this.budgets;
    }

    getSingleBudget(id:number){
        for (let bud of this.budgets){
            if(bud.budgetId === id){
                return bud;
            }
        }
    }

    setBudgets(budgets){
        this.budgets = budgets;
        this.budgetChanged.next(this.budgets);
    }

    setincludedCategories(id, categories){
        let cats = [];
        for(let cat of categories){
        cats.push({id: cat.Id, name: cat.name, amount: cat.amount});
        }
        for(let budget of this.budgets){
            if(budget.budgetId === id){
                budget.includedCategories = cats
            }
        }
        this.budgetChanged.next();
    }
    
    deleteBudget(id){
        this.serverService.deleteBudget(id).subscribe((budgets: any[])=>{
            this.budgets = budgets;
            this.budgetChanged.next(this.budgets);
        });            
    }
    
    getIdOf(name){
        for(let i = 0; i < this.budgets.length; i++){
            if(this.budgets[i].budgetName === name){
                return this.budgets[i].budgetId;
            }
        }
    }

    setAmount(data){
        this.serverService.updateBudgetAmount(data).subscribe(
            (budgets: any[]) => {
                this.budgets = budgets;
                this.budgetChanged.next(this.budgets);
            }
        )
    }

    getCategorieOfBudget(){
        for(let budget of this.budgets){           
            this.serverService.getCategoriesOfBudget(budget.budgetId).subscribe(
                (response:any[]) => {

                    budget.includedCategories = response;
                }
            );
        }
        // this.budgetChanged.next(this.budgets);
    }

}