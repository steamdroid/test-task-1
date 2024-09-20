import gulp from 'gulp';

import sync from 'browser-sync';

import dotenv from 'dotenv';

const {
  watch,
  parallel,
} = gulp;
dotenv.config();

export default function watchFiles() {
  watch(`${process.env.SRC_DIR}/scss/**/*`, { usePolling: true }, parallel('compileStyles'));
  watch(`${process.env.SRC_DIR}/**/*.{html,svg}`, { usePolling: true }, parallel('processHtml')).on('change', sync.reload);
  watch(`${process.env.SRC_DIR}/**/*.{${process.env.WATCH_IMG}}`, { usePolling: true }, parallel('processImages')).on('change', sync.reload);
  watch(`${process.env.SRC_DIR}/**/*.{${process.env.WATCH_STATIC}}`, { usePolling: true }, parallel('copyStaticFiles')).on('change', sync.reload);
  watch(`${process.env.SRC_DIR}/fonts/**/*.ttf`, { usePolling: true }, parallel('processFonts')).on('change', sync.reload);
}
