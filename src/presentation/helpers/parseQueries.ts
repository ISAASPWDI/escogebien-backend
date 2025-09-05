// presentation/helpers/parsingHelpers.ts


export const parseNumber = (value: any): number | undefined => {
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

export const parseString = (value: any): string | undefined => {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim();
  }
  return undefined;
};

export const parseCategories = (value: any): number[] | undefined => {
  if (typeof value === 'string' && value.trim() !== '') {
    return value.split(',')
      .map(cat => parseInt(cat.trim()))
      .filter(cat => !isNaN(cat));
  }
  if (Array.isArray(value)) {
    return value
      .map(cat => parseInt(String(cat)))
      .filter(cat => !isNaN(cat));
  }
  return undefined;
};


export const parseValue = (value: any, type: 'number' | 'string' | 'categories'): any => {
  switch (type) {
    case 'number':
      return parseNumber(value);
    case 'string':
      return parseString(value);
    case 'categories':
      return parseCategories(value);
    default:
      return undefined;
  }
};