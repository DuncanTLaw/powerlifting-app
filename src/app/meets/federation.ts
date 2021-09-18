interface Federations {
  [federation: string]: {
    name: string;
    male: string[];
    female: string[];
  };
}

/* eslint-disable */
export const FEDERATION: Federations = {
  IPF: {
    name: 'International Powerlifting Federation',
    male: ['53', '59', '66', '74', '83', '93', '105', '120', '120+'],
    female: ['43', '47', '52', '57', '63', '69', '76', '84', '84+']
  },
  // GPA: {
  //   name: 'Global Powerlifting Alliance',
  //   male: [],
  //   female: []
  // },
  // GPC: {
  //   name: 'Global Powerlifting Committee',
  //   male: [],
  //   female: []
  // },
  // GPF: {
  //   name: 'Global Powerlifting Federation',
  //   male: [],
  //   female: []
  // },
  // IBSA: {
  //   name: 'International Blind Sports Association',
  //   male: [],
  //   female: []
  // },
  // IPL: {
  //   name: 'International Powerlifting League',
  //   male: [],
  //   female: []
  // },
  // IRP: {
  //   name: 'International RAW Powerlifting',
  //   male: [],
  //   female: []
  // },
  // WDFPF: {
  //   name: 'World Drug-Free Powerlifting Federation',
  //   male: [],
  //   female: []
  // },
  WP: {
    name: 'World Powerlifting',
    male: ['62', '69', '77', '85', '94', '105', '120', '120+'],
    female: ['48', '53', '58', '64', '72', '84', '100', '100+']
  },
  // WPA: {
  //   name: 'World Powerlifting Alliance',
  //   male: [],
  //   female: []
  // },
  // WPC: {
  //   name: 'World Powerlifting Congress',
  //   male: [],
  //   female: []
  // },
  // WPF: {
  //   name: 'World Powerlifting Federation',
  //   male: [],
  //   female: []
  // },
  WPPO: {
    name: 'World Para Powerlifting',
    male: ['49', '54', '59', '65', '72', '80', '88', '97', '107', '107+'],
    female: ['41', '45', '50', '55', '61', '67', '73', '79', '86', '86+']
  },
  // WUAP: {
  //   name: 'World United Amateur Powerlifting',
  //   male: [],
  //   female: []
  // }
};
