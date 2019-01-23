import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit() {
  }

  onLogin(username, password){
    let data = {
      'user' : username.value,
      'pass' : password.value
    }

    this.serverService.login(data).subscribe(
      (response) => {this.serverService.setToken(response['token']);
      this.serverService.setName(response['user'].firstname, response['user'].lastname);
      this.serverService.toogleLoggedIn();
      this.router.navigate(['main']);
      },
      (error) => (console.log(error))     
    );  
  }

}
