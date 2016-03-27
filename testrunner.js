
//An it is called by user code and I don't want to make them responsible for
//maintaining a proper promise chain, so the chain is locked to the it through
//bind() and the it updates it itself
function it(ctx, text, f) {
  ctx.chain = ctx.chain.then(function () {
    var result;
    try {
      result = f();
    } catch (e) {
      ctx.tests.push(f);
      log(ctx, getExpectCaller(e));
      return;
    }
    if (result && typeof result.then === "function") {
      return result.then(()=> ctx.tests.push(undefined), function (e) {
        ctx.tests.push(f);
        if (e && e.message && e.stack) {
          log(ctx, text + "\n" + getExpectCaller(e));
        } else {
          log(ctx, text + "\n" + "promise rejected with a non error argument", arguments);
        }
      });
    } else {
      ctx.tests.push(undefined);
    }
  });
}

function getExpectCaller(e) {
  var stack = e.stack;
  var lines = stack.split("\n");

  for (var i = 0; i <lines.length; i++) {
    if (test.assertionLocations.some(e=> lines[i] === e)) {
      return e.message + "\n" + lines[i+1];
    }
  }
  //Pull requests for other assertion libraries are welcome
  return e.stack;
}

function log(context, message) {
  if (!context.groupStarted) {
    console.group(context.filename);
    context.groupStarted = true;
  }
  console.info(message);
}

function describe(text, f) {
  f();
}

function no_op(){}

function test(f, filename) {
  return test.chain = test.chain.then(function () {
    var context = {
      chain: Promise.resolve(),
      tests: [],
      filename: filename,
      groupStarted: false
    };
    f(describe, it.bind(null, context), /*xdescribe*/no_op, /*xit*/no_op);
    if (context.groupStarted) {
      console.groupEnd();
    }
    return context.chain.then(function () {
      return context.tests;
    });
  })
}
test.chain = Promise.resolve();
test.assertionLocations = [];
module.exports = test;
