import { Categorie } from './categorie.model';

export class Budget{
    budgetId: number;
    budgetName: string;
    budgetAmount: number;
    includedCategories: Categorie[] = [];
   


    constructor(budgetName:string, budgetAmount: number){
        this.budgetAmount = budgetAmount;
        this.budgetName = budgetName;  
     }
     
}