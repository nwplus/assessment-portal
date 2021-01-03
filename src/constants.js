export const COLOR = {
  PRIMARY: '#2D2937',
  PRIMARY_DARK: '#1b1821',
  TEXT: '#5A5A5A',
  BLACK: '#000000',
  DARK_COPY: '#A198A6',
  RED: '#EB5757',
  DARK_GRAY: '#4F4F4F',
  TRANSPARENT: 'Transparent',
  BODY_TEXT: '#5A5A5A',
  LIGHT_GRAY: '#828282',
  UNSCORED_GRAY: '#E0E0E0',
  LIGHT_BLUE: '#F6FEFF',
  BLUE_TEXT: '#2F80ED',
  TOOLBAR_GRAY: '#FAFAFA',
  BLUE_BORDER: '#21258A',
}

export const TABS = {
  OVERVIEW: 'Overview',
  RESUME: 'Resume',
  COMMENTS: 'Comments',
}

export const SORT = {
  TIMESTAMP: 'Timestamp',
  LAST_NAME: 'Last Name',
  FIRST_NAME: 'First Name',
  SCORE: 'Total Score',
  STATUS: 'Status',
}

export const MAX_SCORES = {
  RESUME: {
    value: 7,
    weight: 1,
  },
  ESSAY: {
    value: 3,
    weight: 2,
  },
}

export const MAX_SCORE = Object.values(MAX_SCORES).reduce(
  (acc, curr) => acc + curr.value * curr.weight,
  0
)
export const APPLICATION_STATUS = {
  applied: {
    color: COLOR.RED,
    textColor: 'white',
    text: 'applied',
  },
  scored: {
    color: COLOR.BLUE_TEXT,
    textColor: 'white',
    text: 'scored',
  },
  accepted: {
    color: 'green',
    textColor: 'white',
    text: 'accepted',
  },
}
