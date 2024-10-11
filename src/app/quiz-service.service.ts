import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataTransferService } from './data-transfer.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {
  receivedData: any;
  public amount: number = 0;
  public category: string = '';
  public difficulty: string = '';
  public type: string = '';

  constructor(private http: HttpClient, private dataTransferService: DataTransferService) {}

  ngOnInit(): void {
  }

  fetchQuestions(): any {
    return this.http.get(this.apiURL());

  }

  // Method to construct the API URL based on the current parameters
  apiURL(): string {
    this.dataTransferService.currentData.subscribe(data => {
      this.receivedData = data;
    });
    this.amount = this.receivedData['numOfQuestions'];
    this.category = this.receivedData['category'];
    this.difficulty = this.receivedData['difficulty'];
    this.type = this.receivedData['type'];

    return `https://opentdb.com/api.php?amount=${this.amount}${this.category !== "Any Category" ? `&category=${this.category}` : ""}${this.difficulty !== "Any Difficulty" ? `&difficulty=${this.difficulty}` : ""}${this.type !== "Any Type" ? `&type=${this.type}` : ""}`

  }

}
export default QuizServiceService;
