export const timeElapsed = (start: Date): number => {
  return (new Date().getTime() - start.getTime()) / 1000;
};
