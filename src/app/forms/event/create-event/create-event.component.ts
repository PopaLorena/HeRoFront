import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/models/events';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateEventComponent implements OnInit {
  
  params!: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  public eventList: Events[] = [];
  private eventToEdit: Events | undefined = new Events();
  

  constructor(private formBuilder: FormBuilder,
    private eventService: EventsService,
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
  
    private addUser(newEvent: Events): void {
      this.eventService.addEvent(newEvent).subscribe((event: Events) => {
        this.router.navigate(['Events'])
      });
    }
    
    goBackClick(): void {
      this.router.navigate(['Events']);
    }
    saveNewEvent(): void {
      const isValid = this.form.valid;
      const newUser: Events = {
        ...this.eventToEdit,
        ...this.form.getRawValue(),
      };
      if (!isValid) {
        return;
      }
      this.addUser(newUser);
    }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      startDate: [null],
      endDate: [null],
    });
  }
}
