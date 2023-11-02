import mediaJson from '../../data/media.json' assert {type: 'json'};

class MediaController {
  data = mediaJson.data;
  constructor() {}

  get media() {
    return this.data;
  }

  getMedia(id) {
    return this.data.find(media => media.media_id === +id);
  }

  addMedia(media) {
    if (!media.media_id)
      media.media_id = Math.max(...this.data.map(media => media.media_id)) + 1;
    media.media_created_at = new Date().toISOString();
    this.data.push(media);
    return media;
  }

  updateMedia(id, media) {
    const newMedia = this.getMedia(id);
    if (!newMedia) return null;
    if (media.media_id) newMedia.media_id = media.media_id;
    if (media.filename) newMedia.filename = media.filename;
    if (media.filesize) newMedia.filesize = media.filesize;
    if (media.title) newMedia.title = media.title;
    if (media.description) newMedia.description = media.description;
    if (media.user_id) newMedia.user_id = media.user_id;
    if (media.media_type) newMedia.media_type = media.media_type;

    return newMedia;
  }

  deleteMedia(id) {
    const media = this.data.find(media => media.media_id === +id);
    if (!media) return null;
    this.data.splice(this.data.indexOf(media), 1);
    return media;
  }
}

export default new MediaController();
