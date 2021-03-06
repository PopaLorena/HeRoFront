import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/models/events';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['../../form.scss']
})
export class EditEventComponent implements OnInit {

  params!: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  private eventToEdit: Events | undefined = new Events();
  errorText?: string;

  constructor(private formBuilder: FormBuilder,
    private eventService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.errorText="";
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.eventId && parseInt(param.eventId, 10)) {
          this.setEditEvents(parseInt(param.eventId, 10));
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private updateEvents(newEvents: Events): void {
    this.eventService.updateEvent(newEvents).subscribe(() => {
      this.router.navigate(['Events'])
    },(err) => {
      this.errorText = err.error;
    });;
  }

  saveNewEvent(): void {
    const isValid = this.form.valid;
    const newEvents: Events = {
      ...this.eventToEdit,
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
    this.updateEvents(newEvents);
  }

  private setEditEvents(id: number): void {
    this.eventService.getEventById(id).subscribe((event: Events) => {
      this.eventToEdit = event;
    });

    this.eventService.getEvents().subscribe((list) => {
      this.form.patchValue(this.eventToEdit!, {
        emitEvent: false
      });
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      startDate: [null],
      endDate: [null],
    });
  }
}
