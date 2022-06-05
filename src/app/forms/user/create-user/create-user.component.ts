import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateUserComponent implements OnInit {
  
  role: string[] = ["User, Admin"];
  params!: string;
  form!: FormGroup;
  errorText?: string;
  
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }
 
  ngOnInit(): void {
    this.createForm();
  }

  private addUser(newUser: User): void {
    this.userService.addUser(newUser).subscribe((user: User) => {
      this.router.navigate(['CreateMember/'+ user.id ])
    }, (err) => {
      this.errorText = err.error;
    });
  }

  saveNewUser(): void {
    const isValid = this.form.valid;
    const newUser: User = {
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
    this.addUser(newUser);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null],
      role: [null],
    });
  }
}
