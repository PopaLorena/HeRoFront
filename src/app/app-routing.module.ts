import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { ViewMeetingsComponent } from './pages/view-meetings/view-meetings.component';
import { ViewMembersComponent } from './pages/view-members/view-members.component';
import { ViewTrainingsComponent } from './pages/view-trainings/view-trainings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Event', component: ViewEventComponent },
  { path: 'Trainings', component: ViewTrainingsComponent },
  { path: 'Meetings', component: ViewMeetingsComponent },
  { path: 'Members', component: ViewMembersComponent },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
