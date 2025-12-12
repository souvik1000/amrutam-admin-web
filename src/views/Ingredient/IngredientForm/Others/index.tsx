import clsx from "clsx";
import { Col, Row } from "antd";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { ICON } from "@/enums/icon.enum";
import PlantPartsTable from "./PlantPartsTable";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/InputField";
import Dropdown from "@/shared/components/Dropdown";
import { InputTypes } from "@/enums/antComponentTypes";
import ButtonIcon from "@/shared/components/ButtonIcon";
import { IngredientFormValues } from "../../IngredientDetails/ingredientDetails.type";
import { dropdownPlaceholder, othersFormField, placeholder, plantPartOptions } from "../constant";

import styles from "../ingredientForm.module.scss"

const Others = () => {
    const { control, getValues } = useFormContext<IngredientFormValues>();
    const [plantPartInput, setPlantPartInput] = useState({ plantPart: "", description: "" });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "others.plantPartsAndPurpose",
    });

    const addPlantPart = () => {
        if (plantPartInput.plantPart.trim() && plantPartInput.description.trim()) {
            append(plantPartInput);
            setPlantPartInput({ plantPart: "", description: "" });
        }
    }

    const removePlantPartInfo = () => {
        const lastInfoIndex = fields.length - 1;
        const { plantPart, description } = getValues("others.plantPartsAndPurpose")[lastInfoIndex];

        setPlantPartInput({ plantPart, description })
        remove(fields.length - 1);
    }

    return (
        <>
            <Row
                className={styles.othersForm}
                gutter={[20, 12]}
            >
                <Col span={24}>
                    <p className={clsx("mb-5", styles.formItemTitle)}>
                        Plant parts and its purpose
                    </p>
                </Col>
                <Col span={8}>
                    <Dropdown
                        isTemporary
                        allowClear
                        label="Plant Part"
                        placeholder={dropdownPlaceholder}
                        options={plantPartOptions}
                        tempValue={plantPartInput.plantPart}
                        tempOnChange={(value) => setPlantPartInput({ ...plantPartInput, plantPart: value })}
                    />
                </Col>
                <Col span={16}>
                    <Input
                        required
                        isTemporary
                        label="Description"
                        type={InputTypes.TEXT}
                        placeholder={placeholder}
                        tempValue={plantPartInput.description}
                        tempOnChange={(value) => setPlantPartInput({ ...plantPartInput, description: value })}
                    />
                </Col>
                <Col span={24}>
                    <div className={styles.atnBtn}>
                        <Button type="primary" name="Add" iconName={ICON.ADD} onClick={addPlantPart} />
                        <ButtonIcon iconName={ICON.CLOSE} onClick={removePlantPartInfo} />
                    </div>
                </Col>
                {
                    !!fields.length &&
                    <Col span={24}>
                        <PlantPartsTable plantParts={fields} />
                    </Col>
                }
                <Col span={24} className="mt-5">
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={othersFormField.bestCombinationWith.name}
                        label={othersFormField.bestCombinationWith.label}
                    />
                </Col>
                <Col span={24} className="mt-5">
                    <Input
                        required
                        type={InputTypes.TEXT}
                        name={othersFormField.geographicalLocation.name}
                        label={othersFormField.geographicalLocation.label}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Others;