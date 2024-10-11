import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MyquizzesComponent } from '../../pages/myquizzes/myquizzes.component';
import { CreateQuizComponent } from '../../pages/createQuiz/createQuiz.component';
import { QuizPageComponent } from '../../pages/quizPage/quizPage.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    DashboardComponent,
    MyquizzesComponent,
    CreateQuizComponent,
    QuizPageComponent
  ],
})
export class AdminLayoutModule {}
