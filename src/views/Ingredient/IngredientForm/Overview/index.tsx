import { lazy, useMemo } from "react"

import LazyLoad from "@/shared/components/LazyLoad"
import { SessionStorage } from "@/shared/utils/sessionStorageHelpers"
import { IngredientFormValues } from "../../IngredientDetails/ingredientDetails.type"
import { ingredientData as defaultIngredientData } from "../../IngredientDetails/constant"

const IngredientDetailSections = lazy(() => import("../../IngredientDetails/IngredientDetailSections"))

const Overview = () => {
    const ingredientData = useMemo(() => {
        const storedData = SessionStorage.getItem<IngredientFormValues>("ingredientFormData")
        return storedData || defaultIngredientData
    }, [])

    return (
        <LazyLoad>
            <IngredientDetailSections overview ingredientData={ingredientData} />
        </LazyLoad>
    )
}

export default Overview
