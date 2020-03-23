export default class Bill {
  constructor({ id, nameCJ, picUrl }) {
    this.id = id;
    this.nameCJ = nameCJ;
    this.picUrl = picUrl;
    this.title = '';
    this.description = '';
    this.handleTitleDes();
  }

  handleTitleDes () {
    const start = this.nameCJ.indexOf('[');
    const end = this.nameCJ.indexOf(']');
    this.title = this.nameCJ.substring(start + 1, end);
    this.name = this.nameCJ.substring(end + 2);
  }
}
