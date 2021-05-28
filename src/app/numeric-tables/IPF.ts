export interface GenderCoeffs {
  [gender: string]: {
    c1: number;
    c2: number;
    c3: number;
    c4: number;
  };
}

export const IPFCOEFF: GenderCoeffs = {
  male: {
    c1: 310.67,
    c2: 857.785,
    c3: 53.216,
    c4: 147.0835
  },
  female: {
    c1: 125.1435,
    c2: 228.03,
    c3: 34.5246,
    c4: 86.8301
  },
};
