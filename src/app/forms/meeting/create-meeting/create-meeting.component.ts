import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/models/meeting';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateMeetingComponent implements OnInit {

  params!: string;
  form!: FormGroup;
  userId! : number ;
  errorText?: string;

  constructor(private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private router: Router,
    ) { }
 
  ngOnInit(): void {
    this.createForm();
    this.errorText="";
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  private addMeeting(newMeeting: Meeting): void {
    this.meetingService.addMeeting(newMeeting).subscribe(() => {
      this.router.navigate(['Meetings'])
    }, (err) => {
      this.errorText = err.error;
    });
  }
 
  goBackClick(): void {
    this.router.navigate(['Meetings']);
  }

  saveNewMeeting(): void {
    const isValid = this.form.valid;
    const newMeeting: Meeting = {
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
     this.addMeeting(newMeeting);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      date: [null],
      facilitatorName: [null],
    });
  }
}
