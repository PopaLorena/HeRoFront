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
  errorText?: string;
  private trainingToEdit: Training | undefined = new Training();

  constructor(private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.errorText="";
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

  private updateTraining(newTraining: Training): void {
    this.trainingService.updateTraining(newTraining).subscribe(() => {
      this.router.navigate(['Trainings'])
    }, (err) => {
      this.errorText = err.error;
    });
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
