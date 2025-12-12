import clsx from "clsx"
import { FC } from "react"
import { Breadcrumb as BreadcrumbComponent } from "antd"

import useRedirect from "@/shared/hooks/useRedirect"

import styles from "./breadcrumb.module.scss"

type ItemsProps = {
    title: string
    href?: string
}

type BreadcrumbProps = {
    items: ItemsProps[]
    separator?: string | React.ReactNode
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items, separator = ">" }) => {
    const itemLength = items.length
    const { dynamicNavigate } = useRedirect()

    const breadcrumbItems = items.map(({ title, href }, index) => {
        const isLastItem = index === itemLength - 1
        const allowRedirection = !isLastItem && !!href && itemLength > 1

        const handleNavigation = () => allowRedirection && dynamicNavigate(href)

        return {
            key: href ?? title,
            title: (
                <div
                    className={clsx(styles.link, {
                        [styles.selectedItems]: itemLength > 1 && isLastItem,
                    })}
                    onClick={handleNavigation}
                >
                    {title}
                </div>
            ),
        }
    })

    return (
        <BreadcrumbComponent
            separator={separator}
            items={breadcrumbItems}
            className={styles.breadcrumb}
        />
    )
}

export default Breadcrumb
