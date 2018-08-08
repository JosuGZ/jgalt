"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JGalt = (function () {
    function JGalt() {
    }
    JGalt.fromTableToObjects = function (tableString, rowSeparator, colSeparator, cellFilter) {
        if (rowSeparator === void 0) { rowSeparator = /\n/; }
        if (colSeparator === void 0) { colSeparator = /\s+/; }
        if (cellFilter === void 0) { cellFilter = function (cell) { return cell; }; }
        var objects = [];
        var fullRows = tableString.split(rowSeparator).filter(function (row) { return row; });
        var headerRow = fullRows.shift();
        var headers = headerRow.split(colSeparator).filter(function (col) { return col; });
        var rows = fullRows.map(function (row) { return row.split(colSeparator).filter(function (cell) { return cell; }); });
        rows.forEach(function (row) {
            var item = {};
            headers.forEach(function (headerRow, index) {
                item[headerRow] = cellFilter(row[index], headerRow);
            });
            objects.push(item);
        });
        return objects;
    };
    JGalt.toLines = function (textString, lineSeparator) {
        if (lineSeparator === void 0) { lineSeparator = /\n/; }
        return textString.split(lineSeparator);
    };
    JGalt.joinLines = function (lines) {
        return lines.join('\n');
    };
    JGalt.mergeArray = function (array) {
        if (array instanceof Array) {
            var merged = {};
            var pushToMerged_1 = function (key, value) {
                if (!merged[key]) {
                    merged[key] = value;
                }
                else if (merged[key] instanceof Array) {
                    merged[key].push(value);
                }
                else if (merged[key] !== value) {
                    merged[key] = [merged[key], value];
                }
            };
            array.forEach(function (item) {
                Object.keys(item).forEach(function (key) {
                    pushToMerged_1(key, item[key]);
                });
            });
            return merged;
        }
        else {
            return null;
        }
    };
    return JGalt;
}());
exports.default = JGalt;
