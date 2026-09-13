/** Compatibility entry point: Python 3 and reportlab required. */
const { spawnSync } = require('child_process');
const path = require('path');
const result = spawnSync(process.env.PYTHON || 'python3', [path.join(__dirname, 'build-cv.py')], { stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
