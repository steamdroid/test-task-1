import gulp from 'gulp';

import images from './tasks/processImages.mjs';
import serveHTML from './tasks/serve.mjs';
import watch from './tasks/watchFiles.mjs';
import js from './tasks/buildJS.mjs';
import cleanAssets from './tasks/clean.mjs';
import styles from './tasks/compileStyles.mjs';
import copyStatic from './tasks/copyStaticFiles.mjs';
import svgSprite from './tasks/createSvgSprite.mjs';
import fonts from './tasks/processFonts.mjs';

export const processImages = images;
export const serve = serveHTML;
export const watchFiles = watch;
export const buildJS = js;
export const clean = cleanAssets;
export const compileStyles = styles;
export const copyStaticFiles = copyStatic;
export const createSvgSprite = svgSprite;
export const processFonts = fonts;

export default gulp.series(
  gulp.parallel(
    copyStaticFiles,
    compileStyles,
    processImages,
    createSvgSprite,
    processFonts,
  ),
  gulp.parallel(buildJS, serve, watchFiles),
);

export const build = gulp.series(
  clean,
  gulp.parallel(
    copyStaticFiles,
    compileStyles,
    buildJS,
    processImages,
    createSvgSprite,
    processFonts,
  ),
);
