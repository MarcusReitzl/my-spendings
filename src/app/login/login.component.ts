import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { KategorieService } from '../kategorie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serverService: ServerService, private router:Router, private categorieService: KategorieService) { }

  ngOnInit() {
  }

  onLogin(username, password){
    let data = {
      'user' : username.value,
      'pass' : password.value
    }
    //post logindata
    this.serverService.login(data).subscribe(
      
      (response) => {this.serverService.setToken(response['token']);
      this.serverService.setName(response['user'].firstname, response['user'].lastname);
      this.serverService.toogleLoggedIn();
      
      //set categorie
      this.serverService.getCategories().subscribe(
        (response)=>{ this.categorieService.setCategorie(response); }
      );

      this.router.navigate(['main']);
      },
      (error) => (console.log(error))     
    );
    
    
  }

}
