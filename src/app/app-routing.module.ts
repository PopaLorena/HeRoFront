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
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Events', component: ViewEventComponent, canActivate: [AuthGuard] },
  {path: 'EditEvent/:eventId', component: EditEventComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'CreateEvent', component: CreateEventComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'Trainings', component: ViewTrainingsComponent, canActivate: [AuthGuard] },
  { path: 'Trainings/:trainingId', component: ViewTrainingsComponent, canActivate: [AuthGuard] },
  {path: 'EditTraining/:trainingId', component: EditTrainingComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'CreateTraining', component: CreateTrainingComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'Meetings', component: ViewMeetingsComponent, canActivate: [AuthGuard] },
  { path: 'Meetings/:meetingId', component: ViewMeetingsComponent, canActivate: [AuthGuard] },
  {path: 'EditMeeting/:meetingId', component: EditMeetingComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'CreateMeeting', component: CreateMeetingComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'Members', component: ViewMembersComponent, canActivate: [AuthGuard] },
  {path: 'EditMember/:memberId', component: EditMemberComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'CreateMember/:userId', component: CreateMemberComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'Responsibilities/:eventId', component: ViewResponsibilityComponent, canActivate: [AuthGuard] },
  {path: 'CreateResponsibility/:eventId', component: CreateResponsibilityComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'EditResponsibility/:eventId/:respId', component: EditResponsibilityComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  {path: 'CreateUser', component: CreateUserComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'Admin'
    }
  },
  { path: 'ViewMember/:memberId', component: ViewMemberComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'Home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
