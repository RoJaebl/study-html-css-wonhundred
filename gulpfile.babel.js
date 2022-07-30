// Module
import { deleteAsync } from "del";
import Gulp from "gulp";
import GulpPug from "gulp-pug";
import NodeSass from "sass";
import GulpSass from "gulp-sass";
import GulpAutoprefixer from "gulp-autoprefixer";
import GulpCsso from "gulp-csso";
import GulpImage from "gulp-image";
import GulpWebp from "gulp-webp";
import GulpWebserver from "gulp-webserver";
import GulpGHPage from "gulp-gh-pages";

// Compiler
const Sass = GulpSass(NodeSass);

// Routes
const routes = {
  publish: "build/**/*",
  server: "build/",
  del: ["build", ".publish"],
  img: {
    watch: "src/img/**/*.{jpg,svg,png,btm,gif,webp,ai}",
    src: "src/img/*.{jpg,svg,png,btm,gif,webp,ai}",
    dest: "build/img/",
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css/",
  },
  pug: {
    watch: "src/**/*.pug",
    src: "src/index.pug",
    dest: "build/",
  },
};

// Task
const GHPage = () => Gulp.src(routes.publish).pipe(GulpGHPage());
const Delete = () => deleteAsync(routes.del);
const Watch = () => {
  Gulp.watch(routes.img.watch, Webp);
  Gulp.watch(routes.img.watch, Image);
  Gulp.watch(routes.scss.watch, Scss);
  Gulp.watch(routes.pug.watch, Pug);
};
const Webserver = () =>
  Gulp.src(routes.server).pipe(GulpWebserver({ livereload: true, open: true }));
const Webp = () =>
  Gulp.src(routes.img.src).pipe(GulpWebp()).pipe(Gulp.dest(routes.img.dest));
const Image = () =>
  Gulp.src(routes.img.src).pipe(GulpImage()).pipe(Gulp.dest(routes.img.dest));
const Scss = () =>
  Gulp.src(routes.scss.src)
    .pipe(Sass().on("Error", Sass.logError))
    .pipe(GulpAutoprefixer())
    .pipe(GulpCsso())
    .pipe(Gulp.dest(routes.scss.dest));
const Pug = () =>
  Gulp.src(routes.pug.src).pipe(GulpPug()).pipe(Gulp.dest(routes.pug.dest));

// Gulp cli
const prepare = Gulp.series([Delete, Image, Webp]);
const assets = Gulp.series([Pug, Scss]);
const postDev = Gulp.parallel([Webserver, Watch]);

export const build = Gulp.series([prepare, assets]);
export const dev = Gulp.series([build, postDev]);
export const deploy = Gulp.series([build, GHPage, Delete]);
