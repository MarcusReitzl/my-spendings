import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  name:string;

  constructor(private serverService:ServerService, private router: Router) { }

  ngOnInit() {
    this.serverService.loggedInchanged.subscribe(
      ()=>{
        this.loggedIn = this.serverService.getStatus();
        this.name = this.serverService.getName();
      }
    )
  }

  logOut(){
    this.serverService.toogleLoggedIn();
    this.serverService.httpOptions.headers.set('Authorization', "");
    // this.router.navigate(['main']);
  }
  


}
