
import _ from 'lodash';
class RankSong {
  constructor({ id, name, avater, singerName }) {
    this.id = id;
    this.name = name;
    this.avater = avater;
    this.singerName = singerName;
    this.id = id;
  }
}
export default class Rank {
  constructor({ id, name, tracks }) {
    this.id = id;
    this.name = name;
    this.songs = tracks.map(item => {
      const picUrl = item.al.picUrl;
      const singerName = _.map(item.ar, 'name').join(',');
      const { id, name } = item;
      const song = new RankSong({
        id, name, avater: picUrl, singerName
      });
      return song;
    });
  }
}
