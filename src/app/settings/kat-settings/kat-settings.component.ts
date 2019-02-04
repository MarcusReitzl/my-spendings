/*
Kategorie-Component
Hier werden die Einstellungen für eine Kategorie bearbeitet
 */

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
  

  constructor(private categorieService: CategorieService, private serverService:ServerService, private budgetService:BudgetService) { }

  ngOnInit() {
    this.categories = this.categorieService.getCategories();
    this.categorieService.valueChanged.subscribe(
      () => (this.categories = this.categorieService.getCategories())
    )
  }

  /*
  Ruft die addCategorie vom CategorieService auf um die neue Kategorie hinzuzufügen
   */
  onAddCat(inputKategorie){
    let data = { 
      name: inputKategorie.value,
      amount: 0
     }
    
    for(let cat of this.categories){
        if(cat.name === inputKategorie.value){ return; }
    }
    this.categorieService.addCategorie(data);
  }
    /*
    Ruft die deleteElement vom CategorieService auf um die ausgewählte Kategorie zu löschen
     */
  onDelCategorie(inputSelKat){
    if(inputSelKat.value === "unselected"){
      return;
    }else if(confirm("Sind sie sicher das sie die Kategorie " + inputSelKat.value + " wirklich löschen möchten?")){
          let id = this.categorieService.getIdOf(inputSelKat.value)
          this.categorieService.deleteElement(id);
    }  
  }
}
