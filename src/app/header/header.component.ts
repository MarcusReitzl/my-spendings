import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showComponent = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }
  
  onShowComponent(component:string){
    this.showComponent.emit(component);
  }

}
