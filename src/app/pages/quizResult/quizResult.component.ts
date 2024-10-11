import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quizResult.component.html',
  styleUrls: ['./quizResult.component.scss']
})
export class QuizResultComponent implements OnInit {
  quizName: string;
  timeTaken: number;
  correctAnswers: number;
  totalQuestions: number;
  questions: any[];
  userAnswers: string[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = history.state;
    this.quizName = state.quizName;
    this.timeTaken = state.timeTaken;
    this.correctAnswers = state.correctAnswers;
    this.totalQuestions = state.totalQuestions;
    this.questions = state.questions;
    this.userAnswers = state.userAnswers;
  }
}
