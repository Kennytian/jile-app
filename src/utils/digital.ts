export const getSkip = (index: string | number, size: number) => (getTake(index) - 1) * size;

export const getTake = (size: string | number) => (/^\d+$/.test(`${size}`) ? +size : 10);
