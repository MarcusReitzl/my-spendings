import { Categorie } from './shared/categorie.model';
import { Subject } from 'rxjs';

export class CategorieService{
    valueChanged = new Subject<Categorie[]>();
    categorie: Categorie [] = [];

onAddCategorie(inputKategorie){
    this.categorie.push(new Categorie(inputKategorie));
}

getCategorie(){
    return this.categorie;
}
  
addOutcome(categorie, amount){
    for(let cat of this.categorie){
        if(cat.name === categorie){
            cat.value += parseInt(amount);
            console.log(cat.value);
            this.valueChanged.next(this.categorie);
        }
    }
}

setCategorie(categorie: any[]){
    console.log(categorie);
    
    this.categorie = categorie
    this.valueChanged.next(this.categorie);
    }
    
getIndexOf(categorie){
    for(let cat of categorie){
        if(cat.name === categorie){
            return cat.id;
        }
    }

}

}
