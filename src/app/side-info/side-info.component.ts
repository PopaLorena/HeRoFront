import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meeting } from 'src/models/meeting';
import { Training } from 'src/models/training';
import { MeetingService } from '../services/meeting.service';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.scss']
})
export class SideInfoComponent implements OnInit {
 
  meetings: Meeting[] = [];
  meeting!: Meeting;
  ora!: any;

  constructor(private meetingService: MeetingService, private trainingService: TrainingService) { }

  async ngOnInit(): Promise<void> {
    this.meetingService.getNextMeeting().subscribe((meeting: Meeting) => {
     this.meeting = meeting;
    }, (err) => {
      if (err.status === 401)
       return;
    });
  }
}
