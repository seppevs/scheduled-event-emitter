# scheduled-event-emitter
Schedule events to be emitted in the future

✨ [![Build Status](http://img.shields.io/travis/seppevs/scheduled-event-emitter.svg?style=flat)](https://travis-ci.org/seppevs/scheduled-event-emitter) [![Coverage Status](https://coveralls.io/repos/github/seppevs/scheduled-event-emitter/badge.svg?branch=master)](https://coveralls.io/r/seppevs/scheduled-event-emitter) [![NPM](http://img.shields.io/npm/v/scheduled-event-emitter.svg?style=flat)](https://www.npmjs.org/package/scheduled-event-emitter) [![Downloads](http://img.shields.io/npm/dm/scheduled-event-emitter.svg?style=flat)](https://www.npmjs.org/package/scheduled-event-emitter) [![Dependencies](https://david-dm.org/seppevs/scheduled-event-emitter.svg)](https://david-dm.org/seppevs/scheduled-event-emitter) [![Known Vulnerabilities](https://snyk.io/test/github/seppevs/scheduled-event-emitter/badge.svg)](https://snyk.io/test/github/seppevs/scheduled-event-emitter) ✨

## Introduction
With this module, you can schedule events to be emitted in the future

## Installation
```bash
$ npm install scheduled-event-emitter --save
```

## API

### `new ScheduledEventEmitter()`
Constructs a new scheduledEventEmitter instance

### `scheduledEventEmitter.scheduleEmit(eventName, date, payload) → timeout`
Schedules an event with name `eventName`. This event will be emitted on `date` with payload `payload`
This function returns a `timeout`, which can be used to cancel the event (with the `clearTimeout` function) 

### `scheduledEventEmitter.clearSchedule()`
Cancels all scheduled events

## Demo's

## Schedule an event on a fixed date
This snippet will write 'Happy New Year' on the first of January 2030
```javascript
const ScheduledEventEmitter = require('../src/ScheduledEventEmitter');

const scheduledEventEmitter = new ScheduledEventEmitter();
scheduledEventEmitter.on('deadlineReached', (message) => {
  console.log(message);
});
scheduledEventEmitter.scheduleEmit('deadlineReached', new Date('2030-01-01T00:00:00.000Z'), 'Happy New Year!');
```

## Schedule an event to be emitted within a certain time
This snippet writes Ba Dum Tss! to the console after 5 seconds.
```javascript
const ScheduledEventEmitter = require('../src/ScheduledEventEmitter');

const scheduledEventEmitter = new ScheduledEventEmitter();
scheduledEventEmitter.on('playDrums', (data) => {
  console.log(data);
});

const deadline = new Date(new Date().getTime() + 5000);
scheduledEventEmitter.scheduleEmit('playDrums', deadline, 'Ba Dum Tss');
```

## Cancel the emission of a single event
To cancel an event, use the `timeout` (returned by the `scheduleEmit` function) with the built-in [https://nodejs.org/api/timers
.html#timers_cleartimeout_timeout]
(clearTimeout) of Node.js (or your browser)

In this demo, nothing will be written to the console (because we cancelled the event we first scheduled):

```javascript
const ScheduledEventEmitter = require('../src/ScheduledEventEmitter');

const scheduledEventEmitter = new ScheduledEventEmitter();
scheduledEventEmitter.on('playDrums', (data) => {
  console.log(data);
});

const deadline = new Date(new Date().getTime() + 5000);
const timeout = scheduledEventEmitter.scheduleEmit('playDrums', deadline, 'Ba Dum Tss');

clearTimeout(timeout);
```

## Cancel the emission of ALL scheduled events

In this demo, nothing will be written to the console (because we cancelled ALL scheduled events (with `clearSchedule`)):

```javascript
const ScheduledEventEmitter = require('../src/ScheduledEventEmitter');

const scheduledEventEmitter = new ScheduledEventEmitter();
scheduledEventEmitter.on('giveWarning', (data) => {
  console.log(data);
});

const firstDeadline = new Date(new Date().getTime() + 5000);
scheduledEventEmitter.scheduleEmit('giveWarning', firstDeadline, 'First warning, please fix it');

const secondDeadline = new Date(new Date().getTime() + 5000);
scheduledEventEmitter.scheduleEmit('giveWarning', secondDeadline, 'Second warning, please fix it ASAP!!');

scheduledEventEmitter.clearSchedule();
```
