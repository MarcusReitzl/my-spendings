import { Categorie } from './shared/categorie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { BudgetService } from './budget.service';

@Injectable()
export class CategorieService{
    valueChanged = new Subject<Categorie[]>();
    categorie: any [] = [];

constructor(private serverService: ServerService,
    private budgetService: BudgetService){}  
    
addCategorie(data){
    let categories: any[];
    this.serverService.updateCategorie(data).subscribe(
        (categories: any[])=>{
            this.categorie = categories;
            this.valueChanged.next(this.categorie);
            

        },
        (error) => (console.log(error))
        );
}

getCategories(){ return this.categorie; }
  
updateSpendings(data){
    console.log(data);
    

    for(let cat of this.categorie){
        if(cat.name === data.categorie){
            data.amount = parseInt(data.amount) + parseInt(cat.value);           
            this.serverService.updateCategorie(data).subscribe(
            (categories: any[]) =>{
                this.categorie = categories;
                this.valueChanged.next(this.categorie);
            },
            (error) => (console.log(error)));
        };
    };
}

deleteElement(id){
    this.serverService.deleteCategorie(id).subscribe(
        (categories: any[])=>{
            this.categorie = categories;
            this.valueChanged.next(this.categorie)}
      );
}
setCategorie(categorie: any[]){  
    this.categorie = categorie
    this.valueChanged.next(this.categorie);
    }
    
getIdOf(categorie){
    for(let cat of this.categorie){
        if(cat.name === categorie){
            return cat.id;
        }
    }

}
getElement(name){
    for(let cat of this.categorie){
        if(cat.name === name){
            return cat;
        }
    }
}

addCategorieToBudget(data){
    this.serverService.updateCategorie(data).subscribe(
        (categories: any[]) => {
            
            this.valueChanged.next(this.categorie);
        });   
}

withdrawCategorieFromBudget(id){
    let data={
        budgetId: 0,
        katId:id
    }
        this.serverService.updateCategorie(data).subscribe(
        (categories: any[])=>{
            
            this.valueChanged.next(this.categorie);
            
        }
    )
}


}
