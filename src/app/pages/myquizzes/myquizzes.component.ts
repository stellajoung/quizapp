import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myquizzes',
  templateUrl: './myquizzes.component.html',
  styleUrls: ['./myquizzes.component.scss'],
})
export class MyquizzesComponent implements OnInit {
  public copy: string;
  isUserLoggedIn: boolean = false;
  quizHistory: any[] = [];
  topQuizzes: any[] = [];

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.isUserLoggedIn = !!user;
      if (this.isUserLoggedIn) {
        this.loadQuizHistory(user.uid);
      }
    });
  }

  loadQuizHistory(userId: string) {
    this.firestore.collection('users').doc(userId).collection('quiz_history').get().subscribe(snapshot => {
      this.quizHistory = snapshot.docs
        .filter(doc => doc.id !== 'dummy') // Exclude the dummy document
        .map(doc => doc.data());

      // Sort quizzes by score and select the top 5
      this.topQuizzes = this.quizHistory.sort((a, b) => b.score - a.score).slice(0, 5);
    });
  }

  scrollCarousel(direction: number) {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  }

  viewQuizResult(quiz: any) {
    const formattedQuestions = quiz.questions.map((question: any) => ({
      question: question.question,
      difficulty: question.difficulty,
      category: question.category,
      correct_answer: question.correctAnswer, // Ensure correct field name
      incorrect_answers: question.wrongAnswers, // Ensure correct field name
    }));
    const userAnswers = quiz.questions.map((question: any) => question.userAnswer);

    this.router.navigate(['/quiz/result'], {
      state: {
        quizName: quiz.quizName,
        timeTaken: quiz.completedTime,
        correctAnswers: quiz.score, // Assuming score represents correct answers
        totalQuestions: quiz.totalQuestions,
        questions: formattedQuestions,
        userAnswers: userAnswers,
        fromMyQuizzes: true // Pass the flag to indicate navigation from MyquizzesComponent
      }
    });
  }
}
