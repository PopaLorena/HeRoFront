import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { MemberMeetingService } from 'src/app/services/member-meeting.service';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';
import { MemberMeeting } from 'src/models/memberMeeting';
import { ViewMeetingParticipantsComponent } from './view-meeting-participants/view-meeting-participants.component';

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
  exist: boolean = false;
  memberMeeting: MemberMeeting = new MemberMeeting();
  memberId = localStorage.getItem('userId');
  participants: Member[] = [];
  constructor(private meetingService: MeetingService, private memberMeetingService: MemberMeetingService, private router: Router, public dialog: MatDialog) {
  }

  getMeetingList(): void {
    this.meetingService.getMeetings().subscribe((list: Meeting[]) => {
      this.meetings = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  openDialog(meeting: Meeting): void {
    this.meetingService.getParticipants(meeting.id!).subscribe((list: Member[]) => {
      this.participants = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });

    const dialogRef = this.dialog.open(ViewMeetingParticipantsComponent, {
      width: '250px',
      data: { name: meeting.name, participants: this.participants },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  getActiveMeetingList(): void {
    this.getMeetingList();
    this.activeMeetings = [];

    this.meetings?.forEach(x => {
      if (this.isGreaterThanNow(x)) {
        this.activeMeetings.push(x);
        if(this.isOnTheList(x.id)){
          x.hadApply = true;
        }
        else {
          x.hadApply = false;
        }
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
      }, (err) => {
      }
    );
  }

  apply(id: number | undefined): void {
    this.memberMeetingService.addMemberMeetings(parseInt(this.memberId!), id!).subscribe((m: MemberMeeting) => {
    },
    (err) => {
      console.log(err);
    });
  }

  isOnTheList(id: number | undefined): boolean {
    this.memberMeetingService.CheckIfExist(parseInt(this.memberId!), id!).subscribe((exist: boolean) => {
      return exist;
    }, (err) => {
      if (err.status === 401)
        return;
    });
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
