export default class Album {
  constructor ({ id, name, picUrl, artist, playCount, albumName }) {
    this.id = id;
    this.name = name;
    this.picUrl = picUrl;
    this.artist = artist || '';
    this.albumName = albumName || '';
  }
}
