import { Popover } from "antd"
import { FC, useState } from "react"

import { ICON } from "@/enums/icon.enum"
import { StatusTypes } from "@/enums/tabTypes"
import ActiveFile from "@/assets/icons/active.svg"
import useRedirect from "@/shared/hooks/useRedirect"
import InActiveFile from "@/assets/icons/inactive.svg"
import ButtonIcon from "@/shared/components/ButtonIcon"
import { stringTitleCase } from "@/shared/utils/strings"
import { IngredientStepperHash } from "@/enums/hashNotes"

import styles from "./detailsSection.module.scss"

type DetailsSectionProps = {
    title: string
    status: string
    overview?: boolean
    children?: React.ReactNode
    hash?: IngredientStepperHash
}

const { ACTIVE, INACTIVE } = StatusTypes

const DetailsSection: FC<DetailsSectionProps> = ({
    hash,
    title,
    status,
    children,
    overview
}) => {
    const { replaceLocationInfo, navigateToAddIngredient } = useRedirect();
    const [currentStatus, setCurrentStatus] = useState(status)

    const isActive = currentStatus === ACTIVE
    const inverseStatus = isActive ? INACTIVE : ACTIVE

    const toggleStatus = () =>
        setCurrentStatus((prevStatus) =>
            prevStatus === ACTIVE ? INACTIVE : ACTIVE
        )
    
    const redirectToStep = () => {
        console.log("Coming")
        overview && replaceLocationInfo(hash)
    }

    const editHandler = () => {
        navigateToAddIngredient(hash)
    }

    const menu = (
        <div className={styles.menu}>
            <div className={styles.editActn} onClick={editHandler}>Edit</div>
            <div className="popup-border" />
            <div
                className={styles[`status-${inverseStatus}`]}
                onClick={toggleStatus}
            >
                {stringTitleCase(inverseStatus)}
            </div>
        </div>
    )

    return (
        <div className={styles.detailsCard}>
            <div className={styles.detailsCardHeader}>
                <div className={styles.headerLeft}>
                    <p className={styles.title}>{title}</p>
                    {
                        overview
                        ? <></>
                        : <img
                            src={isActive ? ActiveFile : InActiveFile}
                            alt="Image Status"
                        />
                    }
                </div>
                {
                    overview
                    ? <ButtonIcon iconName={ICON.REDIRECT} onClick={redirectToStep} />
                    : <Popover
                        trigger="click"
                        content={menu}
                        autoAdjustOverflow
                        placement="bottomRight"
                        classNames={{ root: styles.popoverMenu }}
                    >
                        <div><ButtonIcon iconName={ICON.MENU} /></div>
                    </Popover>
                }
            </div>
            <div className="mt-3">{children}</div>
        </div>
    )
}

export default DetailsSection
