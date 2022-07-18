import { isToday } from '../utils';

describe('isToday', () => {
  let isTodaySpy: jest.SpyInstance;
  const utils = {
    isToday,
  };

  beforeEach(() => {
    isTodaySpy = jest.spyOn(utils, 'isToday');
  });

  it('should return true', () => {
    const today = new Date();
    const isDayToday = utils.isToday(today);
    expect(isDayToday).toEqual(true);
    expect(isTodaySpy).toHaveBeenCalledWith(today);
  });

  it('should return false', () => {
    const pastDate = new Date('2020-01-01');
    const isDayToday = utils.isToday(pastDate);
    expect(isDayToday).toEqual(false);
    expect(isTodaySpy).toHaveBeenCalledWith(pastDate);
  });

  it('should return false', () => {
    const futureDate = new Date('2100-01-01');
    const isDayToday = utils.isToday(futureDate);
    expect(isDayToday).toEqual(false);
    expect(isTodaySpy).toHaveBeenCalledWith(futureDate);
  });
});
