import { Component, OnInit } from '@angular/core';
import { KategorieService } from 'src/app/kategorie.service';
import { Categorie } from 'src/app/shared/categorie.model';

@Component({
  selector: 'app-kat-settings',
  templateUrl: './kat-settings.component.html',
  styleUrls: ['./kat-settings.component.css']
})
export class KatSettingsComponent implements OnInit {
  categories: Categorie [];

  constructor(private katService: KategorieService) { }

  ngOnInit() {
    this.categories = this.katService.getCategorie();
  }

  onAddCat(inputKategorie){
    this.katService.onAddCategorie(inputKategorie.value);
  }

  onDelCategorie(inputSelKat){
    if(inputSelKat.value === "unselected"){
      return;
    }else if (inputSelKat.value === "Diverse"){
      return;
    }else if(confirm("Sind sie sicher das sie die Kategorie " + inputSelKat.value + " wirklich löschen möchten?")){
      for(let i = 0; i < this.categories.length; i++){
        if(this.categories[i].name === inputSelKat.value){
          this.categories.splice(i,1);
        }
      }
    }
  }
}
