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
    level: number = 0;

    dataLength: number = 0;
    rawBoard: string[][] = [];
    solvedBoard: string[][] = [];
    numSelect: number | null = null;
    sudokuItem: SudokuItem | null = null;

    constructor(private sudokuService: SudokuService) { }

    ngOnInit(): void {
        this.sudokuService.getData().subscribe(data => {
            this.sudokuItem = data;
            this.createBoard(data);
            this.dataLength = data.RawSudoku.length;
        });
    }

    previousLevel() {
        if (this.sudokuItem) {
            this.level--;
            this.createBoard(this.sudokuItem);
        }
    }

    nextLevel() {
        if (this.sudokuItem) {
            this.level++;
            this.createBoard(this.sudokuItem);
        }
    }

    createBoard(data: SudokuItem): void {
        document.querySelector("#board")!.innerHTML = '';
        let rawSudoku: string[] = data.RawSudoku[this.level].toString().split(',');

        for (let i = 0; i < 9; i++) {
            this.rawBoard.push(rawSudoku.slice(i * 9, (i + 1) * 9));            
        }

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                let tile = document.createElement("div");
                tile.id = "tile" + row.toString() + "-" + column.toString();
                tile.style.border = "1px solid lightgray";
                tile.style.display = "grid";
                tile.style.alignItems = "center";
                tile.style.fontSize = "25px";

                if (this.rawBoard[row][column] != "0") {
                    tile.textContent = this.rawBoard[row][column];
                    tile.style.backgroundColor = "whitesmoke";
                } else if (this.rawBoard[row][column] == "0") {
                    tile.addEventListener("click", () => {
                        this.setNumber(row, column);
                    });
                }

                if (row == 2 || row == 5) {
                    tile.style.borderBottom = "1px solid black";
                }

                if (column == 2 || column == 5) {
                    tile.style.borderRight = "1px solid black";
                }

                document.querySelector("#board")?.appendChild(tile);
            }
        }
    }

    selectNumber(number: number): void {
        this.numSelect = number;
    }

    setNumber(row: number, column: number): void {
        if (this.numSelect) {
            let tile: HTMLElement = document.querySelector(`#tile${row}-${column}`)!;
            tile.style.color = "black";
            tile.innerText = this.numSelect.toString();
            this.rawBoard[row][column] = this.numSelect.toString();
        }       
    }

    check() {
        if (this.sudokuItem) {
            const solvedSudoku: string[] = this.sudokuItem.SolvedSudoku[this.level].toString().split(',');

            for (let i = 0; i < 9; i++) {
                this.solvedBoard.push(solvedSudoku.slice(i * 9, (i + 1) * 9));            
            }
            let checkValidation = true;

            for (let row = 0; row < 9; row++) {
                for (let column = 0; column < 9; column++) {
                    if (this.rawBoard[row][column] != this.solvedBoard[row][column]) {
                        let tile: HTMLElement = document.querySelector(`#tile${row}-${column}`)!;
                        tile.style.color = "red";
                        checkValidation = false;
                    }
                }
            }

            if (checkValidation == true) {
                alert(`Tablero ${this.level + 1} completado`);
            }
        }
    }
}
