import { Button, Popover } from "antd"
import { useState, useEffect } from "react"
import { useController, useFormContext } from "react-hook-form"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"

import Icon from "../Icon"
import { ICON } from "@/enums/icon.enum"

import styles from "./emojiPicker.module.scss"

type EmojiInputProps = {
    name: string
}

const EmojiInput = ({ name }: EmojiInputProps) => {
    const { control } = useFormContext()
    const { field } = useController({ name, control })

    const [open, setOpen] = useState(false)
    const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(
        field.value
    )

    useEffect(() => {
        if (field.value !== selectedEmoji) setSelectedEmoji(field.value)
    }, [field.value])

    const handleSelect = (emojiData: EmojiClickData) => {
        const emoji = emojiData.emoji
        field.onChange(emoji)
        setSelectedEmoji(emoji)
        setOpen(false)
    }

    return (
        <Popover
            open={open}
            trigger="click"
            onOpenChange={(visible) => setOpen(visible)}
            content={<EmojiPicker onEmojiClick={handleSelect} />}
        >
            <div className={styles.emojiWrapper} onClick={() => setOpen(true)}>
                {selectedEmoji ? (
                    <span className={styles.selectedEmoji}>
                        {selectedEmoji}
                    </span>
                ) : (
                    <>
                        <Icon isSymbol name={ICON.SATISFIED} />
                        <p>Add Emoji</p>
                    </>
                )}
            </div>
        </Popover>
    )
}

export default EmojiInput
