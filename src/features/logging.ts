import * as Sentry from "@sentry/react-native";
import { Log } from "../types/log";

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export const addLog = (log: Log) => {
  Sentry.logger.info(log.title, {
    message: log.message,
    timestamp: new Date().toISOString(),
  });
};

export const addErrorLog = (error: Error) => {
  Sentry.logger.error(error.message, {
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
};
