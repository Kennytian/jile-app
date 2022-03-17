export const getTake = (size: string | number, initial = 10) => (!/^\d+$/.test(`${size}`) ? initial : +size);

export const getSkip = (index: string | number, size: number) => (getTake(index) - 1) * size;
