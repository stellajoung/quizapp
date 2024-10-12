import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { MyquizzesComponent } from '../../pages/myquizzes/myquizzes.component';
import { CreateQuizComponent } from '../../pages/createQuiz/createQuiz.component';
import { QuizPageComponent } from '../../pages/quizPage/quizPage.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LoginComponent } from '../../pages/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
  ],
  declarations: [
    MyquizzesComponent,
    CreateQuizComponent,
    QuizPageComponent,
    RegisterComponent,
    LoginComponent
  ],
})
export class AdminLayoutModule {}
