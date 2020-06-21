export default class Song {
  constructor ({ id, name, picUrl, artist, playCount, albumName }) {
    this.id = id;
    this.name = name;
    this.picUrl = picUrl;
    this.artist = artist || '';
    this.playCount = this.getCountCheck(playCount) || 0;
    this.albumName = albumName || '';
  }

  getCountCheck (count) {
    if (count < 10000) {
      return count;
    } else {
      return Math.round(count / 10000) + '万';
    }
  }
}
