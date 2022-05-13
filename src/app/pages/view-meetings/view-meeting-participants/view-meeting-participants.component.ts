import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/models/member';

export interface DialogData {
  name: string;
  participants: Member[];
}

@Component({
  selector: 'app-view-meeting-participants',
  templateUrl: './view-meeting-participants.component.html',
  styleUrls: ['./view-meeting-participants.component.scss']
})
export class ViewMeetingParticipantsComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewMeetingParticipantsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
