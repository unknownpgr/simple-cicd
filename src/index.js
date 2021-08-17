const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs').promises;

const app = express();

const SCRIPT_ROOT = path.join(__dirname, '../', 'scripts');
const scriptNameRegex = /^([0-9a-zA-Z]|-)+$/;

app.get('/run/:script', async (req, res) => {

  // Get script name
  const { script } = req.params;

  // Validate name
  if (!script.match(scriptNameRegex)) {
    res.send({ status: 'fail' });
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
    return;
  }

  // Run script
  try {
    await exec(scriptPath);
  } catch (_) {
  };
});

app.listen(8080);