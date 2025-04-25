export const serialize = (obj: any): string => {
  return JSON.stringify(obj);
};

export const deserialize = <T = any>(str: string): T => {
  return JSON.parse(str);
};
