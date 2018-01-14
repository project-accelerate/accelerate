const MarkovGenerator = require("markov-generator");
const fs = require("fs");
const path = require("path");
const { flatMap, random, shuffle } = require("lodash");
const { addHours, addDays, startOfDay } = require("date-fns");

exports.eventOrganiser = nameGenerator("event-organisers.txt", 3);
exports.eventTitle = nameGenerator("event-titles.txt", 4);
exports.eventDescription = proseGenerator("event-descriptions", 200);
exports.venueNames = nameGenerator("venue-names.txt", 3);
exports.streetNames = nameGenerator("street-names.txt", 2);
exports.location = jsonGenerator("locations.json");
exports.dates = dateRangeGenerator({ maxDaysAhead: 90, typicalStartHour: 19 });

/**
 * Generate placeholder text from source data read from a list of line-separated sentences.
 * Best suited for generating short text, such as names.
 */
function nameGenerator(sourceFile, minLength, maxLength = minLength + 2) {
  const source = fs.readFileSync(path.join(__dirname, sourceFile), "utf8");
  const names = getComponents(source, "\n");

  return () => {
    const length = random(minLength, maxLength);
    const [startPick, endPick] = shuffle(names);
    const midPicks = shuffle(names);
    const start = startPick.split(" ")[0];

    if (length <= 1) {
      return start;
    }

    const endPickWords = getComponents(endPick, " ");
    const midPickWords = flatMap(midPicks, pick => {
      const words = getComponents(pick, " ");
      return words.slice(1, words.length - 1);
    });

    return [
      start,
      ...midPickWords.slice(1, length - 2),
      endPickWords[endPickWords.length - 1]
    ].join(" ");
  };
}

/**
 * Generate placeholder text from source data read from a directory of files containing prose.
 * Best suited for generating long passages of text.
 */
function proseGenerator(sourceDir, minLength) {
  const sourceFiles = fs.readdirSync(path.join(__dirname, sourceDir));

  const generator = new MarkovGenerator({
    input: flatMap(sourceFiles, sourceFile => {
      const source = fs
        .readFileSync(path.join(__dirname, sourceDir, sourceFile), "utf8")
        .replace(/[()]/g, "");

      return getComponents(source, ". ");
    }),
    minLength
  });

  return () => generator.makeChain(minLength);
}

/**
 * Generate placeholder data by picking an entry from a JSON array.
 */
function jsonGenerator(fileName) {
  const values = JSON.parse(
    fs.readFileSync(path.join(__dirname, fileName), "utf8"),
    "\n"
  );
  let i = -1;

  return () => {
    i = (i + 1) % values.length;
    return values[i];
  };
}

/**
 * Generate a range of dates
 */
function dateRangeGenerator({
  maxDaysAhead,
  typicalStartHour,
  minDuration = 2,
  maxDuration = 8,
  rng = lowBias
}) {
  return () => {
    const today = startOfDay(new Date());
    const dayOffset = rng(maxDaysAhead);
    const duration = random(minDuration, maxDuration);
    const startHour = typicalStartHour - 0.5 * duration;

    const startDate = addDays(addHours(today, startHour), dayOffset);
    const endDate = addHours(startDate, duration);

    return { startDate, endDate };
  };
}

function lowBias(range) {
  // Bias towards near future by using logarithmic random number distribution
  return Math.round(Math.exp(random(0, Math.log(range), true)));
}

function getComponents(text, separator) {
  return text
    .split(separator)
    .map(x => x.trim())
    .filter(x => x.length > 0);
}
