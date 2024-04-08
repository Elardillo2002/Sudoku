import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SudokuItem } from '../interfaces/sudoku-item';

@Injectable({
  providedIn: 'root'
})

export class SudokuService {
  private url: string = "http://localhost:3000/Sudoku";

  constructor(private http: HttpClient) { }

  getData(): Observable<SudokuItem> {
    return this.http.get<SudokuItem>(this.url);
  }
}