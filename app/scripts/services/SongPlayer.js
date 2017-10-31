(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};

/**
* @desc object representing currently selected album
* @type {Object}
*/

        var currentAlbum = Fixtures.getAlbum();

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
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
          });

            SongPlayer.currentSong = song;
        };

/**
* @function playSong
* @desc Plays audio file currentBuzzObject and sets playing property of the song object to true
* @param {Object} song
*/

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

/**
* @function stopSong
* @desc Stops audio file currentBuzzObject and sets playing property of the song object to null
* @param {Object} song
*/

        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

/**
* @function getSongIndex
* @desc Returns the index of the song parameter
* @param {Object} song
*/

        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };


/**
* @desc Active song object from list of songs
* @type {Object}
*/
        SongPlayer.currentSong = null;

/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
        SongPlayer.currentTime = null;

/**
* @desc Max volume of song.
* @type {Number}
*/

        SongPlayer.volume = 100;

/**
* @function play
* @desc Play current or new song
* @param {Object} song
*/
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };

/**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

/**
* @method SongPlayer.previous
* @desc Plays previous song
*/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
               stopSong(song);
            } else {
               var song = currentAlbum.songs[currentSongIndex];
               setSong(song);
               playSong(song);
         };
       };

/**
* @method SongPlayer.next
* @desc Plays next song on album
*/
         SongPlayer.next = function(){
           var currentSongIndex = getSongIndex(SongPlayer.currentSong);
           currentSongIndex++;

           if (currentSongIndex > currentAlbum.songs.length){
              stopSong(song);
           } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
        };
      };

      return SongPlayer;
    };

/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/
          SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
            }
          };

/**
* @function setVolume
* @desc Set volume of currently playing song
* @param {Number} volume
*/

          SongPlayer.setVolume = function (volume){
            if (currentBuzzObject){
              currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
          }
          


    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
