var gulp = require("gulp");
var jshint = require("gulp-jshint");
var del = require("del");
var fs = require('fs');
var replace = require('gulp-replace');
var rename = require("gulp-rename");
var $ = require("gulp-load-plugins")({lazy:true});


//Change depends on current project name
var baseUrlToHTMLFile = "W:/wenz.de/Sandbox/1-Debug/T16_Zahlarten/A_Payment/";
var variantName = "A3_Impressionen.html";


//pathes to different types files
var config = {
    alljs: [
        "./TEST/js/*.js",
        "./*.js"
    ],
    less: "./TEST/Less/*.less",
    temp: {
        css: "./TEST/css/",
        js: "./TEST/js/",
        html: "./TEST/html/"
    }
};

//analyzing source with JSHint
gulp.task( "vet", function () {
	return gulp
		.src(config.alljs)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish", {verbose: true}));
} );

//compiling Less --> CSS
gulp.task( "styles", ["clean-styles"], function () {
    return gulp
        .src(config.less)
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers:["last 3 version", "> 2%"]
        }))
        .pipe(gulp.dest(config.temp.css));
} );

//removing compiled CSS
gulp.task( "clean-styles", function () {
    var files = config.temp.css + "*.css";
    del( files );
} );

//combine all data into one html file
gulp.task( "add-to-html", ["vet", "styles"], function () {
    return gulp
        .src("./RESULT/result.html")
        .pipe(replace(/\<\!\-\-style\-\-\>/, function () {
            var style = fs.readFileSync(config.temp.css + 'variant.css', 'utf8');
            return '<style>\n' + style + '\n</style>';
        }))
        .pipe(replace(/\<\!\-\-html\-\-\>/, function () {
            var html = fs.readFileSync(config.temp.html + 'variant.html', 'utf8');
            return '\n' + html + '\n';
        }))
        .pipe(replace(/\<\!\-\-script\-\-\>/, function () {
            var script = fs.readFileSync(config.temp.js + 'variant.js', 'utf8');
            return '<script>\n' + script + '\n</script>';
        }))
        .pipe(rename(variantName))
        .pipe(gulp.dest(baseUrlToHTMLFile));
} );

gulp.task( "watcher", function () {
    gulp.watch( [config.less, config.alljs], ["add-to-html"] );
} );