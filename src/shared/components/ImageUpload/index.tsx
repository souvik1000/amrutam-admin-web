import React from "react"
import { Upload } from "antd"
import type { UploadProps } from "antd"
import { useFormContext, useController } from "react-hook-form"

import Icon from "../Icon"
import { ICON } from "@/enums/icon.enum"
import { toBase64 } from "@/shared/utils/strings"

import styles from "./imageUpload.module.scss"

type ImageUploadProps = {
    name: string
    label: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name, label }) => {
    const { control } = useFormContext()
    const { field } = useController({ name, control })

    const handleBeforeUpload: UploadProps["beforeUpload"] = async (file) => {
        const url = await toBase64(file)
        field.onChange(url)
        return false
    }

    const handleRemove = () => {
        try {
            const current = field.value
            if (typeof current === "string" && current.startsWith("blob:")) {
                try {
                    URL.revokeObjectURL(current)
                } catch {}
            }
            field.onChange("")
        } catch (err) {
        }
    }

    return (
        <div className={styles.uploadWrapper}>
            {!field.value && (
                <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                >
                    <div className={styles.uploadComponent}>
                        <Icon isSymbol name={ICON.IMAGE} />
                        <p>{label}</p>
                    </div>
                </Upload>
            )}
            {field.value && (
                <>
                    <Icon
                        className={styles.retakeImage}
                        isSymbol
                        name={ICON.CLOSE}
                        onClick={handleRemove}
                    />
                    <img
                        src={field.value}
                        alt="upload image preview"
                        className={styles.uploadedImage}
                    />
                </>
            )}
        </div>
    )
}

export default ImageUpload
