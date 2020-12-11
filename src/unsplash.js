import { createApi } from 'unsplash-js';

class Background {
  constructor() {
    this.unsplash = createApi({
      accessKey: 'eqoxE7jm28DoWGrKdOLkfFka15OOUXwKxUq7EboktQ4',
    });
  }
  async getPhoto(location) {
    //SEND REQUEST
    const response = await this.unsplash.search
      .getPhotos({
        query: location,
        page: 1,
        perPage: 1,
        orientation: 'portrait',
      })

      return response.response.results[0].urls.regular;
  }

}

export const background = new Background();
 