import { Budget } from './shared/budget.model';
import { Subject } from 'rxjs';


export class BudgetService {
 budgets: Budget[] = [];
 
 budgetChanged = new Subject<Budget[]>();


    onAddBudget(budget: Budget){
        this.budgets.push(budget);
        this.budgetChanged.next();
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

    setID(id){
        this.budgets[this.budgets.length-1].budgetId = id;
        this.budgetChanged.next(this.budgets);
    }

    setBudgets(budgets){
        this.budgets = budgets;
        this.budgetChanged.next(this.budgets);
    }

    setincludedCategories(id, categories){
        let cats = [];
        for(let cat of categories){
        cats.push({id: cat.Id, name: cat.name});
        }
        for(let budget of this.budgets){
            if(budget.budgetId === id){
                budget.includedCategories = cats
            }
        }
    }
    
    deleteBudget(id){
        for(let i =0; i < this.budgets.length; i++){
            console.log(this.budgets[i].budgetId + ' '+ id)
            if(this.budgets[i].budgetId.toString() === id.toString()){
                this.budgets.splice(i,1);
                this.budgetChanged.next(this.budgets);
                   
            }
        }
    }

    deleteCategorieofBudget(catId){
        for(let budget of this.budgets){
           for(let i = 0; i < budget.includedCategories.length; i++){
                if(budget['includedCategories'][i]['id'] === catId){
                    budget.includedCategories.splice(i,1);
                    this.budgetChanged.next();
                }
            }
        } 
    
    }
    addCategorie(data){
        console.log(data);
    }

    getIdOf(name){
        for(let i = 0; i < this.budgets.length; i++){
            if(this.budgets[i].budgetName === name){
                return this.budgets[i].budgetId;
            }
        }
    }
}