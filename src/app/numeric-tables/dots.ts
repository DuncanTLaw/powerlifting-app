import { GenderCoeff } from './coefficient.model';

export const DOTSCOEFF: GenderCoeff = {
  male: {
    c1: 1.093*10**(-6),
    c2: 7.391293*10**(-4),
    c3: 0.1918759221,
    c4: 24.0900756,
    c5: 307.75076
  },
  female: {
    c1: 1.0706*10**(-6),
    c2: 5.158568*10**(-4),
    c3: 0.1126655495,
    c4: 13.6175032,
    c5: 57.96288
  }
};
