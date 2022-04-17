import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/training';

@Component({
  selector: 'app-view-trainings',
  templateUrl: './view-trainings.component.html',
  styleUrls: ['./view-trainings.component.scss']
})
export class ViewTrainingsComponent implements OnInit {
  trainings!: Training[];
  activeTrainings!: Training[];
  isActiveList = false;
  constructor(private trainingService: TrainingService, private router: Router) {

  }

  getTrainingList(): void {
    this.trainingService.getTrainings().subscribe((list: Training[]) => {
      this.trainings = list;
    }, (err) => {
      if (err.status === 401)
        return;
    });
  }

  getActiveTrainingList(): void {
    this.getTrainingList();
    this.activeTrainings = [];

    this.trainings?.forEach(x => {
      if (this.isGreaterThanNow(x)) {
        this.activeTrainings.push(x);
      }
    })
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

  led(): void {
    console.log("...")
    this.trainingService.led(true);
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

  ngOnInit(): void {
    if (!this.isActiveList)
      this.getActiveTrainingList();
    else {
      this.getTrainingList();
    }
  }

  activeList(): void {
    this.getActiveTrainingList();
    this.isActiveList = !this.isActiveList;
  }
}
