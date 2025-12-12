import clsx from "clsx"
import { Col, Row } from "antd"
import { useFieldArray, useFormContext } from "react-hook-form"

import {
    impactOptions,
    benefitsFormField,
} from "../constant"
import { ICON } from "@/enums/icon.enum"
import Icon from "@/shared/components/Icon"
import Input from "@/shared/components/InputField"
import Dropdown from "@/shared/components/Dropdown"
import { InputTypes } from "@/enums/antComponentTypes"
import EmojiInput from "@/shared/components/EmojiPicker"
import { IngredientFormValues } from "../../IngredientDetails/ingredientDetails.type"

import styles from "../ingredientForm.module.scss"

const Benefits = () => {
    const { control: whyControl } = useFormContext<IngredientFormValues>()

    const {
        fields: whyFields,
        append: whyAppend,
        remove: whyRemove,
    } = useFieldArray({
        control: whyControl,
        name: "benefits.whyToUse",
    })
    const {
        fields: benefitsFields,
        append: benefitsAppend,
        remove: benefitsRemove,
    } = useFieldArray({
        control: whyControl,
        name: "benefits.benefits",
    })

    const addReason = () => whyAppend({ description: "" })
    const addBenefits = () => benefitsAppend({ icon: "", description: "" })

    return (
        <>
            <Row className={styles.generalInformations} gutter={[20, 12]}>
                <Col span={20}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Why To Use?
                    </p>
                </Col>
                {whyFields.map(({ id }, index) => (
                    <Col key={id} span={24}>
                        <Row gutter={24}>
                            <Col span={23}>
                                <Input
                                    type={InputTypes.TEXT}
                                    name={`benefits.whyToUse[${index}].description`}
                                    placeholder={
                                        benefitsFormField.whyToUse.placeholder
                                    }
                                />
                            </Col>
                            <Col span={1} className={styles.flexEnd}>
                                <Icon
                                    fill
                                    isSymbol
                                    name={ICON.CLOSE}
                                    onClick={() => whyRemove(index)}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
                <Col span={24}>
                    <p className={styles.addAnotherItems} onClick={addReason}>
                        Add Another Items
                    </p>
                </Col>
            </Row>
            <Row
                className={clsx("mt-5", styles.generalInformations)}
                gutter={[20, 12]}
            >
                <Col span={24}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Ayurvedic Properties
                    </p>
                </Col>
                <Col span={8}>
                    <Dropdown
                        required
                        options={impactOptions}
                        name={benefitsFormField.vata.type.name}
                        label={benefitsFormField.vata.type.label}
                    />
                </Col>
                <Col span={8}>
                    <Dropdown
                        required
                        options={impactOptions}
                        name={benefitsFormField.kapha.type.name}
                        label={benefitsFormField.kapha.type.label}
                    />
                </Col>
                <Col span={8}>
                    <Dropdown
                        required
                        options={impactOptions}
                        name={benefitsFormField.pitta.type.name}
                        label={benefitsFormField.pitta.type.label}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={benefitsFormField.vata.reason.name}
                        label={benefitsFormField.vata.reason.label}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={benefitsFormField.kapha.reason.name}
                        label={benefitsFormField.kapha.reason.label}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={benefitsFormField.pitta.reason.name}
                        label={benefitsFormField.pitta.reason.label}
                    />
                </Col>
            </Row>
            <Row
                className={clsx("mt-5", styles.generalInformations)}
                gutter={[20, 12]}
            >
                <Col span={20}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Benefits
                    </p>
                </Col>
                {benefitsFields.map(({ id }, index) => (
                    <Col key={id} span={24}>
                        <Row gutter={24}>
                            <Col span={5}>
                                <EmojiInput name={`benefits.benefits[${index}].icon`} />
                            </Col>
                            <Col span={18}>
                                <Input
                                    type={InputTypes.TEXT}
                                    name={`benefits.benefits[${index}].description`}
                                    placeholder={
                                        benefitsFormField.benefits.placeholder
                                    }
                                />
                            </Col>
                            <Col span={1} className={styles.flexEnd}>
                                <Icon
                                    fill
                                    isSymbol
                                    name={ICON.CLOSE}
                                    onClick={() => benefitsRemove(index)}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
                <Col span={24}>
                    <p className={styles.addAnotherItems} onClick={addBenefits}>
                        Add Another Items
                    </p>
                </Col>
            </Row>
        </>
    )
}

export default Benefits
