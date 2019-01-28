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

     
      this.serverService.addCategorieToBudget(data).subscribe(
        (response)=>{
          console.log(response['message']);          
          if(response['message'] === 't'){ this.budget.includedCategories.push(this.categorieService.getElement(inputCat.value));}}
      );
      
    }else{
      for(let i = 0; i < this.budget.includedCategories.length; i++){
        if(this.budget.includedCategories[i].name === inputCat.value){
          return  
      }
     }
      let data = {
      budgetID : this.budget.budgetId,
      categorieID : this.categorieService.getIdOf(inputCat.value)
      }
      this.budget.includedCategories.push(this.categorieService.getElement(inputCat.value));
      
    
      this.serverService.addCategorieToBudget(data).subscribe();

      this.budgetService.addCategorie(this.budget.budgetId, inputCat);
          }   
        }
      


    
    
  

  onChangeAmount(newAmount) {


    let data={
      id: this.budget.budgetId,
      value: newAmount.value
    }
   
    this.valueChanged = true;
    
    this.serverService.updateBudgetAmount(data).subscribe();
    this.budgetService.setAmount(data.id, data.value);
  }

  onDeleteBudget(){

   let budID = this.route.snapshot.params['id'];
    this.serverService.deleteBudget(budID).subscribe((response)=>{this.budgetService.deleteBudget(budID),(error)=>(console.log(error)
    );
   });
   

   this.router.navigate(['settings/budgets']);
  }

  onWithDrawCat(id){
    console.log(id);
    let data = {id: id}
    
    this.serverService.withdrawCategorie(data).subscribe(
      (response)=>{console.log(response)}  
      );
      
    this.serverService.getBudgets().subscribe(
      (budgets:any)=>{this.budgetService.setBudgets(budgets); 
        for(let budget of budgets){
          this.serverService.getCategorieOfBudget(budget.budgetId).subscribe(
          (categorie)=>{console.log(categorie); this.budgetService.setincludedCategories(budget.budgetId,categorie);});
          this.categorieService.valueChanged.next();
        }   
      }
    )
    this.router.navigate(['settings/budgets']);
  }
}
