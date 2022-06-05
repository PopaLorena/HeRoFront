import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeRoFront';
 
  isLog(): boolean {
    if (localStorage.getItem("isLog") == "true")
      return true;

    return false;
  }
  ngOnDestroy(): void {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("isLog");
  }
}
