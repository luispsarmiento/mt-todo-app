import { Injectable } from '@angular/core';
import { QuizAttempt, QuizQuestion } from '../modules/quiz/pages/quiz/quiz.component';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizData: QuizQuestion[] = [
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

  private attempts: QuizAttempt[] = [];

  getQuestions(): QuizQuestion[] {
    return this.quizData;
  }

  saveAttempt(attempt: QuizAttempt) {
    this.attempts.push(attempt);
  }

  getAttempts(): QuizAttempt[] {
    return this.attempts;
  }

}
