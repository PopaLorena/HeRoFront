import { Component, Inject, OnInit } from '@angular/core';
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
  role: string = localStorage.getItem("role")!;
  constructor(private memberService: MemberService, private router: Router) {}

  isAdmin(): boolean{
    if(this.role == "Admin")
      return true;
    else return false;
  }

  getMemberList(): void {
    this.memberService.getMembers().subscribe((list: Member[]) => {
      this.members = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  add(): void{
    this.router.navigate(['CreateUser' ])
  }
  
  edit(id : number | undefined): void{
    this.router.navigate(['EditMember/'+id ])
  }

  delete(id : number | undefined): void{
    this.memberService.deleteMember(id!).subscribe(
      () => {
        window.location.reload();
      }, (err)=>{
      }
    );
   }
 
  ngOnInit(): void {
    this.getMemberList();
  }

  goToMember(id : number | undefined): void{
    this.router.navigate(['ViewMember/' +id ])
  }
}

