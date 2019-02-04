/*
Kümmert sich im Angular um alle Befehle für die Categories
 */

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

/*
Fügt eine Kategorie hinzu (schickt sie zum Server)
 */
addCategorie(data){
    
    this.serverService.postCategorie(data).subscribe(
        (categories: any[])=>{
            this.categorie = categories;
            this.valueChanged.next(this.categorie);
        },
        (error) => (console.log(error))
        );
}

getCategories(){ return this.categorie; }

/*
Kümmert sich darum das die Werte in den Kategorieren aktuell bleiben. Zur Verwendung von de Charts.
*/
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
/*
Liefert die Id einer Kategorie über den Namen
 */
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

/*
Fügt eine Kategorie zu einem Budget hinzu
 */
addCategorieToBudget(data){
    this.serverService.updateCategorie(data).subscribe(
        (categories: any[]) => {
            
            this.valueChanged.next(this.categorie);
        });   
}

/*
Entfernt eine Kategorie von einem Budget
 */
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
