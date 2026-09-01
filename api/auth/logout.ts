import {
  clearCookie,
  SESSION_COOKIE_NAME,
} from "../lib/auth.js";

export async function POST() {
  return Response.json(
    {
      success: true,
    },
    {
      status: 200,

      headers: {
        "Set-Cookie":
          clearCookie(
            SESSION_COOKIE_NAME
          ),

        "Cache-Control":
          "no-store",
      },
    }
  );
}