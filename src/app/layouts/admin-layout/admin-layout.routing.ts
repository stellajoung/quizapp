import { Routes } from '@angular/router';

import { MyquizzesComponent } from '../../pages/myquizzes/myquizzes.component';
import { CreateQuizComponent } from '../../pages/createQuiz/createQuiz.component';
// Correct the path or file name if necessary
import { QuizPageComponent } from '../../pages/quizPage/quizPage.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LoginComponent } from '../../pages/login/login.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'createQuiz', component: CreateQuizComponent },
  { path: 'myquizzes', component: MyquizzesComponent },
  { path: 'quizPage/:questions', component: QuizPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
