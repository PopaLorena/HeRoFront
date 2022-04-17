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
import { EditEventComponent } from './forms/events/edit-event/edit-event.component';
import { CreateEventComponent } from './forms/events/create-event/create-event.component';
import { EditMeetingComponent } from './forms/meeting/edit-meeting/edit-meeting.component';
import { CreateMeetingComponent } from './forms/meeting/create-meeting/create-meeting.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Event', component: ViewEventComponent },
  { path: 'EditEvent/:eventId', component: EditEventComponent},
  { path: 'CreateEvent', component: CreateEventComponent},
  { path: 'Trainings', component: ViewTrainingsComponent },
  { path: 'EditTraining/:trainingId', component: EditTrainingComponent},
  { path: 'CreateTraining', component: CreateTrainingComponent},
  { path: 'Meetings', component: ViewMeetingsComponent },
  { path: 'EditMeeting/:meetingId', component: EditMeetingComponent},
  { path: 'CreateMeeting', component: CreateMeetingComponent},
  { path: 'Members', component: ViewMembersComponent },
  { path: 'EditMember/:memberId', component: EditMemberComponent},
  { path: 'CreateMember/:userId', component: CreateMemberComponent},
  { path: 'Login', component: LoginComponent },
  { path: 'Responsibilities/:eventId', component: ViewResponsibilityComponent},
  { path: 'CreateUser', component: CreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // JwtModule.forRoot({
  //   config:{
  //     tokenGetter: tokenGetter,
  //     allowedDomains: ["localhost:44321"],
  //     disallowedRoutes: []
  //   }
  // })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
