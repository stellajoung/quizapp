import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quizPage.component.html',
  styleUrls: ['./quizPage.component.scss']
})
export class QuizPageComponent implements OnInit {
  quizData: any;
  quizName: string;
  currentQuestionIndex: number = 0;
  userAnswers: string[] = [];
  selectedAnswer: string | null = null;
  startTime: number;
  time: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.quizData = history.state.quizData;
    this.quizName = history.state.quizName
    this.startTime = Date.now();
    setInterval(() => {
      this.computeTime(); 
    }, 1000);
  }


  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  computeTime(){
    const endTime = Date.now();
    this.time = (endTime - this.startTime) / 1000;
    console.log(this.time);
  }

  nextQuestion() {
    if (this.selectedAnswer) {
      this.selectedAnswer = null; // Reset for the next question
      if (this.currentQuestionIndex < this.quizData.results.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.submitQuiz();
      }
    }
  }

  submitQuiz() {
    const endTime = Date.now();
    const timeTaken = (endTime - this.startTime) / 1000; // in seconds
    const correctAnswers = this.quizData.results.filter((question, index) => 
      question.correct_answer === this.userAnswers[index]
    ).length;

    this.router.navigate(['/quiz/result'], {
      state: {
        quizName: this.quizName,
        timeTaken,
        correctAnswers,
        totalQuestions: this.quizData.results.length,
        questions: this.quizData.results,
        userAnswers: this.userAnswers
      }
    });
  }
}

