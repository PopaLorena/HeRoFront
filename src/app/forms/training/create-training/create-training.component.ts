import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Training } from 'src/models/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['../../form.scss']
})
export class CreateTrainingComponent implements OnInit {

  params!: string;
  form!: FormGroup;
  errorText?: string;
  userId! : number;
  
  constructor(private formBuilder: FormBuilder,
    private TrainingService: TrainingService,
    private router: Router
    ) { }
 
  ngOnInit(): void {
    this.createForm();
    this.errorText="";
  }

  private addTraining(newTraining: Training): void {
    this.TrainingService.addTraining(newTraining).subscribe(() => {
      this.router.navigate(['Trainings'])
    }, (err) => {
      this.errorText = err.error;
    });
  }
 
  goBackClick(): void {
    this.router.navigate(['Trainings']);
  }

  saveNewTraining(): void {
    const isValid = this.form.valid;
    const newTraining: Training = {
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
     this.addTraining(newTraining);
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }
  
  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      date: [null],
      trainerName: [null],
    });
  }

}
