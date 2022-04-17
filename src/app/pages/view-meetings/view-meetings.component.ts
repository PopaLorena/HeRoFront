import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { MemberMeetingService } from 'src/app/services/member-meeting.service';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';
import { MemberMeeting } from 'src/models/memberMeeting';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.scss']
})
export class ViewMeetingsComponent implements OnInit {

  meetings!: Meeting[];
  members!: Member[];
  activeMeetings!: Meeting[];
  isActiveList = false;
  exist : boolean = false;
  memberMeeting: MemberMeeting = new MemberMeeting();
  memberId = localStorage.getItem('memberId');
  constructor(private meetingService: MeetingService, private memberMeetingService: MemberMeetingService, private router: Router) {
  }

  getMeetingList(): void {
    this.meetingService.getMeetings().subscribe((list: Meeting[]) => {
      this.meetings = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  getActiveMeetingList(): void {
    this.getMeetingList();
    this.activeMeetings = [];

    this.meetings?.forEach(x => {
      if (this.isGreaterThanNow(x)) {
        this.activeMeetings.push(x);
      }
    })
  }

  add(): void {
    this.router.navigate(['CreateMeeting'])
  }

  edit(id: number | undefined): void {
    this.router.navigate(['EditMeeting/' + id])
  }

  delete(id: number | undefined): void {
    this.meetingService.deleteMeeting(id!).subscribe(
      () => {
        window.location.reload();
      }, (err)=>{
      }
    );
  }

  apply(id: number | undefined): void {
    this.memberMeetingService.addMemberMeetings(1002, id!, this.memberMeeting);
    window.location.reload();
  }

  isOnTheList(id: number | undefined): boolean {
    this.memberMeetingService.CheckIfExist(1002, id!).subscribe((exist: boolean) => {
      this.exist = exist;
    }, (err) => {
      if (err.status === 401)
        return;
    });
 console.log(this.exist);
    return this.exist;
  }

  isGreaterThanNow(x: Meeting): boolean {
    var newDate = new Date(x.date!);
    if (newDate.getFullYear() < new Date().getFullYear())
      return false;
    else if (newDate.getFullYear() == new Date().getFullYear())
      if (newDate.getMonth() < new Date().getMonth())
        return false;
      else if (newDate.getMonth() == new Date().getMonth())
        if (newDate.getDate() < new Date().getDate())
          return false;
        else if (newDate.getDate() == new Date().getDate())
          if (newDate.getHours() < new Date().getHours())
            return false;

    return true;
  }

  ngOnInit(): void {
    if (!this.isActiveList)
      this.getActiveMeetingList();
    else {
      this.getMeetingList();
    }
  }

  activeList(): void {
    this.getActiveMeetingList();
    this.isActiveList = !this.isActiveList;
  }

}
