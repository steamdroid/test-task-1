import gulp from 'gulp';
const {
  src,
  dest
} = gulp;

import plumber from 'gulp-plumber';
import svgSprite from 'gulp-svg-sprite';

import dotenv from 'dotenv';
dotenv.config();

export default function createSvgSprite() {
  return src(`${process.env.SRC_DIR}/icons/*.svg`)
  .pipe(plumber())
  .pipe(svgSprite({
    mode: {
      stack: {
        dest: '.',
        bust: false,
        sprite: 'ext-sprite.svg',
      }
    }
  }))
  .pipe(dest(`${process.env.DEST_DIR}/img`));
}
