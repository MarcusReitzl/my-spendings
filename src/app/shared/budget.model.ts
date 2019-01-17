export class Budget{
    budgetId: number;
    budgetName: string;
    budgetAmount: number;
    includedCategories: string[] = [];
   


    constructor(budgetId:number, budgetName:string, budgetAmount: number){
        this.budgetAmount = budgetAmount;
        this.budgetName = budgetName;
        this.budgetId = budgetId;
       
     }
}