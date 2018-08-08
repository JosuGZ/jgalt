export default class JGalt {

  public static fromTableToObjects(
    tableString: string,
    rowSeparator: RegExp = /\n/,
    colSeparator: RegExp = /\s+/,
    cellFilter: (cell: string, header: string) => any = (cell) => cell
  ) {
    let objects = [];
    let fullRows = tableString.split(rowSeparator).filter((row) => row);
    let headerRow = fullRows.shift();
    let headers = headerRow.split(colSeparator).filter((col) => col);
    let rows = fullRows.map(row => row.split(colSeparator).filter((cell) => cell))
    rows.forEach(row => {
      var item = {};
      headers.forEach((headerRow, index) => {
        item[headerRow] = cellFilter(row[index], headerRow);
      });
      objects.push(item);
    });
    return objects;
  }

  public static toLines(textString: string, lineSeparator: RegExp = /\n/): string[] {
    return textString.split(lineSeparator);
  }

  public static joinLines(lines: string[]): string {
    return lines.join('\n');
  }

  public static mergeArray(array: any[]) {
    if (array instanceof Array) {
      var merged = {};
      let pushToMerged = (key, value) => {
        if (!merged[key]) {
          merged[key] = value;
        } else if (merged[key] instanceof Array) {
          merged[key].push(value);
        } else if (merged[key] !== value) {
          merged[key] = [merged[key], value];
        }
      };
      array.forEach(item => {
        Object.keys(item).forEach(key => {
          pushToMerged(key, item[key]);
        });
      });
      return merged;
    } else {
      return null;
    }
  }

}
