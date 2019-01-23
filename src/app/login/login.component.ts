import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  onLogin(username, password){
    let data = {
      'user' : username.value,
      'pass' : password.value
    }

    this.serverService.login(data).subscribe(
      (response) => (this.serverService.httpOptions.headers.set('Authorization', JSON.stringify(response))),
      (error) => (console.log(error))  
    ); 
  }

}
