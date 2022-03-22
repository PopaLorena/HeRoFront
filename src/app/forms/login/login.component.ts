import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  invalidLogin!: boolean;
  formSubmitted!: boolean;
  user: User;
  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) {
    this.user = new User();
  }

  login(){
    const isValid = this.formGroup.valid;
    //this.valid.emit(isValid);
    if (!isValid) {
      //this.snackBar.open('Invalid username or password!');
      this.formSubmitted = true;
      return ;
    }
    this.user.username = this.formGroup.controls.username.value;
    this.user.password = this.formGroup.controls.password.value;

    this.user.role = "Admin";

    this.userService.login(this.user)
    .subscribe({
      next: (response) => {
        console.log(response)
        //const token = (<any>response).token;
        //localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        //console.log(token);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
        this.invalidLogin = true;
      }
    })
    console.log( localStorage.getItem("jwt"));
  }

  ngOnInit(): void {
    this.createForm();
  }

  onBlur(controlName: string){
    console.log(controlName);
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }
}
