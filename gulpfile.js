const { task, src, dest, watch, parallel, series } = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const fs = require('fs');

task('html', function () {
	return src('./src/*.html')
		.pipe(
			fileInclude({
				prefix: '@@',
				basepath: '@file',
			})
		)
		.pipe(dest('./build/'));
});

task('sass', function () {
	return src('./src/scss/**/*.scss')
		.pipe(sass())
		.pipe(postcss([autoprefixer()]))
		.pipe(dest('./build/css/'));
});

task('js', function () {
	return src('./src/js/**/*').pipe(dest('./build/js/'));
});
task('images', function () {
	return src('./src/img/**/*', { encoding: false })
		.pipe(imagemin({ verbose: true }))
		.pipe(dest('./build/img/'));
});

task('server', function () {
	return src('./build/').pipe(
		server({
			livereload: true,
			open: true,
		})
	);
});

task('clean', function (done) {
	if (fs.existsSync('./build/')) {
		return src('./build/').pipe(clean());
	}
	done();
});

task('watch', function () {
	watch('./src/**/*.html', parallel('html'));
	watch('./src/scss/**/*.scss', parallel('sass'));
	watch('./src/img/**/*.*', parallel('images'));
	watch('./src/js/**/*.js', parallel('js'));
});

task(
	'default',
	series(
		'clean',
		parallel('html', 'sass', 'js', 'images'),
		parallel('server', 'watch')
	)
);
