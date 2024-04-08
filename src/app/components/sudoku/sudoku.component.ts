import { Component, OnInit } from '@angular/core';
import { SudokuItem } from 'src/app/interfaces/sudoku-item';
import { SudokuService } from 'src/app/services/sudoku.service';

@Component({
    selector: 'app-sudoku',
    templateUrl: './sudoku.component.html',
    styleUrls: ['./sudoku.component.css']
})

export class SudokuComponent implements OnInit {
    url: string = "http://localhost:3000/Sudoku";
    level: number = 2;

    numSelect: number | null = null;
    sudokuItem: SudokuItem | null = null;

    constructor(private sudokuService: SudokuService) { }

    ngOnInit(): void {
        this.sudokuService.getData().subscribe(data => {
            this.sudokuItem = data;
        });
    }

    selectNumber(number: number): void {
        this.numSelect = number;
    }
}
