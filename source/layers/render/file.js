const fs = require('fs');
const logger = require('../../kernel/logger');

module.exports = {
  /**
   * process file
   *
   * @param  {Object} result
   */
  solve: async (ctx, result) => {
    ctx.set('content-type', 'application/octet-stream');
    if (typeof result.file === 'string') {
      ctx.body = fs.createReadStream(result.file);
    } else if (result.file instanceof fs.ReadStream) {
      logger.warn('file result will create ReadStream lazily');
      ctx.body = result.file;
    } else {
      throw new Error('file result only accept string or ReadStream');
    }
  },

  /**
   * get file result
   *
   * @param  {String||fs.ReadStream} file - file name or stream
   * @return {Object} file result
   */
  order: (file) => {
    return {
      type: 'file',
      file
    };
  }
};