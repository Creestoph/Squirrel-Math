export function rgbToHex(rgb: string): string {
    const componentToHex = (c: string) => {
        const hex = parseInt(c).toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };
    const match = /rgb\((\d*), (\d*), (\d*)\)/.exec(rgb)!;
    return '#' + componentToHex(match[1]) + componentToHex(match[2]) + componentToHex(match[3]);
}

function hexToArray(hex: string): number[] {
    const int = parseInt(hex.substr(1, 6), 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export function colorsDifference(hex1: string, hex2: string): number {
    const array1 = hexToArray(hex1);
    const array2 = hexToArray(hex2);
    return Math.abs(array1[0] - array2[0]) + Math.abs(array1[1] - array2[1]) + Math.abs(array1[2] - array2[2]);
}

export function colorLightness(hex: string): number {
    return Math.max(...hexToArray(hex)) / 255;
}
