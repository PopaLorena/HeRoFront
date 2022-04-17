import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsibilityService } from 'src/app/services/responsibility.service';
import { Responsibility } from 'src/models/responsibility';

@Component({
  selector: 'app-view-responsibility',
  templateUrl: './view-responsibility.component.html',
  styleUrls: ['./view-responsibility.component.scss']
})
export class ViewResponsibilityComponent implements OnInit {

  responsibilities!: Responsibility[];
  activeResponsibilities!: Responsibility[];
  isActiveList = true;
  subscriptionList: Subscription[] = [];

  constructor(private responsibilityService: ResponsibilityService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
  console.log(parseInt(param.eventId, 10));
        if (parseInt(param.eventId, 10)) {
          if (!this.isActiveList)
            this.getResponsibilityList(parseInt(param.eventId, 10));
          else {
            this.getActiveResponsibilityList(parseInt(param.eventId, 10));
          }
        }
        console.log(this.responsibilities)
      })
    )
  };

  getResponsibilityList(eventId: number): void {
    this.responsibilityService.getResponsibilitiesByEventId(eventId).subscribe((list: Responsibility[]) => {
      this.responsibilities = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  getActiveResponsibilityList(eventId: number): void {
    this.getResponsibilityList(eventId);
    this.activeResponsibilities = [];

    this.responsibilities?.forEach(x => {
      if (this.isGreaterThanNow(x)) {
        this.activeResponsibilities.push(x);
      }
    })
  }

  isGreaterThanNow(x: Responsibility): boolean {
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



  activeList(): void {
    this.isActiveList = !this.isActiveList;
    this.ngOnInit();
  }

}
