import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  responseMessage:string;
  constructor(private serverService: ServerService,
    private route:Router) { }

  ngOnInit() {
  }

  onRegister(username, firstname, lastname, pass, passRepeat){
    if(pass.value !== passRepeat.value){
      console.log('Checkpasswörter');
      
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
          this.route.navigate(['login']);
        },
        (error) => (console.log(error))
        );
    }
  }
}
