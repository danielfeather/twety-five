import {FC, PropsWithChildren, useRef} from 'react'
import {Dialog} from '@headlessui/react'
import Button, {Style} from "./Button";

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

const Alert: FC<PropsWithChildren<AlertProps>> = ({ severity, children, onConfirm, onDeny }) => {

    const classes = {
        [Severity.CRITICAL]: "",
        [Severity.WARNING]: "",
        [Severity.INFO]: ""
    }

    const cancelButtonRef = useRef(null)

    return (
        <Dialog as="div" className={"absolute inset-0"} initialFocus={cancelButtonRef} open={true} onClose={() => void(0)}>
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            !
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button variant={Style.DEFAULT} onClick={onConfirm}>Confirm</Button>
                    <Button variant={Style.DANGER} ref={cancelButtonRef} onClick={onDeny}>Cancel</Button>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}

export default Alert