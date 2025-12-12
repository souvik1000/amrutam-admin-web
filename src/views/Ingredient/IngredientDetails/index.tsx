import { useLocation } from "react-router-dom"

import Breadcrumb from "@/shared/components/BreadCrumb"
import { ingredientDetailsBreadcrumbs } from "../constant"
import IngredientDetailSections from "./IngredientDetailSections"
import { ingredientData as defaultIngredientData } from "./constant"

import styles from "./ingredientDetails.module.scss"

const IngredientDetails = () => {
    const { state } = useLocation()
    const ingredientData = state?.ingredientData || defaultIngredientData

    return (
        <div className={styles.ingredientDetailsContainer}>
            <Breadcrumb items={ingredientDetailsBreadcrumbs} />
            <div className={styles.ingredientDetailsCard}>
                <IngredientDetailSections ingredientData={ingredientData} />
            </div>
        </div>
    )
}

export default IngredientDetails
