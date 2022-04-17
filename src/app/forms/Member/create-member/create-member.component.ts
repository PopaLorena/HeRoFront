import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/models/member';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateMemberComponent implements OnInit {

  statut: string[] = ["Baby","Activ"];
  params!: string;
  form!: FormGroup;
  userId! : number ;
  subscriptionList: Subscription[] = [];
  private memberToEdit: Member | undefined = new Member();
  

  constructor(private formBuilder: FormBuilder,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }
 

  ngOnInit(): void {
    this.createForm();
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.userId && parseInt(param.userId, 10)) {
          this.userId = parseInt(param.userId, 10);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  
  private addMember(newMember: Member): void {
    newMember.startDate = new Date();
    newMember.userId = this.userId;
    this.memberService.addMember(newMember).subscribe(() => {
      this.router.navigate(['Members'])
    });
  }

 
  goBackClick(): void {
    this.router.navigate(['Members']);
  }

  saveNewMember(): void {
    const isValid = this.form.valid;
    const newMember: Member = {
      ...this.memberToEdit,
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
     this.addMember(newMember);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null],
      birthDate: [null],
      photoUrl: [null],
      university: [null],
      telNumber: [null],
      statut:[null],
    });
  }
}
