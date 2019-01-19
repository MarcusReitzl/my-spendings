import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/budget.service';
import { Budget } from 'src/app/shared/budget.model';
import { ActivatedRoute } from '@angular/router';
import { KategorieService } from 'src/app/kategorie.service';
import { Categorie } from 'src/app/shared/categorie.model';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  budget: Budget;
  categories: Categorie[] = [];
  foundFlag: boolean = false;
  valueChanged: boolean = false;

  constructor(private budgetService: BudgetService,
    private route: ActivatedRoute, 
    private categorieService:KategorieService) { }

  ngOnInit() {
      this.budget = this.budgetService.getSingleBudget(this.route.snapshot.params['id']);
      this.categories = this.categorieService.getCategorie();       
  }

  onAddCat(inputCat){
    if(this.budget.includedCategories.length===0){
      this.budget.includedCategories.push(inputCat.value);
      return
    }else{
      for(let i = 0; i < this.budget.includedCategories.length; i++){
        if(this.budget.includedCategories[i] === inputCat.value){
        return
      }
     }
    }
    this.budget.includedCategories.push(inputCat.value);
  }

  onChangeAmount(newAmount) {
    this.budget.budgetAmount = newAmount.value;
    this.valueChanged = true;
  }

}


