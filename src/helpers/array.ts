export const getRandomElements = <T>(array: T[], numberOfElements: number): T[] => {
  if (numberOfElements > array.length) {
    throw new Error("The array does not have enough unique elements.");
  }

  const randomElements: T[] = [];

  while (randomElements.length < numberOfElements) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const element = array[randomIndex];

    if (!randomElements.includes(element)) {
      randomElements.push(element);
    }
  }

  return randomElements;
}
