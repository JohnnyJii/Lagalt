const regex = /(.*)\|/;

export const getIdFromSub = string => {
  return string.replace(regex, "");
};
