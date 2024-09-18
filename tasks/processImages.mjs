import gulp from 'gulp';
const  {
  src,
  dest,
} = gulp;

import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import changedInPlace from 'gulp-changed-in-place';
import plumber from 'gulp-plumber';
import path from 'path';
import gulpIf from 'gulp-if';

import dotenv from 'dotenv';
dotenv.config();

const isJPEG = (file) => (process.env.NODE_ENV === 'production' && (path.extname(file.path) === '.jpg' || path.extname(file.path) === '.jpeg'));
const isPNG = (file) => (process.env.NODE_ENV === 'production' && path.extname(file.path) === '.png');

const config =   {
  webp: {
    lossless: true,
  },
};

const jpegConfig = {
  jpg: {
    quality: 85,
    progressive: true,
    mozjpeg: true,
  },
};

const pngConfig = {
  png: {
    compressionLevel: 9,
  },
};

export default function processImages() {
  return src(
    `${process.env.SRC_DIR}/img/**/*.{png,jpg,jpeg}`,
    { base: `${process.env.SRC_DIR}/` },
  )
    .pipe(changedInPlace({ firstPass: true, howToDetermineDifference: 'hash' }))
    .pipe(plumber())
    .pipe(gulpIf(isJPEG, sharpOptimizeImages({ ...config, ...jpegConfig })))
    .pipe(gulpIf(isPNG, sharpOptimizeImages({ ...config, ...pngConfig })))
    .pipe(dest(process.env.DEST_DIR));
};
