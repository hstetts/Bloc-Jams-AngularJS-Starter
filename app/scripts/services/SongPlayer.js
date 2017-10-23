(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;

 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
    var currentBuzzObject = null;

/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

    var setSong = function(song) {
      if (currentBuzzObject) {
             currentBuzzObject.stop();
             currentSong.playing = null;
         }

         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });

         currentSong = song;
    };

/**
* @function playSong
* @desc Plays audio file currentBuzzObject and sets playing property of the song object to true
* @param {Object} song
*/

    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing= true;
    };

/**
* @method songPlayer.play
* @desc if the current song is not the same as the song object, set song to the song object
* and play the song object. Otherwise, if the current song is the same and it's paused, play it.
* @param {Object} song
*/

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
      setSong(song);
      currentBuzzObject.play();
      song.playing = true;
    } else if (currentSong === song) {
      if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
         }
    }
  };
/**
* @method songPlayer.pause
* @desc Pause currentBuzzObject and set song playing to false
* @param {Object} song
*/

  SongPlayer.pause = function(song) {
    currentBuzzObject.pause();
    song.playing = false;
  };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
