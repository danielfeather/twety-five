import {FC, PropsWithChildren} from 'react'

export enum Severity {
    CRITICAL,
    WARNING,
    INFO
}

interface AlertProps {
    severity: Severity
    onConfirm?: () => void
    onDeny?: () => void
}

const Alert: FC<PropsWithChildren<AlertProps>> = ({ severity, children }) => {

    const classes = {
        [Severity.CRITICAL]: "",
        [Severity.WARNING]: "",
        [Severity.INFO]: ""
    }

    return (
        <div></div>
    )
}

export default Alert