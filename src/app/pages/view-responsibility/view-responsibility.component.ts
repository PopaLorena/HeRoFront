import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberService } from 'src/app/services/member.service';
import { ResponsibilityService } from 'src/app/services/responsibility.service';
import { Member } from 'src/models/member';
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
  eventId! : number;
  member!: Member;
  role: string = localStorage.getItem("role")!;
  constructor(private responsibilityService: ResponsibilityService, private memberService: MemberService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
  }

  isAdmin(): boolean{
    if(this.role == "Admin")
      return true;
    else return false;
  }
  
  ngOnInit(): void {
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        this.eventId = param.eventId;
      })
    )
    this.getResponsibilityList(this.eventId);
  };

  openDialog(resp: Responsibility): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: resp.name, description: resp.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };


  getResponsibilityList(eventId: number): void {
    this.responsibilityService.getResponsibilitiesByEventId(eventId).subscribe((list: Responsibility[]) => {
      this.responsibilities = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  add(): void{
    this.router.navigate(['CreateResponsibility/' + this.eventId])
  }

  edit(id : number | undefined): void{
    this.router.navigate(['EditResponsibility/'+ this.eventId +'/'+id ])
  }

  delete(id : number | undefined): void{
    this.responsibilityService.deleteResponsibility(id!).subscribe(
      () => {
        window.location.reload();
      }, (err)=>{
      }
    );
   }
 
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'description.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Responsibility,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}