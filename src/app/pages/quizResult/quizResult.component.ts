import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  isUserLoggedIn: boolean = false;
  fromMyQuizzes: boolean = false; // Flag to check if navigated from MyquizzesComponent

  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    this.quizName = state.quizName;
    this.timeTaken = state.timeTaken;
    this.correctAnswers = state.correctAnswers;
    this.totalQuestions = state.totalQuestions;
    this.questions = state.questions;
    this.userAnswers = state.userAnswers;
    this.fromMyQuizzes = state.fromMyQuizzes || false; // Check if navigated from MyquizzesComponent

    this.afAuth.authState.subscribe(user => {
      this.isUserLoggedIn = !!user;
    });
  }

  async saveQuizResult() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const quizResult = {
        quizName: this.quizName,
        completedTime: this.timeTaken,
        score: this.correctAnswers,
        totalQuestions: this.totalQuestions, // Add totalQuestions to the result
        questions: this.questions.map((question, index) => ({
          question: question.question,
          difficulty: question.difficulty,
          category: question.category,
          correctAnswer: question.correct_answer,
          wrongAnswers: question.incorrect_answers,
          userAnswer: this.userAnswers[index]
        }))
      };

      await this.firestore.collection('users').doc(user.uid)
        .collection('quiz_history').add(quizResult);

      alert('Quiz result saved successfully!');
      this.router.navigate(['/myquizzes']); // Redirect to myquizzes page
    }
  }

  returnToMyQuizzes() {
    this.router.navigate(['/myquizzes']);
  }
}
