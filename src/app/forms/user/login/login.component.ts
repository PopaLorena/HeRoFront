import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { Member } from 'src/models/member';
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
  memberId! : number;
  user: User;
  errorText?: String;
  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private memberService: MemberService) {
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

    this.userService.saveUser(this.user.username);
    
    this.memberService.getMemberByUsername(this.user.username!).subscribe((m: number) => {
      this.memberId = m;
      localStorage.setItem("userId", m.toString());
    }, (err) => {
      if (err.status === 401)
        return;
    });;

    this.userService.saveMemberId(this.memberId);

    this.userService.login(this.user)
    .subscribe({
      next: (response) => {
        const token = response;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(['Home']);
      },
      error: (err) => {
        console.log(err);
        this.errorText = err.error;
        this.invalidLogin = true;
      }
    })
    console.log( localStorage.getItem('jwt'));
  }

  ngOnInit(): void {
    this.createForm();
  }

  onBlur(controlName: string){
    //console.log(controlName);
  }

  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }
}
