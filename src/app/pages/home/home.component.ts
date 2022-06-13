import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { MemberService } from 'src/app/services/member.service';
import { TrainingService } from 'src/app/services/training.service';
import { Meeting } from 'src/models/meeting';
import { Member } from 'src/models/member';
import { Training } from 'src/models/training';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meetings?: Meeting[];
  trainings?: Training[];

  constructor(private meetingService: MeetingService, private trainingService: TrainingService, private router: Router) {
  }

  ngOnInit(): void {
    this.getTrainingList();
    this.getMeetingList();
  }

  goToMeeting(id: number) {
    this.router.navigate(['/Meetings/' + id]);
  }

  goToTraining(id: number) {
    this.router.navigate(['/Trainings/' + id]);
  }

  getMeetingList(): void {
    this.meetingService.getFutureMeetings().subscribe((list: Meeting[]) => {
      this.meetings = list.slice(0, 4);
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  getTrainingList(): void {
    this.trainingService.getFutureTrainings().subscribe((list: Training[]) => {
      this.trainings = list.slice(0, 4);
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }
}
