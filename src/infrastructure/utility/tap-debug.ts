export const tapDebug = <T>(val: T) => {
  if (process.env.NODE_ENV.toLowerCase() === "development")
    debugger;
  return val;
}
