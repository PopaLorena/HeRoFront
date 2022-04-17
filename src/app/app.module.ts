import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewEventComponent } from './pages/view-event/view-event.component';
import { HeaderComponent } from './header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { TrainingService } from './services/training.service';
import { ResponsibilityService } from './services/responsibility.service';
import { MemberService } from './services/member.service';
import { MemberTrainingService } from './services/member-training.service';
import { MemberMeetingService } from './services/member-meeting.service';
import { MeetingService } from './services/meeting.service';
import { EventsService } from './services/events.service';
import { HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideInfoComponent } from './side-info/side-info.component';
import { ViewTrainingsComponent } from './pages/view-trainings/view-trainings.component';
import { ViewMeetingsComponent } from './pages/view-meetings/view-meetings.component';
import { ViewMembersComponent } from './pages/view-members/view-members.component';
import { LoginComponent } from './forms/user/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { ViewResponsibilityComponent } from './pages/view-responsibility/view-responsibility.component';
import { CreateMemberComponent } from './forms/Member/create-member/create-member.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateUserComponent } from './forms/user/create-user/create-user.component';
import { EditMemberComponent } from './forms/Member/edit-member/edit-member.component';
import { CreateMeetingComponent } from './forms/meeting/create-meeting/create-meeting.component';
import { EditMeetingComponent } from './forms/meeting/edit-meeting/edit-meeting.component';
import { CreateTrainingComponent } from './forms/training/create-training/create-training.component';
import { EditTrainingComponent } from './forms/training/edit-training/edit-training.component';
import { EditEventComponent } from './forms/event/edit-event/edit-event.component';
import { CreateEventComponent } from './forms/event/create-event/create-event.component';
import { CreateResponsibilityComponent } from './forms/responsibility/create-responsibility/create-responsibility.component';
import { EditResponsibilityComponent } from './forms/responsibility/edit-responsibility/edit-responsibility.component';
import { ViewMemberComponent } from './pages/view-member/view-member.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewEventComponent,
    HeaderComponent,
    SideInfoComponent,
    ViewTrainingsComponent,
    ViewMeetingsComponent,
    ViewMembersComponent,
    LoginComponent,
    ViewResponsibilityComponent,
    CreateMemberComponent,
    CreateUserComponent,
    EditMemberComponent,
    CreateMeetingComponent,
    EditMeetingComponent,
    CreateTrainingComponent,
    EditTrainingComponent,
    EditEventComponent,
    CreateEventComponent,
    CreateResponsibilityComponent,
    EditResponsibilityComponent,
    ViewMemberComponent
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [TrainingService,ResponsibilityService,MemberService,MemberTrainingService,MemberMeetingService,MeetingService,EventsService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
