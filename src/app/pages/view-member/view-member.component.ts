import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from 'src/app/services/meeting.service';
import { MemberService } from 'src/app/services/member.service';
import { ResponsibilityService } from 'src/app/services/responsibility.service';
import { TrainingService } from 'src/app/services/training.service';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';
import { Responsibility } from 'src/models/responsibility';
import { Training } from 'src/models/training';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {
  
  subscriptionList: Subscription[] = [];;
  responsibilities: Responsibility[] = [];
  meetings: Meeting[] = [];
  trainings: Training[] = [];
  memberId!: number;
  member!: Member
  constructor(private respService: ResponsibilityService,private trainingService: TrainingService, private meetingService: MeetingService, private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        this.memberId = param.memberId;
      })
    )
    this.getMember(this.memberId);
    this.getMeetings(this.memberId);
    this.getTrainings(this.memberId);
    this.getResponsibilities(this.memberId);

  }

  getMember(memberId: number) {
    this.memberService.getMemberById(memberId).subscribe((member: Member) => {
      this.member = member;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  getMeetings(memberId: number){
    this.meetingService.getMeetingByMemberId(memberId).subscribe((list: Meeting[]) => {
      this.meetings = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }
  

  getTrainings(memberId: number){
    this.trainingService.getTrainingsByMemberId(memberId).subscribe((list: Training[]) => {
      this.trainings = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }
  

  getResponsibilities(memberId: number){
    this.respService.getResponsibilitiesByMemberId(memberId).subscribe((list: Responsibility[]) => {
      this.responsibilities = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }
}
