export default class PlayList {
  constructor ({ id, name, coverImage, description, playCount, commentThreadId }) {
    this.id = id;
    this.commentThreadId = commentThreadId;
    this.name = name;
    this.coverImage = coverImage;
    this.description = description;
    this.playCount = playCount;
  }
}
