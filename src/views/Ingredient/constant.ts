import GiloyFile from "src/assets/icons/giloy.svg";
import KushKushFile from "src/assets/icons/kush-kush.svg";
import BhringrajFile from "src/assets/icons/bhringraj.svg";
import SwarnBhashmFile from "src/assets/icons/swarn-bhasam.svg";
import RaktaChandanFile from "src/assets/icons/rakta-chandan.svg";
import { NavigationRoutes } from "@/routes/routeConstants/appRoutes";

const { INGREDIENTS, INGREDIENT_DETAILS } = NavigationRoutes;

export const ingredientBreadcrumbs = [
  { title: 'Ingredients', href: INGREDIENTS }
];

export const ingredientFormBreadcrumbs = [
  { title: 'Ingredients', href: INGREDIENTS },
  { title: 'Add Ingredient', href: INGREDIENTS },
];

export const ingredientDetailsBreadcrumbs = [
  { title: 'Ingredients', href: INGREDIENTS },
  { title: 'Ingredient Details', href: INGREDIENT_DETAILS },
];

export const ingredientsData = [
  {
    iconSrc: KushKushFile,
    name: "Khus Khus",
    description:
      "A versatile herb that enhances fertility and aids in treating insomnia. It has a calming effect on the nervous system.",
    status: "active",
  },
  {
    iconSrc: RaktaChandanFile,
    name: "Rakta Chandan",
    description:
      "Also known as Red Sandalwood, this herb is prized for its skin-enhancing properties and soothing effects.",
    status: "active",
  },
  {
    iconSrc: SwarnBhashmFile,
    name: "Swarn Bhashm",
    description:
      "A metallic preparation in Ayurveda, believed to enhance stamina, strength, and overall vitality.",
    status: "active",
  },
  {
    iconSrc: GiloyFile,
    name: "Giloy",
    description:
      "A powerful immunomodulator that boosts overall immunity and supports digestion and metabolic health.",
    status: "active",
  },
  {
    iconSrc: BhringrajFile,
    name: "Bhringraj",
    description:
      "Known as the 'King of Hair', this herb is renowned for preventing hair loss and supporting scalp health.",
    status: "active",
  },
  {
    iconSrc: KushKushFile,
    name: "Khus Khus",
    description:
      "A versatile herb that enhances fertility and aids in treating insomnia. It has a calming effect on the nervous system.",
    status: "active",
  },
  {
    iconSrc: RaktaChandanFile,
    name: "Rakta Chandan",
    description:
      "Also known as Red Sandalwood, this herb is prized for its skin-enhancing properties and soothing effects.",
    status: "active",
  },
  {
    iconSrc: SwarnBhashmFile,
    name: "Swarn Bhashm",
    description:
      "A metallic preparation in Ayurveda, believed to enhance stamina, strength, and overall vitality.",
    status: "active",
  },
  {
    iconSrc: GiloyFile,
    name: "Giloy",
    description:
      "A powerful immunomodulator that boosts overall immunity and supports digestion and metabolic health.",
    status: "active",
  },
  {
    iconSrc: BhringrajFile,
    name: "Bhringraj",
    description:
      "Known as the 'King of Hair', this herb is renowned for preventing hair loss and supporting scalp health.",
    status: "active",
  },
];
