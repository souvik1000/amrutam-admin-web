import { ColumnsType } from "antd/lib/table";

import { stringTitleCase } from "@/shared/utils/strings";

import styles from "./ingredient.module.scss";

export type IngredientTableColumnTypes = {
  name: string;
  status: string;
  iconSrc: string;
  description: string;
};

const tableColumns: ColumnsType<IngredientTableColumnTypes> = [
  {
    width: 100,
    key: "name",
    dataIndex: "name",
    title: "Ingredients",
    render: (name: string, { iconSrc }) => <div className={styles.ingredientNameCell}>
        <img src={iconSrc} alt={name} className={styles.ingredientIcon} />
        <span className={styles.ingredientName}>{name}</span>
    </div>
  },
  {
    width: 350,
    ellipsis: true,
    key: "description",
    title: "Description",
    dataIndex: "description"
  },
  {
    width: 80,
    key: "status",
    title: "Status",
    dataIndex: "status",
    render: (status: string) => <div className={styles.ingredientStatus}>{stringTitleCase(status)}</div>
  }
];

export default tableColumns;
