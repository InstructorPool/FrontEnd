import {
  getAuthenticatedUser,
} from "../lib/auth.js";

export async function GET(
  request: Request
) {
  const user =
    await getAuthenticatedUser(
      request
    );

  if (!user) {
    return Response.json(
      {
        authenticated:
          false,
      },
      {
        status: 401,

        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  }

  return Response.json(
    {
      authenticated: true,
      username:
        user.username,
    },
    {
      status: 200,

      headers: {
        "Cache-Control":
          "no-store",
      },
    }
  );
}