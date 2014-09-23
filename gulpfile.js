var gulp = require('gulp'),
	path = require('path'),
	plugins = require('gulp-load-plugins')({
		config: path.join(__dirname, 'package.json')
	});

gulp.task('build', function() {
	var pkg = require('./package.json');

	var header = ['/**',
		' * <%= pkg.name %>',
		' * <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		'(function (angular) {',
		'	var global = {};',
		'',
		''].join('\n');

	var footer = [
		'',
		'})(angular);',
		''].join('\n');

	gulp.src([
		'bower_components/momentjs/moment.js',
		'src/angular-momentjs-service.js'
	])
	.pipe(plugins.concat('angular-momentjs-service.js'))
	.pipe(plugins.header(header, {pkg: pkg}))
	.pipe(plugins.footer(footer))
	.pipe(gulp.dest('./release/'))
	.pipe(plugins.uglify())
	.pipe(plugins.concat('angular-momentjs-service.min.js'))
	.pipe(gulp.dest('./release/'));
});
