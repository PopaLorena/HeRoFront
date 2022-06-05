import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberTrainingService } from 'src/app/services/member-training.service';
import { TrainingService } from 'src/app/services/training.service';
import { Member } from 'src/models/member';
import { MemberTraining } from 'src/models/memberTraining';
import { Training } from 'src/models/training';
import { ViewTrainingParticipantsComponent } from './view-training-participants/view-training-participants.component';

@Component({
  selector: 'app-view-trainings',
  templateUrl: './view-trainings.component.html',
  styleUrls: ['./view-trainings.component.scss']
})
export class ViewTrainingsComponent implements OnInit {
  trainings!: Training[];
  activeTrainings!: Training[];
  isActiveList = false;
  participants: any | Member[] = [];
  memberId = localStorage.getItem('userId');
  role: string = localStorage.getItem("role")!;
  subscriptionList: Subscription[] = [];
  choseTraining!: number;
  constructor(public dialog: MatDialog, private memberTrainingService: MemberTrainingService, private trainingService: TrainingService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  isAdmin(): boolean{
    if(this.role == "Admin")
      return true;
    else return false;
  }

  ngOnInit(): void {
    if (!this.isActiveList)
      this.getActiveTrainingList();
    else {
      this.getTrainingList();
    }
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.trainingId && parseInt(param.trainingId, 10)) {
          this.choseTraining = parseInt(param.trainingId, 10);
        }
      })
    )
  }

  getTrainingList(): void {
    this.trainingService.getTrainings().subscribe((list: Training[]) => {
      this.trainings = list;
      this.trainings?.forEach(async x => {
        if(await this.isOnTheList(x.id)){
          x.hadApply = true;
        }
        else {
          x.hadApply = false;
        }
    })
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  async openDialog(training: Training): Promise<void> {
    this.participants = await this.trainingService.getParticipants(training.id!);

    const dialogRef = this.dialog.open(ViewTrainingParticipantsComponent, {
      width: '250px',
      data: { name: training.name, participants: this.participants },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  getActiveTrainingList(): void {
    this.getTrainingList();
    this.activeTrainings = [];

    this.trainings?.forEach(async x => {
      if (this.isGreaterThanNow(x)) {
        this.activeTrainings.push(x);
        if(await this.isOnTheList(x.id)){
          x.hadApply = true;
        }
        else {
          x.hadApply = false;
        }
      }
    })
  }

  apply(id: number | undefined): void {
    this.memberTrainingService.addMemberTrainings(parseInt(this.memberId!), id!).subscribe((m: MemberTraining) => {
      window.location.reload();
    },
    (err) => {
      console.log(err);
    });
  }

  add(): void{
    this.router.navigate(['CreateTraining' ])
  }

  edit(id : number | undefined): void{
    this.router.navigate(['EditTraining/'+id ])
  }

  delete(id : number | undefined): void{
   this.trainingService.deleteTraining(id!).subscribe(
    () => {
      window.location.reload();
    }, (err)=>{
    }
  );
  }

  async isOnTheList(id: number | undefined){
    return await this.memberTrainingService.CheckIfExist(parseInt(this.memberId!), id!);
  }

  isGreaterThanNow(x: Training): boolean {
    var newDate = new Date(x.date!);
    if (newDate.getFullYear() < new Date().getFullYear())
      return false;
    else if (newDate.getFullYear() === new Date().getFullYear())
      if (newDate.getMonth() < new Date().getMonth())
        return false;
      else if (newDate.getMonth() === new Date().getMonth())
        if (newDate.getDate() < new Date().getDate())
          return false;
        else if (newDate.getDate() === new Date().getDate())
          if (newDate.getHours() < new Date().getHours())
            return false;

    return true;
  }

  activeList(): void {
    this.getActiveTrainingList();
    this.isActiveList = !this.isActiveList;
    this.choseTraining = -10;
  }
}
