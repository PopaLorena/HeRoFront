import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/models/member';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['../../form.scss']
})
export class EditMemberComponent implements OnInit {

  statut: string[] = ["Baby","Active","Alumnus"];
  params!: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  public memberList: Member[] = this.memberService.memberList;
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
        if (param.memberId && parseInt(param.memberId, 10)) {
          this.setEditMember(parseInt(param.memberId, 10));
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
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  private updateMember(newMember: Member): void {
    this.memberService.updateMember(newMember).subscribe(() => {
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
      this.updateMember(newMember);
  }

  private setEditMember(id: number): void {
    this.memberService.getMemberById(id).subscribe((member: Member) => {
      this.memberToEdit = member;
    });
    this.memberService.getMembers().subscribe((list) => {
      this.form.patchValue(this.memberToEdit!, {
        emitEvent: false
      });
    });
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
