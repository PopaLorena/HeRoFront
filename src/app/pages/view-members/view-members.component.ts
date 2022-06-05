import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { Member } from 'src/models/member';
import { User } from 'src/models/user';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss']
})
export class ViewMembersComponent implements OnInit {

  members!: Member[];
  activeMembers!: Member[];
  isActiveList = true;
  userIdAdmin?: boolean;
  role: string = localStorage.getItem("role")!;
  constructor(private memberService: MemberService, private router: Router, private userService: UserService,) { }

  isAdmin(): boolean {
    if (this.role == "Admin")
      return true;
    else return false;
  }

  getMemberList(): void {
    this.memberService.getMembers().subscribe((list: Member[]) => {
      this.members = list;
      this.members.forEach(member => {
        this.userService.memberIdNotAdminYet(member.userId!).subscribe(
          (memberIdNotAdminYet: boolean) => {
            member.userIsAdmin = !memberIdNotAdminYet;
  
          }, (err) => {
          }
        );
      });
    }, (err) => {
      if (err.status === 401)
        return;
    });

    
  }

  add(): void {
    this.router.navigate(['CreateUser'])
  }

  edit(id: number | undefined): void {
    this.router.navigate(['EditMember/' + id])
  }

  delete(id: number | undefined): void {
    this.memberService.deleteMember(id!).subscribe(
      () => {
        window.location.reload();
      }, (err) => {
      }
    );
  }

  ngOnInit(): void {
    this.getMemberList();
  }

  goToMember(id: number | undefined): void {
    this.router.navigate(['ViewMember/' + id])
  }

  setAsAdmin(member: Member): void {
    this.userService.setAsAdmin(member.userId!).subscribe(
      () => {
        member.userIsAdmin = true;
        window.location.reload();
      }, (err) => {
      }
    );
  }

  setAsUser(member: Member): void {
    this.userService.setAsUser(member.userId!).subscribe(
      () => {
        member.userIsAdmin = false;
        window.location.reload();
      }, (err) => {
      }
    );
  }
}

