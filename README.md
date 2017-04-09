# google-play-music-desktop-cli
Node-based CLI for interfacing with Google Play Music Desktop Player

This is my first project with node. Attempting to create a websocket-based control to quickly control GPMDP from my visor window.

## Current commands
`goom play` - toggles play/pause
`goom pause` - toggles play/pause
`goom prev` - goes back to beginning / previous track
`goom next` - skips to next track
`goom up` - toggles upvote
`goom down` - toggles downvote

## Installation
To install, clone to a local directory, rename `config.js.example` to `config.js`, and run `npm link`.

The default command is `goom`(**goo**gle-**m**usic). If you'd like to change it, you can do so by editing `bit` in `package.json` prior to running `npm link`. 

You will require a secret from GPMDP. Though I plan on creating a script to capture this at startup, currently you will have to use a websocket client to connect as per the [GPMDP docs](https://github.com/MarshallOfSound/Google-Play-Music-Desktop-Player-UNOFFICIAL-/blob/master/docs/PlaybackAPI_WebSocket.md).

## Todos
1. create install script to capture secret id
2. add current track info to console output
3. check if already up/down-voted before toggling
4. add additional control functions
