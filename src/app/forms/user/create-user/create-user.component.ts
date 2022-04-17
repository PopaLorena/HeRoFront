import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  role: string[] = ["User"];
  params!: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  public userList!: User[];
  private userToEdit: User | undefined = new User();
  

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }
 

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private addUser(newUser: User): void {
    this.userService.addUser(newUser).subscribe((user: User) => {
      this.router.navigate(['createMember/'+ user.id ])
    });
  }
  
  goBackClick(): void {
    this.router.navigate(['Members']);
  }
  saveNewUser(): void {
    const isValid = this.form.valid;
    const newUser: User = {
      ...this.userToEdit,
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
