import { Categorie } from './shared/categorie.model';
import { Subject } from 'rxjs';

export class KategorieService{
    valueChanged = new Subject<Categorie[]>();
    
    categorie: Categorie [] = [
        new Categorie('Diverse'),
        new Categorie('Essen'),
        new Categorie('Reinigung')
  ]

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

}