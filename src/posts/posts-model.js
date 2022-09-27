const postsDao = require('./posts-dao');
const validations = require('../commons-validations');

class Post {
  constructor(post) {
    this.title = post.title;
    this.content = post.content;
    this.validate();
  }

  add() {
    return postsDao.add(this);
  }

  validate() {
    validations.stringNotNullField(this.title, 'title');
    validations.minLengthField(this.title, 'title', 5);

    validations.stringNotNullField(this.content, 'content');
    validations.maxLengthField(this.content, 'content', 140);
  }

  static list() {
    return postsDao.list();
  }
}

module.exports = Post;
