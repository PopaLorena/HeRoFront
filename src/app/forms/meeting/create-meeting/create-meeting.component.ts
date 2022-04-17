import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/models/meeting';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  params!: string;
  form!: FormGroup;
  userId! : number ;
  subscriptionList: Subscription[] = [];
  private meetingToEdit: Meeting | undefined = new Meeting();
  

  constructor(private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }
 

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  private addMeeting(newMeeting: Meeting): void {
    this.meetingService.addMeeting(newMeeting).subscribe(() => {
      this.router.navigate(['Meetings'])
    });
  }
 
  goBackClick(): void {
    this.router.navigate(['Meetings']);
  }

  saveNewMeeting(): void {
    const isValid = this.form.valid;
    const newMeeting: Meeting = {
      ...this.meetingToEdit,
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
