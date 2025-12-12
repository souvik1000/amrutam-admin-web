import { FC } from "react"
import { Col, Row } from "antd"

import Input from "@/shared/components/InputField"
import { InputTypes } from "@/enums/antComponentTypes"
import ImageUpload from "@/shared/components/ImageUpload"
import { generalInfoFormField, placeholder } from "../constant"
import { ingredientData } from "../../IngredientDetails/constant"

import styles from "../ingredientForm.module.scss"

type GeneralInfoProps = {
    generalInformation?: (typeof ingredientData)["generalInformation"]
}

const GeneralInfo: FC<GeneralInfoProps> = ({ generalInformation }) => {
    return (
        <Row className={styles.generalInformations} gutter={[20, 24]}>
            <Col span={24}>
                <p className={styles.formItemTitle}>General Information</p>
            </Col>
            <Col span={8}>
                <Input
                    required
                    type={InputTypes.TEXT}
                    placeholder={placeholder}
                    name={generalInfoFormField.ingredientName.name}
                    label={generalInfoFormField.ingredientName.label}
                />
            </Col>
            <Col span={8}>
                <Input
                    required
                    type={InputTypes.TEXT}
                    placeholder={placeholder}
                    name={generalInfoFormField.scientificName.name}
                    label={generalInfoFormField.scientificName.label}
                />
            </Col>
            <Col span={8}>
                <Input
                    required
                    type={InputTypes.TEXT}
                    placeholder={placeholder}
                    name={generalInfoFormField.sanskritName.name}
                    label={generalInfoFormField.sanskritName.label}
                />
            </Col>
            <Col span={24}>
                <Input
                    required
                    type={InputTypes.TEXT}
                    placeholder={placeholder}
                    name={generalInfoFormField.description.name}
                    label={generalInfoFormField.description.label}
                />
            </Col>
            <Col span={24}>
                <ImageUpload
                    name={generalInfoFormField.imgSrc.name}
                    label={generalInfoFormField.imgSrc.label}
                />
            </Col>
        </Row>
    )
}

export default GeneralInfo
