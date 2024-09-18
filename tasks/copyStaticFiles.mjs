import gulp from 'gulp';
const {
	src,
	dest
} = gulp;

import changedInPlace from 'gulp-changed-in-place';

import dotenv from 'dotenv';
dotenv.config();

export default function copyStaticFiles() { return src([
  `${process.env.SRC_DIR}/video/**/*.*`,
  `${process.env.SRC_DIR}/img/**/*.{svg,gif}`,
  `${process.env.SRC_DIR}/manifest.webmanifest`,
], { base: `${process.env.SRC_DIR}/` })
  .pipe(changedInPlace({ firstPass: true, howToDetermineDifference: 'hash' }))
  .pipe(dest(process.env.DEST_DIR));
}
