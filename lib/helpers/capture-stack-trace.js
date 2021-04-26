// taken from https://github.com/gr0uch/error-class/blob/b1e9193254941ec2a549a40185cc4a05db98d241/index.js#L34-L40

const isCaptureStackTraceSupported = 'captureStackTrace' in Error

// uses the V8-spefic method to capture a stack trace if available, otherwise falls back to a generic solution
module.exports = function captureStackTrace(error, errorClass = error.constructor) {
  if (isCaptureStackTraceSupported) return Error.captureStackTrace(error, errorClass);
  Object.defineProperty(error, 'stack', {
    value: Error().stack,
    writable: true,
    configurable: true
  });

  if (error.inner_error && error.inner_error.stack)
  error.stack += '\n--- inner error ---\n' + error.inner_error.stack;
}
