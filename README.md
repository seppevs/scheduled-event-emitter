# scheduled-event-emitter
Schedule events to be emitted in the future

✨ [![Build Status](http://img.shields.io/travis/seppevs/scheduled-event-emitter.svg?style=flat)](https://travis-ci.org/seppevs/scheduled-event-emitter) [![Coverage Status](https://coveralls.io/repos/github/seppevs/scheduled-event-emitter/badge.svg?branch=master)](https://coveralls.io/r/seppevs/scheduled-event-emitter) [![NPM](http://img.shields.io/npm/v/scheduled-event-emitter.svg?style=flat)](https://www.npmjs.org/package/scheduled-event-emitter) [![Downloads](http://img.shields.io/npm/dm/scheduled-event-emitter.svg?style=flat)](https://www.npmjs.org/package/scheduled-event-emitter) [![Dependencies](https://david-dm.org/seppevs/scheduled-event-emitter.svg)](https://david-dm.org/seppevs/scheduled-event-emitter) [![Known Vulnerabilities](https://snyk.io/test/github/seppevs/scheduled-event-emitter/badge.svg)](https://snyk.io/test/github/seppevs/scheduled-event-emitter) ✨

## Introduction
With this module, you can schedule events to be emitted in the future.

## Installation
```bash
$ npm install scheduled-event-emitter --save
```

## API

### `new ScheduledEventEmitter()`
Constructs a new scheduledEventEmitter instance. 

Note: ScheduledEventEmitter extends the [Node.js EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), so you can use all of its 
functions.

### `scheduledEventEmitter.scheduleEmit(eventName, date, payload) → timeout`
Schedules an event with name `eventName`. This event will be emitted on `date` with payload `payload`
This function returns a `timeout`, which can be used to cancel the event (with the `clearTimeout` function).

Note: the event is scheduled in memory. So when you restart your Node.js process, the scheduled event is gone.

### `scheduledEventEmitter.clearSchedule()`
Cancels all scheduled events

## Demo's

## Schedule an event on a fixed date
```javascript
const ScheduledEventEmitter = require('scheduled-event-emitter');

const emitter = new ScheduledEventEmitter();
emitter.on('deadlineReached', (payload) => console.log(payload));
emitter.scheduleEmit('deadlineReached', new Date('2030-01-01T00:00:00.000Z'), 'Happy New Year!');

// Will write `Happy New Year!` on the first of January 2030
```

## Schedule an event to be emitted within a certain time
```javascript
const ScheduledEventEmitter = require('scheduled-event-emitter');

const emitter = new ScheduledEventEmitter();
emitter.on('playDrums', (payload) => console.log(payload));

const deadline = new Date(new Date().getTime() + 5000);
emitter.scheduleEmit('playDrums', deadline, 'Ba Dum Tss');

// Writes `Ba Dum Tss!` to the console after 5 seconds
```

## Cancel the emission of a single event
To cancel an event, pass the `timeout` (returned by the `scheduleEmit` function) to the [clearTimeout](https://nodejs.org/api/timers.html#timers_cleartimeout_timeout) function

```javascript
const ScheduledEventEmitter = require('scheduled-event-emitter');

const emitter = new ScheduledEventEmitter();
emitter.on('playDrums', (payload) => console.log(payload));

const deadline = new Date(new Date().getTime() + 5000);
const timeout = emitter.scheduleEmit('playDrums', deadline, 'Ba Dum Tss');

clearTimeout(timeout);

// Nothing will be written to the console (because we cancelled the event)
```

## Cancel the emission of ALL scheduled events
Use the `clearSchedule` function for this

```javascript
const ScheduledEventEmitter = require('scheduled-event-emitter');

const emitter = new ScheduledEventEmitter();
emitter.on('giveWarning', (payload) => console.log(payload));

const firstDeadline = new Date(new Date().getTime() + 5000);
emitter.scheduleEmit('giveWarning', firstDeadline, 'First warning, please fix it');

const secondDeadline = new Date(new Date().getTime() + 5000);
emitter.scheduleEmit('giveWarning', secondDeadline, 'Second warning, please fix it ASAP!!');

emitter.clearSchedule();

//  Nothing will be written to the console (because we cancelled ALL scheduled events)
```
