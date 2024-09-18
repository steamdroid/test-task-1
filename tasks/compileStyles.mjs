import gulp from 'gulp';
const {
	src,
	dest,
} = gulp;

import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import postcss from 'gulp-postcss';
import atImport from 'postcss-easy-import';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';

import sync from 'browser-sync';
import gulpIf from 'gulp-if';

import dotenv from 'dotenv';
dotenv.config();

export default function compileStyles() {return src([`${process.env.SRC_DIR}/scss/main.scss`])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(postcss([
    atImport(),
    autoprefixer(),
  ]))
  .pipe(rename((filePath) => {
    filePath.basename = 'style';
    filePath.extname = '.css';
  }))
  .pipe(dest(`${process.env.DEST_DIR}/css/`))
  .pipe(gulpIf(process.env.NODE_ENV === 'production', cleanCSS()))
  .pipe(gulpIf(process.env.NODE_ENV === 'production', rename({
    suffix: '.min',
  })))
  .pipe(sourcemaps.write('./'))
  .pipe(dest(`${process.env.DEST_DIR}/css/`))
  .pipe(sync.stream());
}
