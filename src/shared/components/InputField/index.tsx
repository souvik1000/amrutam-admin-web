import {
    FieldValues,
    useController,
    useFormContext,
    ControllerRenderProps,
} from "react-hook-form"
import React from "react"
import { Input as AntdInput, InputProps as AntdInputProps } from "antd"

import styles from "./inputField.module.scss"

export interface InputProps extends AntdInputProps {
    name?: string
    type: string
    label?: string
    isError?: boolean
    readonly?: boolean
    disabled?: boolean
    isLoading?: boolean
    errorMessage?: string
    customOnChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
        field?: ControllerRenderProps<FieldValues, string>
    ) => void
    isTemporary?: boolean
    tempValue?: string
    tempOnChange?: (value: string) => void
}

const Input = ({
    name,
    type,
    label,
    isError,
    readOnly,
    required,
    disabled,
    isLoading,
    errorMessage,
    customOnChange,
    isTemporary = false,
    tempValue = "",
    tempOnChange,
    ...rest
}: InputProps) => {
    const formContext = useFormContext()
    const { field, fieldState } = !isTemporary && name && formContext ? useController({ name, control: formContext.control }) : { field: undefined, fieldState: undefined }

    const handleOnChange: InputProps["onChange"] = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null
    ) => {
        if (isTemporary && tempOnChange) {
            tempOnChange(event?.target.value || "")
        } else {
            field?.onChange(event)
            customOnChange?.(event, field)
        }
    }

    return (
        <div className={styles[`inputFieldWith${label ? 'Label' : 'OutLabel'}`]}>
            <div className={styles.fieldLabel}>
                {label}
                {required && <span className={styles.requiredField}>*</span>}
            </div>
            <AntdInput
                {...(isTemporary ? {} : field)}
                {...rest}
                type={type}
                autoComplete="off"
                value={isTemporary ? tempValue : field?.value}
                disabled={!!label && disabled}
                readOnly={!!label && readOnly}
                status={!isTemporary && fieldState?.error || isError ? "error" : undefined}
                // suffix={isLoading && <Loader size={LoaderSizes.SMALL} />}
                onChange={handleOnChange}
            />
            {/* <Error name={name} errorMessage={isError ? errorMessage : ""} isError={isError} /> */}
        </div>
    )
}
export default Input
