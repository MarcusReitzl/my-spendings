import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorie.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private kategorieService: CategorieService) { }

  ngOnInit() {
  }
  onAddCat(inputKategorie){
    this.kategorieService.addCategorie(inputKategorie.value);
  }

}
