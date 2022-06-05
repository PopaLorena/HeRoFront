import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ResponsibilityService } from 'src/app/services/responsibility.service';
import { Member } from 'src/models/member';
import { Responsibility } from 'src/models/responsibility';

@Component({
  selector: 'app-edit-responsibility',
  templateUrl: './edit-responsibility.component.html',
  styleUrls: ['../../form.scss']
})
export class EditResponsibilityComponent implements OnInit {

  members: Member[] = [];
  params!: string;
  errorText?: string;
  form!: FormGroup;
  eventId!: number;
  respId!: number;
  selectedMember: Member = new Member();
  memberId!: number;
  subscriptionList: Subscription[] = [];
  private responsibilityToEdit: Responsibility | undefined = new Responsibility();


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
          this.respId = parseInt(param.respId, 10);
        }
        this.setEditResponsibility(param.respId);
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

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  
  private updateResponsibility(newResponsibility: Responsibility): void {
    this.responsibilityService.updateResponsibility(newResponsibility).subscribe(() => {
      this.router.navigate(['Responsibilities/' + this.eventId])
    }, (err) => {
      this.errorText = err.error;
    });
  }

  goBackClick(): void {
    this.router.navigate(['Responsibilities/' + this.eventId]);
  }

  saveNewResponsibility(): void {
    const isValid = this.form.valid;
    const newResponsibility: Responsibility = {
      ...this.responsibilityToEdit,
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
    this.updateResponsibility(newResponsibility);
  }

  selectMember(event: any) {
    this.memberId = event.value.id!;
  }

  private setEditResponsibility(id: number): void {
    this.responsibilityService.getResponsibilityById(id).subscribe((responsibility: Responsibility) => {
      this.responsibilityToEdit = responsibility;
    });
    this.responsibilityService.getResponsibilities().subscribe((list) => {
      this.form.patchValue(this.responsibilityToEdit!, {
        emitEvent: false
      });
    });
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
