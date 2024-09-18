import sync from 'browser-sync';

import dotenv from 'dotenv';
dotenv.config();

export default function serve() {
  return sync.init({
    server: {
      baseDir: `./${process.env.DEST_DIR}/`,
    },
    cors: true,
    notify: false,
    ui: false,
    watch: true,
  });
};
