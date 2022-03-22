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
  eventId!: string;
  events?: Events[];
  constructor(private eventService: EventsService, private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  getEventList(): void {
    this.eventService.getEvents().subscribe((list: Events[]) => {
      this.events = list;
    }, (err) => {
      if (err.status === 401)
       return;
    });
  }
  
  onClickEditEvent(): void {

    this.router.navigate(['/edit/' + this.eventId]);
  }

  ngOnInit(): void {
    this.getEventList();
  }

}
