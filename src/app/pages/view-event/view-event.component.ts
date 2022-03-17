import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/models/events';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  itemIsFound = true;
  eventId!: string;
  event!: Events;
  eventIsFound = false;
  listSize: number = this.eventService.EVENTS_DATA.length;
  events: Events = this.eventService.EVENTS_DATA[1]; 
  qrValue!: string;
  qrsize: number = 200;
  constructor(private eventService: EventsService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    // this.activatedRoute.params.subscribe((params) => {
    //   this.eventId = params.id;
    //   this.event = new Events();
    // });
    // this.qrValue = this.eventId.toString();
    // if (!this.eventId) {
    //   this.event = new Events();
    // } else {
      // this.eventService.getEventById(this.eventId).subscribe({

      //   next: event => {
      //     this.event = new event(event);
      //     this.eventIsFound = this.event.id === '' ? false : true;
      //   }
      // });
  //   }
  }
  
  onClickEditEvent(): void {

    this.router.navigate(['/edit/' + this.eventId]);
  }

  ngOnInit(): void {
  }

}
