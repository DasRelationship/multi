import pretty from "pretty";
import fs from 'fs/promises';
import * as fsSync from 'fs';
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import { decode } from 'html-entities';

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyPluginOgImage, {
        satoriOptions: {
            fonts: [
                {
                    name: 'Inter',
                    data: fsSync.readFileSync('./src/assets/fonts/Inter-Regular.ttf'),
                    weight: 400,
                    style: 'normal',
                },
                {
                    name: 'Inter',
                    data: fsSync.readFileSync('./src/assets/fonts/Inter-Medium.ttf'),
                    weight: 500,
                    style: 'normal',
                },
                {
                    name: 'Inter',
                    data: fsSync.readFileSync('./src/assets/fonts/Inter-SemiBold.ttf'),
                    weight: 600,
                    style: 'normal',
                },
                {
                    name: 'Inter',
                    data: fsSync.readFileSync('./src/assets/fonts/Inter-Bold.ttf'),
                    weight: 700,
                    style: 'normal',
                }
            ],
        },
        outputDir: '/og-images/',
        formats: ['png'],
        width: 1200,
        height: 630,
        cacheDirectory: '.cache/og-images/'
    });

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

    eleventyConfig.addGlobalData("podcast", async () => {
        try {
            const data = await fs.readFile('./src/_data/podcast.json', 'utf8');
            return JSON.parse(data);
        } catch (e) {
            console.warn("Could not load podcast data");
            return {};
        }
    });

    eleventyConfig.addGlobalData("social", async () => {
        try {
            const data = await fs.readFile('./src/_data/social.json', 'utf8');
            return JSON.parse(data);
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