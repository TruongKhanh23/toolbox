import combineMultipleTableIntoOne from "./combine-multiple-tables-into-one.js";
import conditionalFormatingDuplicateValue from "./conditional-formating-duplicate-value.js";
import generateKeyFromNameVersion from "./generate-key-from-name-version.js";
import generateKeyFromMultipleColumns from "./generate-key-from-multiple-columns.js";
import generateTextJoinFilterFormula from "./generate-text-join-filter-formula.js";
import conditionalFormattingCellWithoutString from "./conditional-formatting-without-string.js";
import generateTextJoinUniqueFilterFormula from "./generate-text-join-unique-filter-formula.js";
import generateAutoSerialNumberFormula from "./auto-generate-serial-number.js";

export default {
  1: conditionalFormatingDuplicateValue,
  2: generateKeyFromNameVersion,
  3: combineMultipleTableIntoOne,
  4: generateKeyFromMultipleColumns,
  5: generateTextJoinFilterFormula,
  6: conditionalFormattingCellWithoutString,
  7: generateTextJoinUniqueFilterFormula,
  8: generateAutoSerialNumberFormula,
};
