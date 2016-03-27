var test = require("./testrunner");

function babyccino(requireTests, assertionLibErrors) {
  var tests = {};
  var testResults = {};
  var failedTests = [];

	document.body.style.fontSize = "10em";
  document.body.style.fontFamily = "sans-serif";
  document.body.style.textAlign = "center";

  runChangedTests(requireTests, tests, testResults, failedTests);

  window.rerun = function (n) {
    console.log(failedTests);
    failedTests.slice(n)[0]();
  }

  test.assertionLocations = assertionLibErrors.map(function (errorMaker) {
    var assertionError;
    var thisError;
    try { errorMaker() } catch(e) { assertionError = e.stack; }
    try { throw new Error(); } catch(e) { thisError = e.stack; }
    return assertionError.split("\n").slice(0, -thisError.split("\n").length).slice(-1).join("");
  });

  if (module.hot) {
    module.hot.accept(requireTests().id, () => runChangedTests(requireTests, tests, testResults, failedTests));
  }
}

function runChangedTests(requireTests, loadedTests, testResults, failedTests) {
  failedTests.splice(0, failedTests.length);
  var newTests = requireTests();
  newTests.keys().map(function (key) {
    if (!(key in loadedTests) || loadedTests[key] !== newTests(key)) {
      loadedTests[key] = newTests(key);
      test(loadedTests[key], key)
        .then(function (testResult) {
          testResults[key] = testResult;
          testResult.filter(x=>x!==undefined).forEach(x=>failedTests.push(x));
        });
    }
    test.chain.then(() => displayResults(testResults));
  });
}

function displayResults(testResults) {
	var totalTests = 0;
	var failed = 0;
	Object.keys(testResults).forEach(function (key) {
		totalTests += testResults[key].length;
		failed += testResults[key].filter(x => x !== undefined).length;
	});
	if (failed > 0) {
		document.body.style.color = "#d90000";
		document.body.innerHTML = "&#x2717; " + failed + "/" + totalTests;
	} else {
		document.body.style.color = "green";
		document.body.innerHTML = "&#x2713; " + totalTests;
	}
}

module.exports = babyccino;
