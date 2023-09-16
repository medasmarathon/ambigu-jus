type ErrorWithMessage = {
  status?: string;
  type?: string;
  message: string;
};

class ApiError extends Error implements ErrorWithMessage {
  type: string;
  status: string;
  message: string;
  detail: string;
  constructor(
    message: string,
    detail?: string,
    type?: string,
    status?: string
  ) {
    super();
    this.message = message;
    this.detail = detail ?? "";
    this.type = type ?? "";
    this.status = status ?? "";
  }
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export { getErrorMessage, ApiError };
