export interface SudokuItem {
    RawSudoku: number[][],
    SolvedSudoku: number[][]
    // sudoku.rawSudoku => Todos los sudokus sin resolver
    // sudoku.resolvedSudoku => Todos los sudokus resuletos
}