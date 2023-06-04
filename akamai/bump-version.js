const fs = require("fs");
const fileName = "./bundle.json";
const bundle = require(fileName);

const newVersion = Number(
  parseFloat(bundle["edgeworker-version"]) + 0.1
  // parseFloat(bundle["edgeworker-version"])
).toFixed(1);
const content = JSON.stringify(
  { ...bundle, "edgeworker-version": newVersion },
  null,
  2
);

fs.writeFile(fileName, content, (err) => {
  if (err) {
    return console.log(err);
  }

  console.info("--------------------------------------------");
  console.info(`Updated edge worker version to ${newVersion}`);
  console.info("--------------------------------------------\n");
});
