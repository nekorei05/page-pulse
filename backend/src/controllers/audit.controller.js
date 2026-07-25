const axios = require("axios");
const cheerio = require("cheerio");
const { calculateHealthScore } = require("../utils/calculateHealthScore");

const auditPage = async (url) => {
  const startTime = Date.now();

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      "User-Agent": "PagePulse/1.0",
    },
  });

  const responseTime = Date.now() - startTime;

  const html = response.data;
  const $ = cheerio.load(html);

  // extract
  const title = $("title").text().trim();

  const metaDescription =
    $('meta[name="description"]').attr("content") || "";

  const h1Count = $("h1").length;

  const imagesMissingAlt = $("img")
    .filter((_, img) => !$(img).attr("alt"))
    .length;

  const wordCount = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .split(" ").length;

  // health score
  const healthScore = calculateHealthScore({
    title,
    metaDescription,
    h1Count,
    imagesMissingAlt,
  });


  return {
    healthScore,

    performance: {
      status: response.status,
      responseTime,
    },

    seo: {
      title,
      metaDescription,
      h1Count,
    },

    accessibility: {
      imagesMissingAlt,
    },

    content: {
      wordCount,
    },
  };
};

module.exports = { auditPage };