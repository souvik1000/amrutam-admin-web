import { FC } from "react"
import { Select as AntSelect, SelectProps } from "antd"
import { useFormContext, useController } from "react-hook-form"

import Icon from "../Icon"
import { ICON } from "@/enums/icon.enum"

import styles from "./dropdown.module.scss"

type OptionType = { label: string; value: string | number }

export interface DropdownProps extends SelectProps {
    name?: string
    label?: string
    required?: boolean
    options: OptionType[]
    isTemporary?: boolean
    tempValue?: string | number
    tempOnChange?: (val: string) => void
}

const Dropdown: FC<DropdownProps> = ({ name, label, required, options, isTemporary = false, tempValue, tempOnChange, ...rest }) => {
    const formContext = useFormContext()
    const controller = !isTemporary && name && formContext ? useController({ name, control: formContext.control }) : null
    const field = controller?.field

    const handleChange = (val: string) => {
        if (isTemporary && tempOnChange) {
            tempOnChange(val)
        } else {
            field?.onChange(val)
            field?.onBlur()
        }
    }

    return (
        <div
            className={styles[`dropdownFieldWith${label ? "Label" : "OutLabel"}`]}
        >
            <div className={styles.fieldLabel}>
                {label}
                {required && <span className={styles.requiredField}>*</span>}
            </div>
            <AntSelect
                {...rest}
                allowClear={{
                    clearIcon: <Icon fill isSymbol name={ICON.CLOSE} className="closeIcon" />
                }}
                value={(isTemporary ? tempValue : field?.value) || undefined}
                onChange={handleChange}
                options={options}
            />
        </div>
    )
}

export default Dropdown
