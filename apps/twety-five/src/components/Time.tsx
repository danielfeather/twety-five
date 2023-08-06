import { FC, useEffect, useRef } from 'react'

interface TimeProps {
    from: Date
    until: Date
    onComplete?: () => void
}

const Time: FC<TimeProps> = ({ from, until, onComplete }) => {

    const progress = useRef<HTMLProgressElement>(null)

    useEffect(() => {

        window.requestAnimationFrame(step)

    }, [from, until])

    let previous: number | undefined
    let done = false

    function step(timestamp: number) {

        if (previous === undefined) {
            previous = timestamp
        }

        if (timestamp - previous > 50) {
            const range = until.getTime() - from.getTime()
            const current = until.getTime() - Date.now()
            const remaining = current / range * 100

            if (progress.current) {
                progress.current.value = remaining
            }
            previous = timestamp
        }

        if (Date.now() > until.getTime()) {
            if (progress.current) {
                progress.current.value = 0
            }
            done = true
            if (onComplete) {
                onComplete()
            }
        }

        if (!done) {
            window.requestAnimationFrame(step)
        }
    }

    return (
        <progress className="w-full" max={100} ref={progress}></progress>
    )
}

export default Time