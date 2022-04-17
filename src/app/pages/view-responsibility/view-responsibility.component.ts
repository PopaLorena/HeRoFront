import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ResponsibilityService } from 'src/app/services/responsibility.service';
import { Member } from 'src/models/member';
import { Responsibility } from 'src/models/responsibility';

@Component({
  selector: 'app-view-responsibility',
  templateUrl: './view-responsibility.component.html',
  styleUrls: ['./view-responsibility.component.scss']
})
export class ViewResponsibilityComponent implements OnInit {

  responsibilities!: Responsibility[];
  activeResponsibilities!: Responsibility[];
  isActiveList = true;
  subscriptionList: Subscription[] = [];
  eventId! : number;
  member!: Member;
  constructor(private responsibilityService: ResponsibilityService, private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        this.eventId = param.eventId;
      })
    )
    this.getResponsibilityList(this.eventId);
  };

  getResponsibilityList(eventId: number): void {
    this.responsibilityService.getResponsibilitiesByEventId(eventId).subscribe((list: Responsibility[]) => {
      this.responsibilities = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  add(): void{
    this.router.navigate(['CreateResponsibility/' + this.eventId])
  }

  edit(id : number | undefined): void{
    this.router.navigate(['EditResponsibility/'+ this.eventId +'/'+id ])
  }

  delete(id : number | undefined): void{
    this.responsibilityService.deleteResponsibility(id!).subscribe(
      () => {
        window.location.reload();
      }, (err)=>{
      }
    );
   }
 

}
