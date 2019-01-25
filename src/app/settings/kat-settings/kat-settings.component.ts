import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/categorie.service';
import { Categorie } from 'src/app/shared/categorie.model';
import { ServerService } from 'src/app/server.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-kat-settings',
  templateUrl: './kat-settings.component.html',
  styleUrls: ['./kat-settings.component.css']
})
export class KatSettingsComponent implements OnInit {
  categories: Categorie [];
  

  constructor(private katService: CategorieService, private serverService:ServerService) { }

  ngOnInit() {
    this.categories = this.katService.getCategorie();

    this.katService.valueChanged.subscribe(
      () => (this.categories= this.katService.getCategorie())
    )
  }

  onAddCat(inputKategorie){
    let data = {
      'categorie': inputKategorie.value
    }

    let categorie: string = inputKategorie.value
    this.katService.onAddCategorie(inputKategorie.value);
    this.serverService.postCategorie(data).subscribe(
      ()=>(console.log('successfull'),
      (error) => (console.log('do bin i'))
      )
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
            name: this.categories[i].name
          }
          this.categories.splice(i,1);
          this.serverService.deleteCategorie(data).subscribe(
            (response)=>(console.log(response)),
            (error) => (console.log(error)) 
          );
        }
      }
    }
  }
}
