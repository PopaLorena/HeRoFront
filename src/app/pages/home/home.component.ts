import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { MemberService } from 'src/app/services/member.service';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 // listSize: number = this.meetingService.Meeting_DATA.length;
  meetings?: Meeting[];
  constructor(private meetingService: MeetingService, private router: Router) {
  }

  goTo(id: string) {
    this.router.navigate(['/view-item/' + id]);
  }

  getMeetingList(): void {
    this.meetingService.getMeetings().subscribe((list: Meeting[]) => {
      this.meetings = list.slice(list.length - 4, list.length);
      console.log(this.meetings[0]);
      
    }, (err) => {
      if (err.status === 401)
      console.log("d");
       return;
    });
  }

  ngOnInit(): void {
     this.getMeetingList();
  }

}
