const { execSync } = require("child_process");

function checkTool(tool) {
  try {
    execSync(`${tool} --version`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function installDependencies(command, description) {
  try {
    console.log(`\x1b[34m[INFO]\x1b[0m Installing ${description} dependencies...`);
    execSync(command, { stdio: "inherit" });
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Successfully installed ${description} dependencies.`);
  } catch (error) {
    console.error(`\x1b[31m[ERROR]\x1b[0m Failed to install ${description} dependencies.`, error.message);
  }
}

const reactNativeInstalled = checkTool("npm"); // Checks for npm (React Native dependency installation)
const flutterInstalled = checkTool("flutter");

if (!reactNativeInstalled) {
  console.warn(
    "\x1b[33m[WARNING]\x1b[0m React Native environment is not fully set up. Please install Node.js, npm, and React Native CLI. Refer to https://reactnative.dev/docs/environment-setup."
  );
} else {
  installDependencies("cd rn-eliza-ai16z && npm install", "React Native");
}

if (!flutterInstalled) {
  console.warn(
    "\x1b[33m[WARNING]\x1b[0m Flutter environment is not set up. Skipping Flutter dependencies. Please install Flutter and set it up. Refer to https://docs.flutter.dev/get-started/install."
  );
} else {
  installDependencies("cd flutter_project && flutter pub get", "Flutter");
}
