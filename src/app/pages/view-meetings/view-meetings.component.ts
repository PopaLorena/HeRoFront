import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/models/meeting';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.scss']
})
export class ViewMeetingsComponent implements OnInit {

  meetings!: Meeting[];
  activeMeetings!: Meeting[];
  isActiveList = true;
  constructor(private meetingService: MeetingService, private router: Router) {
  }

  getTrainingList(): void {
    this.meetingService.getMeetings().subscribe((list: Meeting[]) => {
      this.meetings = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  getActiveTrainingList(): void {
    this.getTrainingList();
    this.activeMeetings = [];

    this.meetings?.forEach(x => {
      if (this.isGreaterThanNow(x)) {
        this.activeMeetings.push(x);
      }
    })
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
      this.getActiveTrainingList();
    else {
      this.getTrainingList();
    }
  }

  activeList(): void {
    this.isActiveList = !this.isActiveList;
    this.ngOnInit();
  }

}
