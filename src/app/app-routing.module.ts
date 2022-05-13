import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/user/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { ViewMeetingsComponent } from './pages/view-meetings/view-meetings.component';
import { ViewMembersComponent } from './pages/view-members/view-members.component';
import { ViewResponsibilityComponent } from './pages/view-responsibility/view-responsibility.component';
import { ViewTrainingsComponent } from './pages/view-trainings/view-trainings.component';
import { CreateMemberComponent } from './forms/Member/create-member/create-member.component';
import { CreateUserComponent } from './forms/user/create-user/create-user.component';
import { EditMemberComponent } from './forms/Member/edit-member/edit-member.component';
import { EditTrainingComponent } from './forms/training/edit-training/edit-training.component';
import { CreateTrainingComponent } from './forms/training/create-training/create-training.component';
import { EditEventComponent } from './forms/event/edit-event/edit-event.component';
import { CreateEventComponent } from './forms/event/create-event/create-event.component';
import { EditMeetingComponent } from './forms/meeting/edit-meeting/edit-meeting.component';
import { CreateMeetingComponent } from './forms/meeting/create-meeting/create-meeting.component';
import { CreateResponsibilityComponent } from './forms/responsibility/create-responsibility/create-responsibility.component';
import { EditResponsibilityComponent } from './forms/responsibility/edit-responsibility/edit-responsibility.component';
import { ViewMemberComponent } from './pages/view-member/view-member.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Events', component: ViewEventComponent },
  { path: 'EditEvent/:eventId', component: EditEventComponent },
  { path: 'CreateEvent', component: CreateEventComponent },
  { path: 'Trainings', component: ViewTrainingsComponent },
  { path: 'EditTraining/:trainingId', component: EditTrainingComponent },
  { path: 'CreateTraining', component: CreateTrainingComponent },
  { path: 'Meetings', component: ViewMeetingsComponent },
  { path: 'EditMeeting/:meetingId', component: EditMeetingComponent },
  { path: 'CreateMeeting', component: CreateMeetingComponent },
  { path: 'Members', component: ViewMembersComponent },
  { path: 'EditMember/:memberId', component: EditMemberComponent },
  { path: 'CreateMember/:userId', component: CreateMemberComponent },
  { path: 'Responsibilities/:eventId', component: ViewResponsibilityComponent },
  { path: 'CreateResponsibility/:eventId', component: CreateResponsibilityComponent },
  { path: 'EditResponsibility/:eventId/:respId', component: EditResponsibilityComponent },
  { path: 'CreateUser', component: CreateUserComponent },
  { path: 'ViewMember/:memberId', component: ViewMemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
