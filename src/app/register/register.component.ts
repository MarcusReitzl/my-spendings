// by David Langmeier
//
// gets data from form (onRegister)
// checks if password is same as password repeat
// sends data to server via serverService
// when registered with server -> route to login

import {Component, OnInit} from '@angular/core';
import {ServerService} from '../server.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  responseMessage: string;

  constructor(private serverService: ServerService,
              private route: Router) {
  }

  ngOnInit() {
  }

  onRegister(username, firstname, lastname, pass, passRepeat) {
    if (pass.value !== passRepeat.value) {
      this.responseMessage = 'Passwörter überprüfen!';
    } else {
      const data = {
        'username': username.value,
        'firstname': firstname.value,
        'lastname': lastname.value,
        'password': pass.value
      };

      this.serverService.register(data).subscribe(
        (response) => {
          const message = response['message'];
          this.responseMessage = message;
          this.route.navigate(['login']);
        },
        (error) => (console.log(error))
      );
    }
  }
}
