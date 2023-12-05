import { env } from "process";

// Need to move this to the .env
export default {
  CLIENT_ID: env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: env.GOGLE_CLIENT_SECRET,
  REDIRECT_URI: env.REDIRECT_URI,
};
