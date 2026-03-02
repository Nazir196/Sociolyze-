module.exports = function(eleventyConfig) {
  // Copy assets folder to output
  eleventyConfig.addPassthroughCopy("src/assets");
  
  return {
    dir: {
      input: "src",           // Source files are in src folder
      includes: "_includes",   // Includes are in src/_includes
      output: "_site"         // Output goes to _site folder
    }
  };
};