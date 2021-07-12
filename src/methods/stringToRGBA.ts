// credits https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
export const stringToRGBA: (string: string, transparency: number) => string = (string: string, transparency: number): string => {
    let hash: number | string = 0;
    if (string.length === 0) { return hash.toString() };
    for (let i: number = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    const rgb: [number, number, number] = [0, 0, 0];
    for (let i: number = 0; i < 3; i++) {
        const value: number = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${transparency})`;
}
