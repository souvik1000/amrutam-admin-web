import clsx from "clsx"
import * as Yup from "yup"
import { Steps } from "antd"
import { useFormContext } from "react-hook-form"
import { FC, useMemo, useState, useEffect } from "react"

import Button from "../Button"
import useRedirect from "@/shared/hooks/useRedirect"
import StepCompletedFile from "src/assets/icons/completed.svg"
import { useStepValidation } from "@/shared/hooks/useStepValidation"
import { SessionStorage } from "@/shared/utils/sessionStorageHelpers"
import { stepSchemas } from "@/views/Ingredient/IngredientForm/ingredientFormValidation"

import styles from "./stepper.module.scss"

export type StepperItemTypes = {
    name: string
    key?: string
    title: string
    nextBtnName?: string
    description?: string
    previousBtnName?: string
    renderedChild?: React.ReactNode
}

type StepperProps = {
    steps: StepperItemTypes[]
    stepsScheme: Record<string, Yup.ObjectSchema<any>>
    currentStep?: number
    storageKey?: string
}

const { Step } = Steps

const Stepper: FC<StepperProps> = ({ steps, currentStep = 0, storageKey }) => {
    const { hash, replaceLocationInfo } = useRedirect()
    const { getValues } = useFormContext()
    const [current, setCurrent] = useState(currentStep)
    const { validateStep } = useStepValidation(stepSchemas)
    const [clickedStep, setClickedStep] = useState(currentStep)

    const handleSaveStep = () => {
        if (storageKey) {
            const formData = getValues()
            SessionStorage.setItem(storageKey, formData)
        }
    }

    useEffect(() => {
        const indexByHash = steps.findIndex((step) => step.key === hash)
        const currentIndex = indexByHash < 0 ? currentStep : indexByHash

        if (currentIndex >= 0) {
            setClickedStep(currentIndex)
            setCurrent(Math.max(current, currentIndex))
            replaceLocationInfo(steps[currentIndex].key)
        }
    }, [hash, steps])

    const moveToNextStep = async () => {
        const nextStep = current + 1
        const name = steps[current].name
        const isValid = await validateStep(name)
        console.log("VAlid: ", isValid, nextStep < steps.length)

        if (!isValid) return

        if (storageKey) {
            const formData = getValues()
            SessionStorage.setItem(storageKey, formData)
        }

        if (nextStep < steps.length) {
            setCurrent(nextStep)
            setClickedStep(nextStep)
            replaceLocationInfo(steps[nextStep].key)
        } else if (clickedStep < current) {
            setClickedStep(clickedStep + 1)
            replaceLocationInfo(steps[clickedStep + 1].key)
        }
    }

    const stepClickHandler = (index: number) => {
        if (index <= current) {
            setClickedStep(index)
            replaceLocationInfo(steps[index].key)
        }
    }

    const childRender = useMemo(() => {
        const { renderedChild, previousBtnName, nextBtnName } =
            steps[clickedStep]
        const isLastStep = clickedStep === steps.length - 1
        const isFinalSubmit = isLastStep && !nextBtnName

        return (
            <>
                <div className={styles.stepperChild}>{renderedChild}</div>
                <div className={styles.stepperButtons}>
                    {previousBtnName && (
                        <Button htmlType={isFinalSubmit ? "submit" : "button"} type="primary" name={previousBtnName} onClick={handleSaveStep} />
                    )}
                    {nextBtnName && (
                        <Button name={nextBtnName} onClick={moveToNextStep} />
                    )}
                </div>
            </>
        )
    }, [steps, clickedStep])

    const formatStepNumber = (index: number) =>
        String(index + 1).padStart(2, "0")

    return (
        <div className={styles.stepperContainer}>
            <div className={styles.stepperWrapper}>
                <Steps
                    current={current}
                    labelPlacement="vertical"
                    className={styles.stepper}
                >
                    {steps.map((step, index) => (
                        <Step
                            key={step.title}
                            title={step.title}
                            icon={
                                index >= current ? (
                                    <span
                                        className={clsx(styles.stepperBadge, {
                                            [styles.waittingStep]:
                                                index > current,
                                        })}
                                        onClick={() => stepClickHandler(index)}
                                    >
                                        {formatStepNumber(index)}
                                    </span>
                                ) : (
                                    <img
                                        src={StepCompletedFile}
                                        alt="step completed"
                                        onClick={() => stepClickHandler(index)}
                                    />
                                )
                            }
                        />
                    ))}
                </Steps>
            </div>
            {childRender}
        </div>
    )
}

export default Stepper
