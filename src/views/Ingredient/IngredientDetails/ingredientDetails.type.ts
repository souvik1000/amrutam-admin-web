export type PrakritiImpactItem = {
  type: "balanced" | "unbalanced" | string;
  reason: string;
};

export type PrakritiImpact = {
  vata: PrakritiImpactItem;
  kapha: PrakritiImpactItem;
  pitta: PrakritiImpactItem;
};

export type OnlyDescription = {
  description: string;
}

export type EmojiDescription = {
  icon: string;
  description: string;
};

export type GeneralInformation = {
  ingredientName: string;
  scientificName: string;
  sanskritName: string;
  description: string;
  imgSrc: string;
};

export type BenefitsSection = {
  whyToUse: OnlyDescription[];
  prakritiImpact: PrakritiImpact;
  benefits: EmojiDescription[];
};

export type AyurvedicProperty = {
  rasa: string;
  veerya: string;
  guna: string;
  vipaka: string;
};

export type PropertiesSection = {
  ayurvedicProperty: AyurvedicProperty;
  importantFormulation: EmojiDescription[];
  therapeuticUses: OnlyDescription[];
};

export type PlantPartPurpose = {
  plantPart: string;
  description: string;
}[];

export type OthersSection = {
  plantPartsAndPurpose: PlantPartPurpose;
  bestCombinationWith: string;
  geographicalLocation: string;
};

export type IngredientFormValues = {
  generalInformation: GeneralInformation;
  benefits: BenefitsSection;
  properties: PropertiesSection;
  others: OthersSection;
};
