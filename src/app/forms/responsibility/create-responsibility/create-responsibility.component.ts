import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ResponsibilityService } from 'src/app/services/responsibility.service';
import { Member } from 'src/models/member';
import { Responsibility } from 'src/models/responsibility';

@Component({
  selector: 'app-create-responsibility',
  templateUrl: './create-responsibility.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateResponsibilityComponent implements OnInit {
  members: Member[] = [];
  params!: string;
  form!: FormGroup;
  eventId! : number ;
  selectedMember : Member = new Member();
  memberId! : number ;
  subscriptionList: Subscription[] = [];
  errorText?: string;
  
  constructor(private formBuilder: FormBuilder,
    private responsibilityService: ResponsibilityService,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }
 

  ngOnInit(): void {
    this.errorText="";
    this.createForm();
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.eventId && parseInt(param.eventId, 10)) {
          this.eventId = parseInt(param.eventId, 10);
        }
      })
    )
   this.memberService.getMembers().subscribe((list: Member[]) => {
    this.members = list;
  }, (err) => {
    if (err.status === 401)
     return;
  });
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private addResponsibility(newResponsibility: Responsibility): void {
    newResponsibility.eventId = this.eventId;
    this.responsibilityService.addResponsibility(this.eventId, newResponsibility.responsibleId!, newResponsibility).subscribe(() => {
      this.router.navigate(['Responsibilities/' + this.eventId])
    }, (err) => {
      this.errorText = err.error;
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  
  saveNewResponsibility(): void {
    const isValid = this.form.valid;
    const newResponsibility: Responsibility = {
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
     this.addResponsibility(newResponsibility);
  }

  selectMember(event: any){
  this.memberId = event.value.id!;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      description: [null],
      startDate: [null],
      endDate: [null],
      responsibleId: [null],
    });
  }
}
