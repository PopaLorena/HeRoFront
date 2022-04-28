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
  trainings: Training[] = [];
  noActivity: boolean = false;
  activity: number = 0;
  training!: Training;
  meeting!: Meeting;
  constructor(private meetingService: MeetingService, private trainingService: TrainingService) { }

  ngOnInit(): void {
   this.getMeetingList();
   this.getTrainingList();

   if(this.meetings.length == 0  && this.trainings.length == 0)
   {
     this.noActivity = true;
   }
   else {
     if(this.meetings.length == 0)
     { 
      this.activity = 0;
      this.training = this.trainings[0];
     }
     else{
      this.activity = 1;
      this.meeting = this.meetings[0];
     }
   }
  }

  getMeetingList(): void {
    var date = new Date;
    this.meetingService.getFutureMeetings().subscribe((list: Meeting[]) => {
      this.meetings = list;
    }, (err) => {
      if (err.status === 401)
       return;
    });
  }

  getTrainingList(): void {
    this.trainingService.getFutureTrainings().subscribe((list: Training[]) => {
      this.trainings = list;
    }, (err) => {
      if (err.status === 401)
       return;
    }); 
  }

}
