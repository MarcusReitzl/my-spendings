import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  responseMessage:string;
  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  onRegister(username, firstname, lastname, pass, passRepeat){
    if(pass.value !== passRepeat.value){

    }else{
      let data = {
        'username' : username.value,
        'firstname' : firstname.value,
        'lastname' : lastname.value,
        'password' : pass.value
      }

      this.serverService.register(data).subscribe(
        (response) =>  { 
          let message = response['message']
          this.responseMessage = message;
        },
        (error) => (console.log(error))
        );
    }
  }
}
