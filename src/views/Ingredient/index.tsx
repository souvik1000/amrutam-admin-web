import { useMemo, useState } from "react";

import { ICON } from "@/enums/icon.enum";
import Table from "@/shared/components/Table";
import useRedirect from "@/shared/hooks/useRedirect";
import Breadcrumb from "@/shared/components/BreadCrumb";
import ButtonIcon from "@/shared/components/ButtonIcon";
import SearchField from "@/shared/components/SearchField";
import { ingredientBreadcrumbs, ingredientsData } from "./constant";
import tableColumns, { IngredientTableColumnTypes } from "./tableColumns";

import styles from "./ingredient.module.scss";

const Ingredients = () => {
    const { searchQuery } = useRedirect();
    const [search, setSearch] = useState(searchQuery.search as string);
    const { navigateToAddIngredient, navigateToIngredientDetails } = useRedirect();

    const filteredRecords = useMemo(() => ingredientsData?.filter(
        (ingredient) => search ? ingredient?.name?.toLowerCase()?.includes(search?.toLowerCase()) : true
    ), [search]);

    const onSelection = (selection: IngredientTableColumnTypes) =>
        navigateToIngredientDetails(selection.name)

    return (
        <div className={styles.ingredientContainer}>
            <Breadcrumb items={ingredientBreadcrumbs} />
            <div className={styles.ingredientItems}>
                <div className={styles.itemsHeader}>
                    <div className={styles.headerLeft}>
                        <p className={styles.title}>Ingredients List</p>
                        <SearchField searchValue={search} onSearch={setSearch} />
                        {/* // TODO: Add the add Ingredient section */}
                        <ButtonIcon iconName={ICON.ADD} onClick={navigateToAddIngredient} />
                    </div>
                    <div className={styles.headerRight}>
                        <ButtonIcon iconName={ICON.DOWNLOAD} disabled={true} />
                        <ButtonIcon iconName={ICON.SORT} disabled={true} />
                    </div>
                </div>
                <div className={styles.itemsList}>
                    <Table
                        rowKey={(data, index) => `${data.name}-${index}`}
                        columns={tableColumns}
                        dataSource={filteredRecords}
                        className={styles.ingredientsTable}
                        rowSelection={{ type: "radio", onSelect: onSelection }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Ingredients;