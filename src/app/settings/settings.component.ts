import { Component, OnInit } from '@angular/core';
import { KategorieService } from '../kategorie.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private kategorieService: KategorieService) { }

  ngOnInit() {
  }
  onAddCat(inputKategorie){
    this.kategorieService.onAddCategorie(inputKategorie.value);
  }

}
