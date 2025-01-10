export const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const maxSixPlayers = value =>
  value && value > 6 ? "Maximum six players" : undefined;

export const required = value => (value ? undefined : "Required");
