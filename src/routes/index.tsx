import { lazy } from "react"
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom"

import LazyLoad from "@/shared/components/LazyLoad"
import { AppRoutes } from "./routeConstants/appRoutes"

const Home = lazy(() => import("@/views/Home"))
const Ingredients = lazy(() => import("@/views/Ingredient"))
const PageNotFound = lazy(() => import("@/shared/components/PageNotFound"))
const IngredientForm = lazy(() => import("@/views/Ingredient/IngredientForm"))
const IngredientDetails = lazy(() => import("@/views/Ingredient/IngredientDetails"))

interface RouteProps {
    element: React.ReactNode
    path?: string
    children?: RouteProps[]
}
const renderRoutes = (routes: RouteProps[], parentPath = "") => {
    return routes.map(({ path, element, children }, index) => {
        const uniqueKey = `${parentPath}-${index}`
        return (
            <Route key={uniqueKey} path={path} element={<LazyLoad>{element}</LazyLoad>}>
                {children && renderRoutes(children, uniqueKey)}
            </Route>
        )
    })
}
const AppRouter = () => {
    let routes: RouteProps[] = [
        {
            path: AppRoutes.BASE,
            element: <Outlet />,
            children: [
                {
                    path: AppRoutes.HOME,
                    element: <Home />,
                    children: [
                        {
                            path: AppRoutes.DASHBOARD,
                            element: <PageNotFound />,
                        },
                        { path: AppRoutes.DOCTOR, element: <PageNotFound /> },
                        { path: AppRoutes.PATIENTS, element: <PageNotFound /> },
                        {
                            path: AppRoutes.APPOINTMENT,
                            element: <PageNotFound />,
                        },
                        {
                            path: AppRoutes.SPECIALTIES,
                            element: <PageNotFound />,
                        },
                        {
                            path: AppRoutes.INGREDIENTS,
                            element: <Ingredients />,
                        },
                        {
                            path: AppRoutes.INGREDIENT_DETAILS,
                            element: <IngredientDetails />,
                        },
                        {
                            path: AppRoutes.ADD_INGREDIENTS,
                            element: <IngredientForm />,
                        },
                        { path: AppRoutes.COUPONS, element: <PageNotFound /> },
                        { path: AppRoutes.CONCERNS, element: <PageNotFound /> },
                        { path: AppRoutes.REFERRAL, element: <PageNotFound /> },
                        {
                            path: AppRoutes.CUSTOMIZATIONS,
                            element: <PageNotFound />,
                        },
                        { path: AppRoutes.WALLET, element: <PageNotFound /> },
                        { path: AppRoutes.REFUND, element: <PageNotFound /> },
                        // catch-all for any other unknown nested route under "/"
                        { path: "*", element: <PageNotFound /> },
                    ],
                },
            ],
        },
    ]

    return (
        <div>
            <BrowserRouter>
                <Routes>{renderRoutes(routes)}</Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter
