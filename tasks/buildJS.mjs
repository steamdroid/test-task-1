import gulp from 'gulp';
const { dest } = gulp;

import path from 'path';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import sync from 'browser-sync';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { ESBuildMinifyPlugin } from 'esbuild-loader';

import dotenv from 'dotenv';
dotenv.config();

import * as url from 'url';
import { createRequire } from 'module';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);

const webpackMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default function buildJS() {
  return webpackStream({
    entry: {
      main: `./${process.env.SRC_DIR}/js/main.js`,
    },
    output: {
      path: path.join(__dirname, 'dist/js'),
      filename: '[name].js',
    },
    watch: webpackMode === 'development',
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)|(vendor)/,
          use: {
            loader: 'esbuild-loader',
            options: {
              target: 'es2017',
              treeShaking: true,
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2017', // Syntax to compile to (see options below for possible values)
        }),
      ],
    },
    devtool: 'source-map',
    mode: webpackMode,
  }, webpack, (err, stats) => {
    sync.reload();
  })
    .pipe(gulpIf(process.env.NODE_ENV === 'production', rename({
      suffix: '.min',
    })))
    .pipe(dest(`${process.env.DEST_DIR}/js/`));
};
