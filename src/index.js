const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs').promises;

const app = express();

const PORT = 8080;
const SCRIPT_ROOT = path.join(__dirname, '../', 'scripts');
const scriptNameRegex = /^([0-9a-zA-Z]|-)+$/;

function log(message) {
  console.log(`[${new Date()}] ${message}`);
}

app.get('/run/:script', async (req, res) => {

  // Get script name
  const { script } = req.params;
  log(`[${script}] Requested.`);

  // Validate name
  if (!script.match(scriptNameRegex)) {
    res.send({ status: 'fail' });
    log(`[${script}] Name validation failed.`);
    return;
  }

  // Build script path
  const scriptPath = path.join(SCRIPT_ROOT, script + '.sh');

  // Check if script exists.
  // If script file exists, response 'success' reguardless of script execution result.
  try {
    await fs.stat(scriptPath);
    res.send({ status: 'success', script });
  } catch (e) {
    res.send({ status: 'fail' });
    log(`[${script}] Does not exists.`);
    return;
  }

  // Run script
  try {
    const { stdout, stderr } = await exec(scriptPath);
    if (stdout) log(`[${script}] StdOut : ${stdout}`);
    if (stderr) log(`[${script}] StdErr : ${stderr}`);
    log(`[${script}] Successfully executed.`);
  } catch (err) {
    log(`[${script}] Occurred error :\n${err}`);
  };
});

app.listen(PORT, () => log(`Server started at port ${PORT}`));