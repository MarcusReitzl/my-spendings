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
      ));

      this.categorieService.valueChanged.subscribe(
        ()=>{
          this.budgetService.getCategorieOfBudget()}
      )
  }

  addCategorieToBudget(inputCat){  
    let id = this.categorieService.getIdOf(inputCat.value);
    this.serverService.getCategorie(id).subscribe(
      (response: any) => {
        if(response[0].BudgetId === 0){
          let data = {
            budgetId : this.budget.budgetId,
            name: inputCat.value,
            katId : this.categorieService.getIdOf(inputCat.value)
          }
          this.categorieService.addCategorieToBudget(data);
        }
      }
    );
  }   

  onChangeAmount(newAmount) {
    let data={
      id: this.budget.budgetId,
      name: this.budget.budgetName,
      amount: newAmount.value
    }
    this.valueChanged = true;
    this.budgetService.setAmount(data);
    
  }

  onDeleteBudget(){
      let budID = this.route.snapshot.params['id'];
      this.budgetService.deleteBudget(budID);
      this.router.navigate(['settings/budgets'])
  }

  onWithDrawCat(id){
    let katId = id;
       this.categorieService.withdrawCategorieFromBudget(katId);
  }
  
}

