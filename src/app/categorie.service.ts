import { Categorie } from './shared/categorie.model';
import { Subject } from 'rxjs';

export class CategorieService{
    valueChanged = new Subject<Categorie[]>();
    categorie: Categorie [] = [];

onAddCategorie(inputKategorie){
    this.categorie.push(new Categorie(inputKategorie));
    this.valueChanged.next();
}

getCategories(){
    return this.categorie;
}
  
addOutcome(categorie, amount){
    for(let cat of this.categorie){
        if(cat.name === categorie){
            cat.value += parseInt(amount);
            this.valueChanged.next(this.categorie);
        }
    }
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

setID(id){ 
    this.categorie[this.categorie.length-1] = id;
}

}
