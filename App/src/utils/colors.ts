export function rgbToHex(rgb: string): string {
    const componentToHex = (c: string) => {
        const hex = parseInt(c).toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };
    const match = /rgb\((\d*), (\d*), (\d*)\)/.exec(rgb)!;
    return '#' + componentToHex(match[1]) + componentToHex(match[2]) + componentToHex(match[3]);
}

function hexToArray(hex: string): number[] {
    let normalized = hex.trim();
    if (normalized.startsWith('#')) {
        normalized = normalized.substring(1);
    }

    if ([3, 4, 6, 8].indexOf(normalized.length) === -1) {
        throw new Error(`Invalid hex color: ${hex}`);
    }

    if (normalized.length === 3 || normalized.length === 4) {
        normalized = normalized
            .split('')
            .map((c) => c + c)
            .join('');
    }

    const hasAlpha = normalized.length === 8;
    const r = parseInt(normalized.substring(0, 2), 16);
    const g = parseInt(normalized.substring(2, 4), 16);
    const b = parseInt(normalized.substring(4, 6), 16);
    const a = hasAlpha ? parseInt(normalized.substring(6, 8), 16) : 255;

    return [r, g, b, a];
}

export function colorsDifference(hex1: string, hex2: string): number {
    const arr1 = hexToArray(hex1);
    const arr2 = hexToArray(hex2);
    return arr1.reduce((sum, value, i) => sum + Math.abs(value - arr2[i]), 0);
}

export function colorLightness(hex: string): number {
    return Math.max(...hexToArray(hex)) / 255;
}
