#!/usr/bin/env node

const program = require('commander');
const WebSocket = require('ws');
const chalk = require('chalk');

var config = require('./config.js');

const ws = new WebSocket(config.url);



// single function - send both namespace and method as a result of option
// incorporate ES6 literals for secret

function gPlay(){
  ws.on('open', function open() {
    ws.send('{"namespace": "connect", "method": "connect", "arguments": ["goom-cli","a4459902-f302-4054-8ccf-94e6ed83ae9a"]}');
    console.log(chalk.green(`Connected to Google Play Music Desktop`));
    const gplay = tryEval('{"namespace": "playback",  "method": "playPause"}');
    ws.send(gplay);
    ws.terminate();
  });
};

function gNext(){
  ws.on('open', function open() {
    ws.send('{"namespace": "connect", "method": "connect", "arguments": ["goom-cli","a4459902-f302-4054-8ccf-94e6ed83ae9a"]}');
    console.log(chalk.green(`Connected to Google Play Music Desktop`));
    const gnext = tryEval('{"namespace": "playback",  "method": "forward"}');
    ws.send(gnext);
    ws.terminate();
  });
};

function gPrev(){
  ws.on('open', function open() {
    ws.send('{"namespace": "connect", "method": "connect", "arguments": ["goom-cli","a4459902-f302-4054-8ccf-94e6ed83ae9a"]}');
    console.log(chalk.green(`Connected to Google Play Music Desktop`));
    const gprev = tryEval('{"namespace": "playback",  "method": "rewind"}');
    ws.send(gprev);
    ws.terminate();
  });
};

function gRateUp(){
  ws.on('open', function open() {
    ws.send('{"namespace": "connect", "method": "connect", "arguments": ["goom-cli","a4459902-f302-4054-8ccf-94e6ed83ae9a"]}');
    console.log(chalk.green(`Connected to Google Play Music Desktop`));
    const grateup = tryEval('{"namespace": "rating",  "method": "toggleThumbsUp"}');
    ws.send(grateup);
    ws.terminate();
  });
};

function gRateDown(){
  ws.on('open', function open() {
    ws.send('{"namespace": "connect", "method": "connect", "arguments": ["goom-cli","a4459902-f302-4054-8ccf-94e6ed83ae9a"]}');
    console.log(chalk.green(`Connected to Google Play Music Desktop`));
    const gratedown = tryEval('{"namespace": "rating",  "method": "toggleThumbsDown"}');
    ws.send(gratedown);
    ws.terminate();
  });
};

function tryEval(str) {
  try {
    return JSON.stringify(eval(`(${str})`));
  } catch (e) {
    return str;
  }
}

program.command('play')
 .description('toggle play/pause')
 .action(gPlay);

program.command('pause')
  .description('toggle play/pause')
  .action(gPlay);

program.command('prev')
 .description('toggle play/pause')
 .action(gPrev);

program.command('next')
.description('toggle play/pause')
.action(gNext);

program.command('down')
 .description('toggle play/pause')
 .action(gRateDown);

program.command('up')
  .description('toggle play/pause')
  .action(gRateUp);

program.parse(process.argv);
