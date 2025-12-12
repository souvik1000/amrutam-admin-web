import { stringTitleCase } from "@/shared/utils/strings";
import { AyurvedicProperty, OnlyDescription, PlantPartPurpose, PrakritiImpact } from "./ingredientDetails.type";

export const getPakritiImpactList = (impacts: PrakritiImpact) => {
    const impactsList = []

    for(let [name, { type, reason }] of Object.entries(impacts)) {
        impactsList.push(`${stringTitleCase(name)} - ${type} - ${reason}`)
    }

    return impactsList;
}

export const getAyurvedicPropertyList = (ayurvedicProperty: AyurvedicProperty) => {
    const ayurvedicPropertyList = []

    for(let [type, desc] of Object.entries(ayurvedicProperty)) {
        ayurvedicPropertyList.push(`${stringTitleCase(type)} - ${desc}`)
    }

    return ayurvedicPropertyList;
}

export const getPlantPartList = (plantParts: PlantPartPurpose) => {
    const plantPartList = []

    for(let [, { plantPart, description }] of Object.entries(plantParts)) {
        plantPartList.push(`${stringTitleCase(plantPart)} - ${description}`)
    }

    return plantPartList;
}

export const getWhyToUseList = (whyToUse: OnlyDescription[]) => {
    const whyToUseList = []

    for(let [, { description }] of Object.entries(whyToUse)) {
        whyToUseList.push(description)
    }

    return whyToUseList;
}

export const getTherapeuticUsesList = (therapeuticUses: OnlyDescription[]) => {
    const therapeuticUsesList = []

    for(let [, { description }] of Object.entries(therapeuticUses)) {
        therapeuticUsesList.push(description)
    }

    return therapeuticUsesList;
}
