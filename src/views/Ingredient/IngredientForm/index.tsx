import { lazy } from "react"
import { useLocation } from "react-router-dom"
import { FieldValues, useForm } from "react-hook-form"

import Form from "@/shared/components/Form"
import LazyLoad from "@/shared/components/LazyLoad"
import useRedirect from "@/shared/hooks/useRedirect"
import { ingredientFormBreadcrumbs } from "../constant"
import Breadcrumb from "@/shared/components/BreadCrumb"
import { stepSchemas } from "./ingredientFormValidation"
import { IngredientStepperHash } from "@/enums/hashNotes"
import { createStepValidation } from "@/shared/hooks/useStepValidation"
import Stepper, { StepperItemTypes } from "@/shared/components/Stepper"
import { IngredientFormValues } from "../IngredientDetails/ingredientDetails.type"

import styles from "./ingredientForm.module.scss"

const Others = lazy(() => import("./Others"))
const Overview = lazy(() => import("./Overview"))
const Benefits = lazy(() => import("./Benefits"))
const Properties = lazy(() => import("./Properties"))
const GeneralInfo = lazy(() => import("./GeneralInfo"))

const { GENERAL_INFORMATION, BENEFITS, PROPERTIES, OTHERS, OVERVIEW } = IngredientStepperHash;
const stepNames = [GENERAL_INFORMATION, BENEFITS, PROPERTIES, OTHERS, OVERVIEW]

const IngredientForm = () => {
    const { state } = useLocation()
    const ingredientData = state?.ingredientData as IngredientFormValues | undefined
    const isEditMode = !!ingredientData

    const methods = useForm<IngredientFormValues>({
        mode: "onChange",
        defaultValues: isEditMode ? ingredientData : undefined
    })
    const { navigateToIngredientDetails } = useRedirect()
    const { validateAllSteps } = createStepValidation(stepSchemas, methods)

    const handleSubmit = async (formValues: FieldValues) => {
        try {
            const allValid = await validateAllSteps(stepNames)
            if (!allValid) return

            navigateToIngredientDetails(formValues.generalInformation?.ingredientName, formValues)
        } catch (error) {
            console.error("Error on Submit:", error)
        }
    }

    const ingredientFormSteps: StepperItemTypes[] = [
        {
            key: "general-information",
            nextBtnName: "Next",
            previousBtnName: "Save",
            name: "generalInfomation",
            title: "General Information",
            renderedChild: <LazyLoad><GeneralInfo /></LazyLoad>,
        },
        {
            key: "benefits",
            name: "benefits",
            title: "Benefits",
            nextBtnName: "Next",
            previousBtnName: "Save",
            renderedChild: <LazyLoad><Benefits /></LazyLoad>,
        },
        {
            key: "properties",
            name: "properties",
            title: "Properties",
            nextBtnName: "Next",
            previousBtnName: "Save",
            renderedChild: <LazyLoad><Properties /></LazyLoad>,
        },
        {
            key: "others",
            title: "Others",
            name: "others",
            nextBtnName: "Next",
            previousBtnName: "Save",
            renderedChild: <LazyLoad><Others /></LazyLoad>,
        },
        {
            key: "overview",
            name: "overview",
            title: "Overview",
            previousBtnName: "Submit",
            renderedChild: <LazyLoad><Overview /></LazyLoad>,
        },
    ]

    return (
        <div className={styles.ingredient}>
            <Form onSubmit={handleSubmit} methods={methods}>
                <Breadcrumb items={ingredientFormBreadcrumbs} />
                <Stepper steps={ingredientFormSteps} stepsScheme={stepSchemas} storageKey="ingredientFormData" />
            </Form>
        </div>
    )
}

export default IngredientForm
