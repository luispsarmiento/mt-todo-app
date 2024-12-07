import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizAttempt {
  date: string;
  score: number;
  totalQuestions: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: QuizQuestion[] = [
    {
      question: "¿Cuál es la capital de España?",
      options: ["Madrid", "Barcelona", "Valencia", "Sevilla"],
      correctAnswer: "Madrid"
    },
    {
      question: "¿Cuál es el río más largo de España?",
      options: ["Ebro", "Guadalquivir", "Tajo", "Duero"],
      correctAnswer: "Tajo"
    },
    {
      question: "¿En qué año se fundó la Constitución Española?",
      options: ["1975", "1978", "1980", "1982"],
      correctAnswer: "1978"
    }
  ];

  currentQuestionIndex = 0;
  selectedAnswer: string | null = null;
  score = 0;
  title = 'Quiz Español';
  isSidebarOpen = false;
  currentDate = new Date().toLocaleDateString();
  isInputValid = true;
  showFeedback = false;
  isCorrectAnswer = false;
  hasAnswered = false;
  attempts: QuizAttempt[] = [];
  hasFinished = false;

  constructor(
    private router: Router, 
    public quizService: QuizService){
    this.questions = this.quizService.getQuestions();
    //this.attempts = this.quizService.getAttempts();
  }

  ngOnInit() {
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  handleAnswerSelect(answer: string): void {
    if (!this.hasAnswered) {
      this.selectedAnswer = answer;
      this.showFeedback = false;
    }
  }

  validateAnswer(): void {
    if (this.selectedAnswer && !this.hasAnswered) {
      this.isCorrectAnswer = this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer;
      if (this.isCorrectAnswer) {
        this.score++;
      }
      this.showFeedback = true;
      this.hasAnswered = true;
    }
  }

  handleSubmit(): void {
    if (!this.hasAnswered) {
      this.validateAnswer();
    } else {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.showFeedback = false;
        this.hasAnswered = false;
      } else {
        const attempt: QuizAttempt = {
          date: new Date().toLocaleString(),
          score: this.score,
          totalQuestions: this.questions.length
        };
        this.quizService.saveAttempt(attempt);
        this.viewResults();
        this.hasFinished = true;
      }
    }
  }

  viewResults(): void {
    this.isSidebarOpen = true;
  }

  getOptionClass(option: string): string {
    if (!this.showFeedback) {
      return this.selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200';
    }

    if (option === this.questions[this.currentQuestionIndex].correctAnswer) {
      return 'bg-green-500 text-white';
    }

    if (this.selectedAnswer === option && !this.isCorrectAnswer) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-100 opacity-50';
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.isInputValid = true;
    this.showFeedback = false;
    this.isCorrectAnswer = false;
    this.hasAnswered = false;
    this.hasFinished = false;
  }

}
