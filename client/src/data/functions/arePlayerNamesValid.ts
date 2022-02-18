const areAllFieldsFilled = (names: string[]): boolean => {
  return names.every(name => name !== "");
}

const areAllNamesUnique = (names: string[]): boolean => {
  return !names.some((name, index) => names.indexOf(name) !== index)
}

const containsValidCharacters = (names: string[]): boolean => {
  return names.every(name => name.match(/\S/));
}

export const arePlayerNamesValid = (names: string[]): boolean => {
  return areAllFieldsFilled(names) &&
         areAllNamesUnique(names) &&
         containsValidCharacters(names);
}