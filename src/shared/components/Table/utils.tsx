import Icon from "../Icon";
import { ICON } from "src/enums/icon.enum";
import { SortOrder } from "antd/lib/table/interface";
import { SortOrder as TableSortOrder } from "src/enums/antComponentTypes";

import styles from "./table.module.scss";

const { ASC_ORDER, DESC_ORDER } = ICON;
const { ASCENDING, DESCENDING } = TableSortOrder;

export const getSortIcon = ({ sortOrder }: { sortOrder: SortOrder }) => {
  const iconName = sortOrder === ASCENDING ? ASC_ORDER : sortOrder === DESCENDING ? DESC_ORDER : "";

  return (
    <>
      {sortOrder && (
        <div className={styles.sortIconWrapper}>
          <Icon fill className={styles.sortIcon} name={iconName} />
        </div>
      )}
    </>
  );
};
