import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/models/training';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['../../form.scss']
})
export class EditTrainingComponent implements OnInit {

  params!: string;
  form!: FormGroup;
  subscriptionList: Subscription[] = [];
  private trainingToEdit: Training | undefined = new Training();


  constructor(private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.trainingId && parseInt(param.trainingId, 10)) {
          this.setEditTraining(parseInt(param.trainingId, 10));
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  private updateTraining(newTraining: Training): void {
    this.trainingService.updateTraining(newTraining).subscribe(() => {
      this.router.navigate(['Trainings'])
    });
  }

  goBackClick(): void {
    this.router.navigate(['Trainings']);
  }
  saveNewTraining(): void {
    const isValid = this.form.valid;
    const newTraining: Training = {
      ...this.trainingToEdit,
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      return;
    }
    this.updateTraining(newTraining);
  }

  private async setEditTraining(id: number): Promise<void> {
    this.trainingToEdit = await this.trainingService.getTrainingById(id);
    
    this.trainingService.getTrainings().subscribe((list) => {
      this.form.patchValue(this.trainingToEdit!, {
        emitEvent: false
      });
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null],
      date: [null],
      trainerName: [null],
    });
  }
}
