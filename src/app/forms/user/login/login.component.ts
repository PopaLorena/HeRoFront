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
  memberId!: any| number;
  user: User;
  role?: any | string;
  errorText?: String;

  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private memberService: MemberService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.createForm();
  }

  async login() {
    const isValid = this.formGroup.valid;
    
    if (!isValid) {
      this.formSubmitted = true;
      return;
    }

    this.user.username = this.formGroup.controls.username.value;
    this.user.password = this.formGroup.controls.password.value;

    await this.userService.saveUser(this.user.username);
    this.memberId = await this.memberService.getMemberByUsername(this.user.username!);
    await this.userService.saveMemberId(this.memberId);

    try {
      const token = await this.userService.login(this.user);
      localStorage.setItem("jwt", token!);
      localStorage.setItem("isLog", "true");
      this.invalidLogin = false;
      this.router.navigate(['Home']);
    }
    
    catch (err: any) {
      console.log(err);
      this.errorText = err.error;
      this.invalidLogin = true;
    }

    this.role = await this.userService.getRole(this.user.username!);
    localStorage.setItem("role", this.role);
  }



  createForm(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]]
    });
  }
}
