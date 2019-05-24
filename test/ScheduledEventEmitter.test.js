const ScheduledEventEmitter = require('../src/ScheduledEventEmitter');

describe('ScheduledEventEmitter', () => {
  const scheduledEventEmitter = new ScheduledEventEmitter();

  const createFutureDate = (milliSeconds) => new Date(new Date().getTime() + milliSeconds);

  beforeEach(() => {
    scheduledEventEmitter.clearSchedule();
  });

  describe('scheduleEmit()', () => {
    it('should schedule an event', (done) => {
      const date = createFutureDate(100);
      scheduledEventEmitter.on('deadlineReached', (data) => {
        expect(data).toEqual({ test: 'data' });
        done();
      });
      scheduledEventEmitter.scheduleEmit('deadlineReached', date, { test: 'data' });
    });

    it('should return a timeout object, which can be used to cancel the event', () => {
      const date = createFutureDate(100);
      const timeout = scheduledEventEmitter.scheduleEmit('deadlineReached', date, { test: 'data' });
      clearTimeout(timeout);
    });
  });

  describe('clearSchedule()',  () => {
    it('should cancel all events to be emitted', (done) => {
      const date = createFutureDate(100);
      scheduledEventEmitter.scheduleEmit('deadlineReached', date, { test: 'data' });
      scheduledEventEmitter.on('deadlineReached', () => done(new Error('Test failed, event should be cancelled!')));
      scheduledEventEmitter.clearSchedule();
      setTimeout(() => done(), 200); // test succeeded, event was not emitted
    });
  });

});
