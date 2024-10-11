import {Component} from '@angular/core';
import { DataTransferService } from '../../data-transfer.service';
import { QuizServiceService } from '../../quiz-service.service';
import { lastValueFrom } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent{
  categories: any = {"trivia_categories":[{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]};
  difficulties = ['Easy', "Medium", "Hard"];
  types = ['Multiple Choice', "True/False"];

  createQuizForm = new createQuiz('', 1, 'Any Category', 'Any Difficulty', 'Any Type'); //prefil data - randomly generate quiz name

  constructor(private dataTransferService: DataTransferService, private quizService: QuizServiceService, private router: Router) {  }
  ngOnInit() {


  }

  onSubmit() {
    const data = this.createQuizForm;
    this.dataTransferService.changeData(data);

    this.quizService.fetchQuestions().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        console.log('Navigating to quizPage with data:', response); // Debug log
        this.router.navigate(['/quizPage'], { 
          state: { quizData: response }
        });
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // This function runs after categories are fetched
  onCategoriesLoaded() {
    console.log('Categories after fetch:', this.categories);
  
    // Perform any actions dependent on categories here
  }

  // Remove the passQuizData method if it's not used elsewhere
}

export class createQuiz {
  constructor(
      public quizName: string,
      public numOfQuestions: number,
      public category: string,
      public difficulty: string,
      public type: string
  ) {}
}