import gulp from 'gulp';
const {
	src,
	dest
} = gulp;

import ttf2woff2 from 'gulp-ttf2woff2';
import ttf2woff from 'gulp-ttf2woff';

import dotenv from 'dotenv';
dotenv.config();

export default function processFonts() {
	src(`${process.env.SRC_DIR}/fonts/**/*.ttf`)
    .pipe(dest(`${process.env.DEST_DIR}/fonts`))
		.pipe(ttf2woff2())
		.pipe(dest(`${process.env.DEST_DIR}/fonts`));

  return src(`${process.env.SRC_DIR}/fonts/**/*.ttf`)
    .pipe(ttf2woff())
		.pipe(dest(`${process.env.DEST_DIR}/fonts`));
}
