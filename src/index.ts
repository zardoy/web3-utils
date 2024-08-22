export const clampAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

export const formatWei = x => (x * 10 ** 18) as any
export const formatEth = x => x / 10 ** 18

export const formatNumber = (value: string | number | undefined, digits = 2) => {
    if (!value) return '-'
    try {
        const number = Number(value)
        if (isNaN(number)) return '-'
        return Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: digits,
        }).format(number)
    } catch {
        return '-'
    }
}

export function assertDefined<T>(value: T | undefined, thing: string): asserts value is T {
    if (value === undefined || value === null) {
        throw new Error(`Expected '${thing}' to be defined, but received ${value as any}`)
    }
}

export const getTimeAgo = (time: string) => {
    const date = new Date(time.includes('Z') ? time : time+'Z')
    const localDate = new Date(date.toLocaleString())
    const seconds = Math.floor((Date.now() - localDate.getTime()) / 1000)
    let interval = Math.floor(seconds / 31_536_000)

    if (interval > 1) {
        return `${interval} years ago`
    }

    interval = Math.floor(seconds / 2_592_000)
    if (interval > 1) {
        return `${interval} months ago`
    }

    interval = Math.floor(seconds / 86_400)
    if (interval > 1) {
        return `${interval} days ago`
    }

    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
        return `${interval} hours ago`
    }

    interval = Math.floor(seconds / 60)
    if (interval > 1) {
        return `${interval} minutes ago`
    }

    return `${Math.floor(seconds)} seconds ago`
}
