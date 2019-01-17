export class KategorieService{
    
    
    categorie: string [] = [
    "Diverse",
    "Lebensmittel",
    "Reinigungsmaterial",

  ]

onAddCategorie(inputKategorie){
    this.categorie.push(inputKategorie);
}

getCategorie(){
    return this.categorie;
}
  
}