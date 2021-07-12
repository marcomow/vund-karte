import { DatabaseEntry, DatabaseId, SheetDatabase } from "../types/Models";
import { numberToLetters } from "./numbers-to-letters";
const reduceSheetToDatabase = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  offsetTop: number = 0
): SheetDatabase => {
  return sheet
    .getDataRange()
    .getValues()
    .reduce(
      (accumulatorRow, row, indexRow): SheetDatabase => {
        if (indexRow < 1 + Number(offsetTop)) {
          accumulatorRow.ids = row.map((id, indexColumn): DatabaseId => {
            return { id: id + "", _column: numberToLetters(indexColumn) };
          });
        } else {
          const rowNotEmpty: boolean = row.join("").length > 0;
          if (rowNotEmpty) {
            const objectRow = accumulatorRow.ids.reduce(
              (
                accumulatorCol: DatabaseEntry,
                id: DatabaseId,
                indexId: number
              ): any => {
                if (id.id) {
                  accumulatorCol[id.id] = row[indexId];
                }
                return accumulatorCol;
              },
              {}
            );
            objectRow._indexRow = indexRow - 1 + offsetTop;
            accumulatorRow.buffer.push(objectRow);
          }
        }
        return accumulatorRow;
      },
      { ids: [], buffer: [] }
    );
};
export { reduceSheetToDatabase };