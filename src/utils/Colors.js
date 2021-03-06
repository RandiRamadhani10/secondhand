const mainColors = {
  primary: {
    darkBlue05: '#4B1979',
    darkBlue04: '#4B1979',
    darkBlue03: '#A06ECE',
    darkBlue02: '#D0B7E6',
    darkBlue01: '#E2D4F0',
    limeGreen05: '#AA9B87',
    limeGreen04: '#D4C2A8',
    limeGreen03: '#FFE9CA',
    limeGreen02: '#FFF0DC',
    limeGreen01: '#FFF8ED',
  },
  linear: {
    yellow01: '#FFE9C9',
    yellow02: '#FFE9CA',
  },
  alert: {
    danger: '#FA2C5A',
    warning: '#F9CC00',
    success: '#73CA5C',
  },
  neutral: {
    neutral05: '#151515',
    neutral04: '#3C3C3C',
    neutral03: '#8A8A8A',
    neutral02: '#D0D0D0',
    neutral01: '#FFFFFF',
  },
};

export const Colors = {
  TEXT: mainColors.neutral.neutral05,
  CATEGORY: mainColors.primary.darkBlue01,
  BACKGROUND: mainColors.neutral.neutral01,
  PRIMARY: mainColors.primary.darkBlue05,
  SOFTPRIMARY: mainColors.primary.darkBlue01,
  SECONDARY: mainColors.neutral.neutral03,
  DISABLE: mainColors.neutral.neutral02,
  WHITE: mainColors.neutral.neutral01,
  SUCCESS: mainColors.alert.success,
  ERROR: mainColors.alert.danger,
  YELLOW: mainColors.linear.yellow01,
  YELLOW2: mainColors.linear.yellow02,
};
