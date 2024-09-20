// TODO: https://stackoverflow.com/questions/43395463/how-to-deal-with-browser-cache-while-using-browsersync

import gulp from 'gulp';

import images from './tasks/processImages.mjs';
import serveHTML from './tasks/serve.mjs';
import watch from './tasks/watchFiles.mjs';
import js from './tasks/buildJS.mjs';
import cleanAssets from './tasks/clean.mjs';
import styles from './tasks/compileStyles.mjs';
import copyStatic from './tasks/copyStaticFiles.mjs';
import fonts from './tasks/processFonts.mjs';
import html from './tasks/processHtml.mjs';

export const processImages = images;
export const serve = serveHTML;
export const watchFiles = watch;
export const buildJS = js;
export const clean = cleanAssets;
export const compileStyles = styles;
export const copyStaticFiles = copyStatic;
export const processFonts = fonts;
export const processHtml = html;

export default gulp.series(
  gulp.parallel(
    processHtml,
    copyStaticFiles,
    compileStyles,
    processImages,
    processFonts,
  ),
  gulp.parallel(buildJS, serve, watchFiles),
);

export const build = gulp.series(
  clean,
  gulp.parallel(
    processHtml,
    copyStaticFiles,
    compileStyles,
    buildJS,
    processImages,
    processFonts,
  ),
);
