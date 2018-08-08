export default class JGalt {
    static fromTableToObjects(tableString: string, rowSeparator?: RegExp, colSeparator?: RegExp, cellFilter?: (cell: string, header: string) => any): any[];
    static toLines(textString: string, lineSeparator?: RegExp): string[];
    static joinLines(lines: string[]): string;
    static mergeArray(array: any[]): {};
}
