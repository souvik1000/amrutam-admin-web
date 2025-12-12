import { REGEX } from "@/enums/regex"

export const capitalizeString = (str?: string) =>
    str ? `${str[0].toUpperCase()}${str.slice(1)}` : ""

export const stringTitleCase = (str?: string, formatter = " ") =>
    str
        ? str
              .split(REGEX.stringSplit)
              .map((str) => capitalizeString(str))
              .join(formatter)
        : ""

export const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
