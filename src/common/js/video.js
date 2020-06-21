import _ from 'lodash';
export default class Video {
  constructor ({ title, videoImage, commentCount, shareCount, creator, videoGroup, playCount, playDuration }) {
    this.title = title;
    this.videoImage = videoImage;
    this.commentCount = commentCount || 0;
    this.shareCount = shareCount || 0;
    this.creator = creator;
    this.videoGroupName = videoGroup[_.random(videoGroup.length - 1)].name;
    this.playCount = playCount || 0;
    this.playDuration = playDuration || 0;
  }
}
