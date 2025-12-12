import * as Yup from "yup";

const generalInformationStepSchema = Yup.object({
  generalInformation: Yup.object({
    ingredientName: Yup.string().required("Required"),
    scientificName: Yup.string().required("Required"),
    sanskritName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    imgSrc: Yup.string(),
  }).required(),
});

const benefitsStepSchema = Yup.object({
  benefits: Yup.object({
    whyToUse: Yup.array()
      .of(
        Yup.object({
          description: Yup.string().required("Required"),
        })
      )
      // .min(1, "At least one reason is required")
      .required(),
    prakritiImpact: Yup.object({
      vata: Yup.object({
          type: Yup.string().required("Required"),
          reason: Yup.string().required("Required")
      }).required(),
      kapha: Yup.object({
          type: Yup.string().required("Required"),
          reason: Yup.string().required("Required")
      }).required(),
      pitta: Yup.object({
          type: Yup.string().required("Required"),
          reason: Yup.string().required("Required")
      }).required(),
    }).required(),
    benefits: Yup.array()
      .of(
        Yup.object({
          icon: Yup.string().optional(),
          description: Yup.string().required("Required"),
        })
      )
      // .min(1, "At least one benefit is required")
      .required(),
  }).required(),
});

const propertiesStepSchema = Yup.object({
  properties: Yup.object({
    ayurvedicProperty: Yup.object({
      rasa: Yup.string().required("Required"),
      guna: Yup.string().required("Required"),
      veerya: Yup.string().required("Required"),
      vipaka: Yup.string().required("Required"),
    }).required(),
    importantFormulation: Yup.array()
      .of(
        Yup.object({
          icon: Yup.string().optional(),
          description: Yup.string().required("Required"),
        })
      )
      // .min(1, "At least one formulation is required")
      .required(),
    therapeuticUses: Yup.array()
      .of(
        Yup.object({
          description: Yup.string().required("Required"),
        })
      )
      // .min(1, "At least one uses is required")
      .required(),
  })
});

const othersStepSchema = Yup.object({
  others: Yup.object({
    plantPartsAndPurpose: Yup.array()
      .of(
        Yup.object({
          plantPart: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
        })
      )
      // .min(1, "At least one parts & purpose is required")
      .required(),
      bestCombinationWith: Yup.string().required("Required"),
      geographicalLocation: Yup.string().required("Required")
  })
});

export const stepSchemas: Record<string, Yup.ObjectSchema<any>> = {
  generalInfomation: generalInformationStepSchema,
  benefits: benefitsStepSchema,
  properties: propertiesStepSchema,
  others: othersStepSchema,
  overview: Yup.object({}),
};
