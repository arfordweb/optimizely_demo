const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

async function printLine(preText, line, isAsync = false) {
  let logPromise = new Promise((resolve, reject) => {
    readline.clearLine(process.stdin, 0);
    rl.write(preText)
    if (isAsync) {
      setTimeout(() => {
        rl.write(line + '\n');
        resolve();
      }, 500)
    } else {
      rl.write(line + '\n');
      resolve();
    }
  });
  return logPromise;
}

async function printLines(experiences, options) {
  let i = 1;
  for (experience of experiences) {
    let preText = 'Visitor #' + i + ': ';
    let line = options.debug
      ? experience.debugText + ' ' + experience.text
      : experience.text

    await printLine(preText, line, options.isAsync)
    i++;
  }
}

exports.printLines = printLines