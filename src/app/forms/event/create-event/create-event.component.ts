import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/models/events';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateEventComponent implements OnInit {

  form!: FormGroup;
  errorText?: string;

  constructor(private formBuilder: FormBuilder,
    private eventService: EventsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.errorText="";
  }

  private addEvent(newEvent: Events): void {
    this.eventService.addEvent(newEvent).subscribe((event: Events) => {
      this.router.navigate(['Events'])
    }, (err) => {
      this.errorText = err.error;
    });
  }

  saveNewEvent(): void {
    const isValid = this.form.valid;
    const newEvent: Events = {
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
    this.addEvent(newEvent);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      startDate: [null],
      endDate: [null],
    });
  }
}
