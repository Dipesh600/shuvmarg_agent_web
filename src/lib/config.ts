/**
 * src/lib/config.ts
 *
 * Central configuration module for the Agent Web application.
 * Validates runtime environment variables and throws explicit configuration errors
 * if required variables are missing.
 */

function getRequiredApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url || url.trim() === "") {
    throw new Error(
      "[Configuration Error] NEXT_PUBLIC_API_URL environment variable is missing. " +
        "Please specify NEXT_PUBLIC_API_URL in your environment or .env.local file."
    );
  }
  return url;
}

/**
 * Validated backend API URL.
 * Throws a clear configuration error if NEXT_PUBLIC_API_URL is missing.
 */
export const API_URL: string = getRequiredApiUrl();
