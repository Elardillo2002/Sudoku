import { Component, OnInit, Renderer2 } from '@angular/core';
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

    numSelect: number | null = null;
    sudokuItem: SudokuItem | null = null;

    constructor(private sudokuService: SudokuService, private render: Renderer2) { }

    ngOnInit(): void {
        this.sudokuService.getData().subscribe(data => {
            this.sudokuItem = data;
            this.createBoard(data);
        });
    }

    createBoard(data: SudokuItem): void {
        const rawSudoku: string[] = data.RawSudoku[this.level].toString().split(',');
        const sudokuBoard: string[][] = [];

        for (let i = 0; i < 9; i++) {
            sudokuBoard.push(rawSudoku.slice(i * 9, (i + 1) * 9));            
        }

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                let tile = document.createElement("div");
                tile.id = row.toString() + "-" + column.toString();
                tile.style.border = "1px solid lightgray";
                tile.style.display = "grid";
                tile.style.alignItems = "center";
                tile.style.fontSize = "25px";

                if (sudokuBoard[row][column] != "0") {
                    tile.textContent = sudokuBoard[row][column];
                    tile.style.backgroundColor = "whitesmoke";
                }

                if (row == 2 || row == 5) {
                    tile.style.borderBottom = "1px solid";
                }

                if (column == 2 || column == 5) {
                    tile.style.borderRight = "1px solid";
                }

                tile.addEventListener("click", this.render.listen(tile, 'click', () => {
                    this.selectTile(data);
                }));
                document.querySelector("#board")?.appendChild(tile);
            }
        }
    }

    selectNumber(number: number): void {
        this.numSelect = number;
    }

    selectTile(data: SudokuItem): void {
        const solvedSudoku: string[] = data.SolvedSudoku[this.level].toString().split(',');
        const sudokuBoard: string[][] = [];

        for (let i = 0; i < 9; i++) {
            sudokuBoard.push(solvedSudoku.slice(i * 9, (i + 1) * 9));            
        }

        if (this.numSelect) {
            
        }
    }

    // function selectTile() {
    //     const solved = response.SolvedSudoku[level];
    //     if (numSelect) {
    //         if (this.innerText != "") {
    //             return;
    //         }

    //         let coords = this.id.split("-");
    //         let row = parseInt(coords[0]);
    //         let column = parseInt(coords[1]);

    //         if (solved[row][column] == numSelect.id) {
    //             this.innerText = numSelect.id;
    //         } else {
    //             errors += 1;
    //             document.querySelector("h2").innerText = `${errors}/3`;
    //         }

    //         if (errors == 3) {
    //             // TODO: Se pierde el juego si se llega a 3 errores.
    //         }
    //     }
    // }
}
