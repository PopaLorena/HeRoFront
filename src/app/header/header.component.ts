import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

showNavbar = false;
  myControl = new FormControl();
  options: string[] = [];
  constructor(
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
  
  }

  changeClient(value: any) {
    this.router.navigate([`/inventory/${value.id}`]);
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
  resetNavbar() {
    this.showNavbar = false;
  }

}
