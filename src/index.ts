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
