export default class Song {
  constructor({ id, name, picUrl, artist, playCount, albumName }) {
    this.id = id;
    this.name = name;
    this.picUrl = picUrl;
    this.artist = artist || '';
    this.playCount = playCount || 0;
    this.albumName = albumName || '';
  }
}
