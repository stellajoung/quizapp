import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { QuizPageComponent } from './pages/quizPage/quizPage.component';
import { QuizResultComponent } from './pages/quizResult/quizResult.component';
import { CreateQuizComponent } from './pages/createQuiz/createQuiz.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'createQuiz',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: 'quiz',
    component: AdminLayoutComponent,
    children: [
      { path: 'create', component: CreateQuizComponent },
      { path: 'page', component: QuizPageComponent },
      { path: 'result', component: QuizResultComponent }
    ]
  },
  { path: '', redirectTo: '/quiz/create', pathMatch: 'full' },
  { path: '**', redirectTo: '/quiz/create' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
