export interface GenderCoeff {
  [gender: string]: {
    [coeff: string]: number;
  };
}

export interface GLModel {
  [gender: string]: {
    [equipment: string]: {
      sbd: number[];
      b: number[];
    };
  };
}
