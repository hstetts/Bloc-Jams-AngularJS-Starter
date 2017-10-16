(function() {
  function AlbumCtrl() {
    this.albums.songs = [];
    for (var i=0; i < 4; i++) {
      this.albums(angular.copy(albumPicasso));
    }

    angular
      .module('blocJams')
      .controller('AlbumCtrl', AlbumCtrl);
})();
