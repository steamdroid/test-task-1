import gulp from 'gulp';

import changedInPlace from 'gulp-changed-in-place';

import dotenv from 'dotenv';

const {
  src,
  dest,
} = gulp;
dotenv.config();

export default function copyStaticFiles() {
  return src([
    `${process.env.SRC_DIR}/img/**/*.{gif}`,
  ], { base: `${process.env.SRC_DIR}/` })
    .pipe(changedInPlace({ firstPass: true, howToDetermineDifference: 'hash' }))
    .pipe(dest(process.env.DEST_DIR));
}
