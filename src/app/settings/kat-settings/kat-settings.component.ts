import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/shared/categorie.model';
import { ServerService } from 'src/app/server.service';
import { BudgetService } from 'src/app/budget.service';


@Component({
  selector: 'app-kat-settings',
  templateUrl: './kat-settings.component.html',
  styleUrls: ['./kat-settings.component.css']
})
export class KatSettingsComponent implements OnInit {
  categories: Categorie [];
  

  constructor(private katService: CategorieService, private serverService:ServerService, private budgetService:BudgetService) { }

  ngOnInit() {
    this.categories = this.katService.getCategories();

    this.katService.valueChanged.subscribe(
      () => (this.categories= this.katService.getCategories())
    )
  }

  onAddCat(inputKategorie){
    let data = { 'categorie': inputKategorie.value }
        
    this.serverService.postCategorie(data).subscribe(
      (response)=>{this.katService.setID(response[0]);},
      (error) => (console.log(error))
      );
  }

  onDelCategorie(inputSelKat){
    if(inputSelKat.value === "unselected"){
      return;
    }else if (inputSelKat.value === "Diverse"){
      return;
    }else if(confirm("Sind sie sicher das sie die Kategorie " + inputSelKat.value + " wirklich löschen möchten?")){
      
      for(let i = 0; i < this.categories.length; i++){
        if(this.categories[i].name === inputSelKat.value){
          let data = {
            id: this.categories[i].id
          }
          console.log(this.categories[i].id);
          
          this.budgetService.deleteCategorieofBudget(this.categories[i].id);
          this.categories.splice(i,1);
          this.serverService.deleteCategorie(data).subscribe(
            (response)=>(console.log(response))
          );
          
          break;
        } 
      }
    }  
  }
}
