const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getInputText() {
  console.log("Enter 'file' to read from a file or 'text' to enter text:");
  const choice = await askQuestion("Your choice: ");

  if (choice.toLowerCase() === "file") {
    const filePath = await askQuestion("Enter the file path: ");
    return readTextFromFile(filePath);
  } else if (choice.toLowerCase() === "text") {
    console.log(
      "Enter the text (press Enter and leave an empty line to finish):"
    );
    return readTextFromInput();
  } else {
    throw new Error("Invalid choice");
  }
}

function readTextFromFile(filePath) {
  try {
    const text = fs.readFileSync(filePath, "utf8");
    return text;
  } catch (err) {
    throw new Error(`Error reading file: ${err.message}`);
  }
}

async function readTextFromInput() {
  let text = "";
  while (true) {
    const line = await askQuestion("");
    if (line.trim() === "") {
      break;
    }
    text += line + " ";
  }
  return text.trim();
}

function countWords(text) {
  if (!text || text.trim() === "") {
    return 0;
  }

  const words = text.split(/\s+/);
  return words.length;
}

function countUniqueWords(text) {
  if (!text || text.trim() === "") {
    return 0;
  }

  const words = text.split(/\s+/);
  const uniqueWords = new Set(words.map((word) => word.toLowerCase()));
  return uniqueWords.size;
}

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log("\n<------------------------------ WORD COUNT ------------------------------>\n");
  try {
    const text = await getInputText();
    const totalWordCount = countWords(text);
    const uniqueWordCount = countUniqueWords(text);

    console.log(`Total number of words: ${totalWordCount}`);
    console.log(`Total number of unique words: ${uniqueWordCount}`);
  } catch (e) {
    console.error(`An error occurred: ${e.message}`);
  } finally {
    rl.close();
  }
}

main();
