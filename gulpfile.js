const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const newer = require("gulp-newer");
const fileinclude = require("gulp-file-include");

const PATHS = {
  sassIn: "./src/scss/**/*.scss",
  sassMain: "./src/scss/main.scss",
  stylesOut: "./public/styles/",

  htmlIn: "./src/pages/**/*.html",
  htmlOut: "./public/",
  htmlWatch: ["src/pages/**/*.html", "src/blocks/**/*.html"],
};

gulp.task("sass", () => {
  return gulp
    .src(PATHS.sassMain)
    .pipe(sourcemaps.init())
    .pipe(newer(PATHS.stylesOut))
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATHS.stylesOut));
});

gulp.task("html", () => {
  return gulp
    .src(PATHS.htmlIn)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(PATHS.htmlOut));
});

gulp.task("watch", () => {
  gulp.watch(PATHS.sassIn, gulp.parallel("sass"));
  gulp.watch(PATHS.htmlWatch, gulp.parallel("html"));
});
