import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/budget.service';
import { Budget } from 'src/app/shared/budget.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/shared/categorie.model';
import { ServerService } from 'src/app/server.service';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budget: Budget;
  categories: Categorie[] = [];
  valueChanged: boolean = false;
  

  constructor(private budgetService: BudgetService,
    private route: ActivatedRoute, 
    private categorieService:CategorieService,
    private serverService: ServerService,
    private router:Router) { }

  ngOnInit() {
      let id;
      let sub = this.route.params.subscribe(params => {
      id = +params['id']; 
      this.budget = this.budgetService.getSingleBudget(id);
      this.categories = this.categorieService.getCategories();
      console.log(this.route.snapshot.params['id']);
      },(error) => (console.log(error)
      ))
  };

  onAddCat(inputCat){
    
    if(this.budget.includedCategories.length===0){
      let catId = this.categorieService.getIdOf(inputCat.value);
      let data = {
        budgetID : this.budget.budgetId,
        categorieID : catId
      }
      this.budget.includedCategories.push(this.categorieService.getElement(inputCat.value));
      this.serverService.addCategorieToBudget(data).subscribe();
      
    }else{
      for(let i = 0; i < this.budget.includedCategories.length; i++){
        if(this.budget.includedCategories[i] === inputCat.value){
          return  
      }
     }
      let data = {
      budgetID : this.budget.budgetId,
      categorieID : this.categorieService.getIdOf(inputCat.value)
      }
      this.budget.includedCategories.push(this.categorieService.getElement(inputCat.value));
      console.log(this.budget.includedCategories);
    
      this.serverService.addCategorieToBudget(data).subscribe();
    }
    
  }

  onChangeAmount(newAmount) {
    let data={
      ID: this.budget.budgetId,
      value: newAmount.value
    }
    this.budget.budgetAmount = newAmount.value;
    this.valueChanged = true;
    this.serverService.updateBudgetAmount(data).subscribe();
    
  }

  onDeleteBudget(){
   let budID = this.route.snapshot.params['id'];

   this.serverService.deleteBudget(budID).subscribe((response)=>{console.log(response);
   }),(error)=>(console.log(error));
   
   this.budgetService.deleteBudget(budID);
   this.router.navigate(['settings/budgets']);
  }

}


