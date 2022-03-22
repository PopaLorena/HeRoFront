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
  events!: Events[];
  activeEvents!: Events[];
  isActiveList = true;
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
  
  getActiveEventsList(): void {
    this.getEventList();
    this.activeEvents = [];

    this.events?.forEach(x => {
      if (this.isGreaterThanNow(x)) {
        this.activeEvents.push(x);
      }
    })
  }

  isGreaterThanNow(x: Events): boolean {
    var newDate = new Date(x.endDate!);
    if (newDate.getFullYear() < new Date().getFullYear())
      return false;
    else if (newDate.getFullYear() == new Date().getFullYear())
      if (newDate.getMonth() < new Date().getMonth())
        return false;
      else if (newDate.getMonth() == new Date().getMonth())
        if (newDate.getDate() < new Date().getDate())
          return false;
        else if (newDate.getDate() == new Date().getDate())
          if (newDate.getHours() < new Date().getHours())
            return false;

    return true;
  }

  ngOnInit(): void {
    if (!this.isActiveList)
      this.getActiveEventsList();
    else {
      this.getEventList();
    }
  }

  activeList(): void {
    this.isActiveList = !this.isActiveList;
    this.ngOnInit();
  }

}
