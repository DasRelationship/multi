const pretty = require("pretty");

module.exports = function(eleventyConfig) {
    // Add debug logging for template processing
    eleventyConfig.on('beforeBuild', () => {
        console.log('Debug: Starting build process');
    });

    eleventyConfig.addTransform("debug", function(content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            console.log('Debug: Processing template:', outputPath);
            console.log('Debug: Template engine:', this.inputPath && this.inputPath.endsWith('.md') ? 'markdown+njk' : 'njk');
        }
        return content;
    });

    eleventyConfig.addGlobalData("podcast", () => {
        try {
            return require("./src/_data/podcast.json");
        } catch (e) {
            console.warn("Could not load podcast data");
            return {};
        }
    });

    eleventyConfig.addGlobalData("social", () => {
        try {
            return require("./src/_data/social.json");
        } catch (e) {
            console.warn("Could not load social data");
            return {};
        }
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

    // Configure template formats
    eleventyConfig.setTemplateFormats([
        "md",
        "njk",
        "html"
    ]);

    // Set default template engine for markdown
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->"
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_layouts",
            data: "_data",
            output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        templateFormats: ["md", "njk", "html"],
        passthroughFileCopy: true,
        debug: true
    };
};