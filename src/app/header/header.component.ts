import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  name:string;

  constructor(private serverService:ServerService) { }

  ngOnInit() {
    this.serverService.loggedInchanged.subscribe(
      ()=>{
        this.loggedIn = this.serverService.getStatus();
        this.name = this.serverService.getName();
      }
    )
 
  }
  


}
