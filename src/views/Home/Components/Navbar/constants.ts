import { ICON } from "@/enums/icon.enum"
import { MenuTabs } from "@/enums/tabTypes"
import { NavigationRoutes } from "@/routes/routeConstants/appRoutes"

export const navbarIcons = [
    {
        name: MenuTabs.DASHBOARD,
        icon: ICON.DASHBOARD,
        path: NavigationRoutes.DASHBOARD,
    },
    { name: MenuTabs.DOCTOR, icon: ICON.DOCTOR, path: NavigationRoutes.DOCTOR },
    {
        name: MenuTabs.PATIENTS,
        icon: ICON.PATIENTS,
        path: NavigationRoutes.PATIENTS,
    },
    {
        name: MenuTabs.APPOINTMENT,
        icon: ICON.APPOINTMENT,
        path: NavigationRoutes.APPOINTMENT,
    },
    {
        name: MenuTabs.SPECIALTIES,
        icon: ICON.SPECIALTIES,
        path: NavigationRoutes.SPECIALTIES,
    },
    {
        name: MenuTabs.INGREDIENTS,
        icon: ICON.INGREDIENTS,
        path: NavigationRoutes.INGREDIENTS,
        children: [
            {
                name: "ingredientsList",
                label: "Ingredients List",
                path: NavigationRoutes.INGREDIENTS,
            },
            {
                name: "addIngredients",
                label: "Add Ingredient",
                path: NavigationRoutes.ADD_INGREDIENTS,
            },
        ],
    },
    {
        name: MenuTabs.COUPONS,
        icon: ICON.COUPONS,
        path: NavigationRoutes.COUPONS,
    },
    {
        name: MenuTabs.CONCERNS,
        icon: ICON.CONCERNS,
        path: NavigationRoutes.CONCERNS,
    },
    {
        name: MenuTabs.REFERRAL,
        icon: ICON.REFERRAL,
        path: NavigationRoutes.REFERRAL,
    },
    {
        name: MenuTabs.CUSTOMIZATIONS,
        icon: ICON.CUSTOMIZATIONS,
        path: NavigationRoutes.CUSTOMIZATIONS,
    },
    { name: MenuTabs.WALLET, icon: ICON.WALLET, path: NavigationRoutes.WALLET },
    { name: MenuTabs.REFUND, icon: ICON.REFUND, path: NavigationRoutes.REFUND },
]

export const moduleList = {
    dashboard: "Dashboard",
    doctor: "Doctor",
    patients: "Patients",
    appointment: "Appointment",
    specialties: "Specialties",
    ingredients: "Ingredients",
    ingredientsList: "Ingredients List",
    addIngredients: "Add Ingredients",
    coupons: "Coupons",
    concerns: "Concerns",
    referral: "Referral",
    customizations: "Customizations",
    wallet: "Wallet",
    refund: "Refund",
}
