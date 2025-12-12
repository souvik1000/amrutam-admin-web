import { StatusTypes } from "@/enums/tabTypes"
import ChitakFile from "src/assets/icons/chitrak.svg"
import { IngredientFormValues } from "./ingredientDetails.type"

const { ACTIVE, INACTIVE } = StatusTypes

export const ingredientData: IngredientFormValues = {
  "generalInformation": {
    "ingredientName": "Chitrak",
    "scientificName": "Plumbago zeylanica",
    "sanskritName": "चित्रक",
    "description": "Nestled in the serene foothills of the Himalayas, our Ayurveda Healing Retreat offers a perfect blend of ancient traditions and modern wellness practices. Guests will experience personalized Ayurvedic treatments, guided meditation sessions, and expert-led yoga classes.",
    "imgSrc": ChitakFile
  },
  "benefits": {
    "whyToUse": [
      {description: "Chitrak is valued because it helps lower blood sugar, boosts digestion, and reduces anxiety."},
      {description: "It also protects the skin and speeds up wound healing with its antioxidant and antimicrobial properties."},
      {description: "It is most used in Ayurvedic medicines for indigestion."}
    ],
    "prakritiImpact": {
      "vata": {
        "type": "balanced",
        "reason": "Balanced - none."
      },
      "kapha": {
        "type": "balanced",
        "reason": "Balanced - none."
      },
      "pitta": {
        "type": "unbalanced",
        "reason": "Unbalanced - if taken in excessive amount."
      }
    },
    "benefits": [
      {
        "icon": "🧠",
        "description": "Calms the nervous system and reduces anxiety."
      },
      {
        "icon": "💗",
        "description": "Reduces cholesterol and supports weight loss."
      },
      {
        "icon": "🩸",
        "description": "Manages diabetes by lowering blood sugar levels."
      },
      {
        "icon": "🩹",
        "description": "Beneficial in hemorrhoids of Vata origin."
      }
    ]
  },
  "properties": {
    "ayurvedicProperty": {
      "rasa": "Katu (Pungent)",
      "veerya": "Ushna (Hot)",
      "guna": "Laghu (Light), Ruksha (Dry), Tikshna (Sharp)",
      "vipaka": "Katu (Pungent)"
    },
    "importantFormulation": [
      { "icon": "💊", "description": "Chitrak Haritaki" },
      { "icon": "💊", "description": "Chitrakadi Vati" },
      { "icon": "💊", "description": "Kalyanagulam" },
      { "icon": "💊", "description": "Chitrakadi Churna" }
    ],
    "therapeuticUses": [
      {description: "Agnimandya"},
      {description: "Grahani Rog"},
      {description: "Udara Shula"},
      {description: "Gudasotha"}
    ]
  },
  "others": {
    "plantPartsAndPurpose": [
      {
        "plantPart": "Root",
        "description": "Digestion, skin conditions, manage blood sugar level."
      },
      {
        "plantPart": "Root bark",
        "description": "Manage obesity, support metabolism, and assist in weight loss."
      },
      {
        "plantPart": "Leaves",
        "description": "Used externally for skin conditions and wounds."
      }
    ],
    "bestCombinationWith": "Pippali, Haritakai, Guggulu, Punarnava, Amla, Giloy.",
    "geographicalLocation": "Native to tropical and subtropical regions worldwide, including India and Sri Lanka."
  }
}

export const ingredientStatus = {
  generalInformation: ACTIVE,
  description: ACTIVE,
  why: INACTIVE,
  pakritiImpact: ACTIVE,
  benefits: ACTIVE,
  ayurvedicProperty: ACTIVE,
  importantFormulation: INACTIVE,
  therapeuticUses: ACTIVE,
  plantPartsAndPurpose: ACTIVE,
  bestCombinationWith: ACTIVE,
  geographicalLocation: ACTIVE
}
