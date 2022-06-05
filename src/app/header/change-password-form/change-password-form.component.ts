import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
 
  form!: FormGroup;
  user!: User;
  errorText: string= '';
  constructor(private formBuilder: FormBuilder,private userService: UserService,public dialogRef: MatDialogRef<ChangePasswordFormComponent>,) { }

  ngOnInit(): void {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }  

  editPassword(): void {
    const isValid = this.form.valid;
    const password: PasswordData = {
      ...this.form.getRawValue(),
    };

    if (!isValid) {
      return;
    }
    if(password.newPassword != password.confirmNewPassword)
    {
    this.errorText= "the new password is not the same as confirm new password";
    console.log("not the same"); 
    }
    else{
    var username = this.userService.getUsername();
    var id = this.userService.getUserId();
    this.user = new User(id ,username ,  password.oldPassword);
    this.userService.editPassword(this.user,password.newPassword ).subscribe(() => {
      console.log("success");
      this.dialogRef.close();
    }, (err) => {
      this.errorText=err.error;
    });
  }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      oldPassword: [null],
      newPassword: [null],
      confirmNewPassword: [null],
    });
  }
}
