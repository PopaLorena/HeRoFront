import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/models/member';

export interface DialogData {
  name: string;
  participants: Member[];
}

@Component({
  selector: 'app-view-training-participants',
  templateUrl: './view-training-participants.component.html',
  styleUrls: ['./view-training-participants.component.scss']
})
export class ViewTrainingParticipantsComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewTrainingParticipantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
