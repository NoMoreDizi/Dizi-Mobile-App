export function ignoreFalseActWarning() {
  const originalError = console.error;

  beforeAll(() => {
    console.error = (...args: string[]) => {
      if (
        /A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:/.test(
          args[0],
        )
      ) {
        return;
      } else {
        originalError.call(console, ...args);
      }
    };
  });

  afterAll(() => {
    console.error = originalError;
  });
}

export function ignoreZeroPaddingWarning() {
  const originalError = console.warn;

  beforeAll(() => {
    console.warn = (...args: string[]) => {
      if (
        args[0].includes(
          "paddingTop was given a value of 0, this has no effect on headerStyle.",
        )
      ) {
        return;
      } else {
        originalError.call(console, ...args);
      }
    };
  });

  afterAll(() => {
    console.error = originalError;
  });
}
