import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quizPage.component.html',
  styleUrls: ['./quizPage.component.scss']
})
export class QuizPageComponent implements OnInit {
  quizData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.quizData = history.state.quizData;
  }
}

