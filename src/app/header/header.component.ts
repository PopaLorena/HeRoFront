import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  username = localStorage.getItem('username');

  constructor(public dialog: MatDialog,
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
  }
 
  isUserAuthenticated() {
    const token: string | null  = localStorage.getItem("jwt");
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ChangePasswordFormComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("isLog");
    this.router.navigate(['']);
  }
}
