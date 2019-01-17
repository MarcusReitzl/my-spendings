import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  component:string = 'main';
  title = 'my-Spendings';

  setComponent(inputComponent){
    this.component=inputComponent;
  }
}
