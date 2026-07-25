const { auditPage } = require("../services/audit.service");
const { isValid } = require("../utils/validateUrl");

const auditWebsite = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required.",
      });
    }

    if (!isValid(url)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid URL.",
      });
    }

    const result = await auditPage(url);

    return res.status(200).json({
      success: true,
      url,
      auditedAt: new Date().toISOString(),
      data: result,
    });

  } catch (error) {

    console.log(error.code);
    console.log(error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(408).json({
        success: false,
        message: "Website took too long to respond.",
      });
    }

    //website doesnt exist
    if (error.code === "ENOTFOUND") {
      return res.status(404).json({
        success: false,
        message: "Website could not be reached.",
      });
    }

    // Non HTML page
    if (error.message === "NON_HTML_RESPONSE") {
      return res.status(400).json({
        success: false,
        message: "The provided URL does not contain an HTML page.",
      });
    }

    // Website returns error
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: `Website returned status ${error.response.status}.`,
      });
    }

    // Unknown
    return res.status(500).json({
      success: false,
      message: "Something went wrong while auditing the website.",
    });
  }
};

module.exports = { auditWebsite };