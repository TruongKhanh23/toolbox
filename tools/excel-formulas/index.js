import combineMultipleTableIntoOne from "./combine-multiple-tables-into-one.js";
import conditionalFormatingDuplicateValue from "./conditional-formating-duplicate-value.js";
import generateKeyFromNameVersion from "./generate-key-from-name-version.js";
import generateKeyFromMultipleColumns from "./generate-key-from-multiple-columns.js";
import generateTextJoinTwoConditionFilterFormula from "./generate-text-join-two-condition-filter-formula.js"
import conditionalFormattingCellWithoutString from "./conditional-formatting-without-string.js";
import generateTextJoinOneConditionFilterFormula from "./generate-text-join-one-condition-filter-formula.js"
import generateAutoSerialNumberFormula from "./auto-generate-serial-number.js";
import generateConditionalFormattingEmptyCell from "./conditional-formatting-empty-cell.js";
import generateIndirectReplaceFormula from "./generate-indirect-replace-formula.js";
import generateColumnFormula from "./generate-get-column-formula.js";
import generatePriorityNamedFormulas from "./generate-priority-named-formula.js";

export default {
  1: conditionalFormatingDuplicateValue,
  2: generateKeyFromNameVersion,
  3: combineMultipleTableIntoOne,
  4: generateKeyFromMultipleColumns,
  5: generateTextJoinTwoConditionFilterFormula,
  6: conditionalFormattingCellWithoutString,
  7: generateTextJoinOneConditionFilterFormula,
  8: generateAutoSerialNumberFormula,
  9: generateConditionalFormattingEmptyCell,
  10: generateIndirectReplaceFormula,
  11: generateColumnFormula,
  12: generatePriorityNamedFormulas,
};
