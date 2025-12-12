import clsx from "clsx"
import { Col, Row } from "antd"
import { useFieldArray, useFormContext } from "react-hook-form"

import { ICON } from "@/enums/icon.enum"
import Icon from "@/shared/components/Icon"
import { propertiesFormField } from "../constant"
import Input from "@/shared/components/InputField"
import { InputTypes } from "@/enums/antComponentTypes"
import EmojiInput from "@/shared/components/EmojiPicker"
import { IngredientFormValues } from "../../IngredientDetails/ingredientDetails.type"

import styles from "../ingredientForm.module.scss"

const Properties = () => {
    const { control } = useFormContext<IngredientFormValues>()

    const {
        fields: impFormationFields,
        append: impFormationAppend,
        remove: impFormationRemove,
    } = useFieldArray({
        control,
        name: "properties.importantFormulation",
    })
    const {
        fields: useageFields,
        append: useageAppend,
        remove: useageRemove,
    } = useFieldArray({
        control,
        name: "properties.therapeuticUses",
    })

    const addItem = () =>
        impFormationAppend({ icon: "", description: "" })

    const addTheraputicUseageItem = () =>
        useageAppend({ description: "" })

    return (
        <>
            <Row className={styles.generalInformations} gutter={[20, 12]}>
                <Col span={24}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Ayurvedic Properties
                    </p>
                </Col>
                <Col span={12}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={propertiesFormField.rasa.name}
                        label={propertiesFormField.rasa.label}
                    />
                </Col>
                <Col span={12}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={propertiesFormField.veerya.name}
                        label={propertiesFormField.veerya.label}
                    />
                </Col>
                <Col span={12}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={propertiesFormField.guna.name}
                        label={propertiesFormField.guna.label}
                    />
                </Col>
                <Col span={12}>
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={propertiesFormField.vipaka.name}
                        label={propertiesFormField.vipaka.label}
                    />
                </Col>
            </Row>
            <Row
                className={clsx("mt-5", styles.generalInformations)}
                gutter={[20, 12]}
            >
                <Col span={20}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Important formulations
                    </p>
                </Col>
                {impFormationFields.map(({ id }, index) => (
                    <Col key={id} span={24}>
                        <Row gutter={24}>
                            <Col span={5}>
                                <EmojiInput name={`properties.importantFormulation[${index}].icon`} />
                            </Col>
                            <Col span={18}>
                                <Input
                                    type={InputTypes.TEXT}
                                    name={`properties.importantFormulation[${index}].description`}
                                    placeholder={
                                        propertiesFormField.importantFormulation
                                            .placeholder
                                    }
                                />
                            </Col>
                            <Col span={1} className={styles.flexEnd}>
                                <Icon
                                    fill
                                    isSymbol
                                    name={ICON.CLOSE}
                                    onClick={() => impFormationRemove(index)}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
                <Col span={24}>
                    <p className={styles.addAnotherItems} onClick={addItem}>
                        Add Another Items
                    </p>
                </Col>
            </Row>
            <Row
                className={clsx("mt-5", styles.generalInformations)}
                gutter={[20, 12]}
            >
                <Col span={20}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Therapeutic Uses
                    </p>
                </Col>
                {useageFields.map(({ id }, index) => (
                    <Col key={id} span={24}>
                        <Row gutter={24}>
                            <Col span={23}>
                                <Input
                                    type={InputTypes.TEXT}
                                    name={`properties.therapeuticUses[${index}].description`}
                                    placeholder={
                                        propertiesFormField.therapeuticUses
                                            .placeholder
                                    }
                                />
                            </Col>
                            <Col span={1} className={styles.flexEnd}>
                                <Icon
                                    fill
                                    isSymbol
                                    name={ICON.CLOSE}
                                    onClick={() => useageRemove(index)}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
                <Col span={24}>
                    <p className={styles.addAnotherItems} onClick={addTheraputicUseageItem}>
                        Add Another Items
                    </p>
                </Col>
            </Row>
        </>
    )
}

export default Properties
