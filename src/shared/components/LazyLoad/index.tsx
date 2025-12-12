import { FC, ReactNode, Suspense } from "react";

import Loader from "../Loader";

type LazyLoadProps = {
    children?: ReactNode
}

const LazyLoad: FC<LazyLoadProps> = ({
    children
}) => {
    return (
        <Suspense fallback={<Loader />}>{children}</Suspense>
    )
}

export default LazyLoad;