#!/usr/bin/env node

const program = require('commander');
const WebSocket = require('ws');
const chalk = require('chalk');

var config = require('./config.js');

const ws = new WebSocket(config.url);
const appname = config.appname;
const secret = config.secret;

function wsSend(namespace,method){
  ws.on('open', function open() {
    ws.send(`{"namespace": "connect", "method": "connect", "arguments": ["${appname}","${secret}"]}`);
    let gCommand = tryEval(`{"namespace": "${namespace}",  "method": "${method}"}`);
    // checkRating();
    ws.send(gCommand);
    // checkTrack();
    consoleOutput(method);
    ws.close();
    ws.terminate();
  })
};

function consoleOutput(method){
  // check if currently playing track
  // playback.getPlaybackState()
  if (method == "playPause"){
    console.log(chalk.green(`Playback has been toggled`));
  } else if (method == "forward"){
    console.log(chalk.green(`Skipping to next track`));
  } else if (method == "rewind"){
    console.log(chalk.green(`Skipping to previous track`));
  } else if (method == "toggleThumbsUp"){
    console.log(chalk.green(`The track has been up-voted`));
  } else if (method == "toggleThumbsDown"){
    console.log(chalk.green(`The track has been down-voted`));
  }
}

function tryEval(str){
  try {
    return JSON.stringify(eval(`(${str})`));
  } catch (e) {
    return str;
  }
}

 program.command('play')
  .description('toggle play/pause')
  .action(function(){
    wsSend('playback','playPause');
  });

program.command('pause')
  .description('toggle play/pause')
  .action(function(){
    wsSend('playback','playPause');
  });

program.command('prev')
 .description('previous track')
 .action(function(){
   wsSend('playback','rewind');
 });

program.command('next')
.description('next track')
.action(function(){
  wsSend('playback','forward');
});

program.command('down')
 .description('toggle thumbs-down rating')
 .action(function(){
   wsSend('rating','toggleThumbsDown');
 });

program.command('up')
  .description('toggle thumbs-up rating')
  .action(function(){
    wsSend('rating','toggleThumbsUp');
  });

program.parse(process.argv);
