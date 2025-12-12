import { FC } from "react"

import {
    getWhyToUseList,
    getPlantPartList,
    getPakritiImpactList,
    getTherapeuticUsesList,
    getAyurvedicPropertyList,
} from "./helpers"
import { ingredientStatus } from "./constant"
import DetailsSection from "./Components/DetailsSection"
import { stringTitleCase } from "@/shared/utils/strings"
import { IngredientStepperHash } from "@/enums/hashNotes"
import PointerItems from "@/shared/components/PointerItems"
import { IngredientFormValues } from "./ingredientDetails.type"

import styles from "./ingredientDetails.module.scss"

type IngredientDetailSectionsProps = {
    ingredientData: IngredientFormValues
    overview?: boolean
}

const { GENERAL_INFORMATION, BENEFITS, PROPERTIES, OTHERS } = IngredientStepperHash;

const IngredientDetailSections: FC<IngredientDetailSectionsProps> = ({
    ingredientData,
    overview = false,
}) => {
    const { generalInformation, benefits, properties, others } = ingredientData
    const { ingredientName, description, sanskritName, scientificName, imgSrc } =
        generalInformation
    const { whyToUse, prakritiImpact, benefits: ingredientBenefits } = benefits
    const { ayurvedicProperty, importantFormulation, therapeuticUses } =
        properties
    const { bestCombinationWith, geographicalLocation, plantPartsAndPurpose } =
        others

    const ingredientFullName = `${ingredientName} - ${scientificName} (Sanskit - ${sanskritName})`

    return (
        <div className={styles.ingredientDetailSections}>
            <DetailsSection
                overview={overview}
                hash={GENERAL_INFORMATION}
                title="General information"
                status={ingredientStatus.generalInformation}
            >
                <div className={styles.ingredientImg}>
                    <img src={imgSrc} alt="Citrak Image" />
                </div>
                <p className={styles.ingredientName}>{ingredientFullName}</p>
            </DetailsSection>

            <DetailsSection
                hash={GENERAL_INFORMATION}
                overview={overview}
                title="Description"
                status={ingredientStatus.description}
            >
                <p className={styles.ingredientDesc}>{description}</p>
            </DetailsSection>

            <DetailsSection
                hash={BENEFITS}
                overview={overview}
                status={ingredientStatus.why}
                title={`Why ${stringTitleCase(ingredientName)}?`}
            >
                <PointerItems textItems={getWhyToUseList(whyToUse)} />
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={BENEFITS}
                overview={overview}
                title="Pakriti Impact"
                status={ingredientStatus.pakritiImpact}
            >
                <PointerItems
                    textItems={getPakritiImpactList(prakritiImpact)}
                />
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={BENEFITS}
                title="Benefits"
                overview={overview}
                status={ingredientStatus.benefits}
            >
                <PointerItems customItems={ingredientBenefits} />
            </DetailsSection>

            <DetailsSection
                hash={PROPERTIES}
                overview={overview}
                title="Ayurvedic Properties"
                status={ingredientStatus.ayurvedicProperty}
            >
                <PointerItems
                    textItems={getAyurvedicPropertyList(ayurvedicProperty)}
                />
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={PROPERTIES}
                overview={overview}
                title="Important formulations"
                status={ingredientStatus.importantFormulation}
            >
                <PointerItems customItems={importantFormulation} />
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={PROPERTIES}
                overview={overview}
                title="Therapeutic uses"
                status={ingredientStatus.therapeuticUses}
            >
                <PointerItems textItems={getTherapeuticUsesList(therapeuticUses)} />
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={OTHERS}
                overview={overview}
                title="Plant parts and its purpose"
                status={ingredientStatus.plantPartsAndPurpose}
            >
                <PointerItems
                    textItems={getPlantPartList(plantPartsAndPurpose)}
                />
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={OTHERS}
                overview={overview}
                title="Best combined with"
                status={ingredientStatus.bestCombinationWith}
            >
                <p className={styles.sectionDescription}>
                    {bestCombinationWith}
                </p>
            </DetailsSection>
            <div className="border" />

            <DetailsSection
                hash={OTHERS}
                overview={overview}
                title="Geographical locations"
                status={ingredientStatus.geographicalLocation}
            >
                <p className={styles.sectionDescription}>
                    {geographicalLocation}
                </p>
            </DetailsSection>
        </div>
    )
}

export default IngredientDetailSections
