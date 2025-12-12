import { FC } from "react"

import Table from "@/shared/components/Table"
import { OthersSection } from "../../IngredientDetails/ingredientDetails.type"

import styles from "../ingredientForm.module.scss"

type PlantPartsTableProps = {
    plantParts: OthersSection["plantPartsAndPurpose"]
}
const PlantPartsTable: FC<PlantPartsTableProps> = ({ plantParts }) => {
    const tableColumns = [
        {
            width: 60,
            key: "type",
            dataIndex: "plantPart",
            title: <p className={styles.tableHeader}>Type</p>
        },
        {
            width: 400,
            ellipsis: true,
            key: "description",
            dataIndex: "description",
            title: <p className={styles.tableHeader}>Description</p>,
        },
    ]
    return (
        <div className={styles.plantPartTable}>
            <Table
                size="small"
                pagination={false}
                rowKey="description"
                columns={tableColumns}
                dataSource={plantParts.reverse()}
                className={styles.ingredientsTable}
            />
        </div>
    )
}

export default PlantPartsTable
