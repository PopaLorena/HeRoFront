import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/models/member';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss']
})
export class ViewMembersComponent implements OnInit {

  members!: Member[];
  activeMembers!: Member[];
  isActiveList = true;
  constructor(private memberService: MemberService, private router: Router) {}


  getMemberList(): void {
    this.memberService.getMembers().subscribe((list: Member[]) => {
      this.members = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  ngOnInit(): void {
    this.getMemberList();
  }

}
