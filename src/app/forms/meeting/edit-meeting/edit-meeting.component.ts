import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MeetingService } from 'src/app/services/meeting.service';
import { Meeting } from 'src/models/meeting';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['../../form.scss']
})
export class EditMeetingComponent implements OnInit {

  params!: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  private meetingToEdit: Meeting | undefined = new Meeting();
  errorText?: string;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }
 
  ngOnInit(): void {
    this.createForm();
    this.errorText="";
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.meetingId && parseInt(param.meetingId, 10)) {
          this.setEditMeeting(parseInt(param.meetingId, 10));
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private updateMeeting(newMeeting: Meeting): void {
    this.meetingService.updateMeeting(newMeeting).subscribe(() => {
      this.router.navigate(['Meetings'])
    }, (err) => {
      this.errorText = err.error;
    });
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
      this.updateMeeting(newMeeting);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  private setEditMeeting(id: number): void {
    this.meetingService.getMeetingById(id).subscribe((meeting: Meeting) => {
      this.meetingToEdit = meeting;
    });
    this.meetingService.getMeetings().subscribe((list) => {
      this.form.patchValue(this.meetingToEdit!, {
        emitEvent: false
      });
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      date: [null],
      facilitatorName: [null],
    });
  }
}