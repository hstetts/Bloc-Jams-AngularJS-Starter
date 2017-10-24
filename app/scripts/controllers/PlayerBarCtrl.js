(function () {
  function PlayerBarCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
  }

  angular
    .module('blocJams')
    .controller('PlayBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();
