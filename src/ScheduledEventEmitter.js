const { EventEmitter } = require('events');

function scheduleJob(date, callback) {
  const delay = date.getTime() - new Date().getTime();
  return setTimeout(callback, delay);
}

class ScheduledEventEmitter extends EventEmitter {

  constructor() {
    super();
    this.scheduledJobs = [];
  }

  /**
   * Schedule an emit of an event at a certain date
   * @param {Object} event
   * @param {Date} date
   * @param {Object} payload
   */
  scheduleEmit(event, date, payload) {
    const job = scheduleJob(date, () => this.emit(event, payload));
    this.scheduledJobs.push(job);
    return job;
  }

  /**
   * Cancel all scheduled events
   */
  clearSchedule() {
    this.scheduledJobs.forEach((job) => clearTimeout(job));
    this.scheduledJobs.length = 0;
  }
}

module.exports = ScheduledEventEmitter;
