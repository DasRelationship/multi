const pretty = require("pretty");

module.exports = function(eleventyConfig) {
    eleventyConfig.addGlobalData("podcast", () => {
        return require("./src/_data/podcast.json");
    });

    eleventyConfig.addGlobalData("social", () => {
        return require("./src/_data/social.json");
    });

    eleventyConfig.addCollection("debug", function(collectionApi) {
        return {
            podcast: this.podcast,
            social: this.social
        };
    });

    eleventyConfig.addTransform("prettify", function(content, outputPath) {
        if(outputPath && outputPath.endsWith(".html")) {
            return pretty(content, {
                ocd: true,
                indent_size: 4,
                indent_char: ' ',
                indent_inner_html: true,
                preserve_newlines: true,
                unformatted: ['code', 'pre'],
                indent_scripts: 'keep',
                end_with_newline: true,
                wrap_line_length: 0
            });
        }
        return content;
    });

    // Add passthrough copy for assets
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};