// import { get } from "@vercel/blob";

// export async function GET() {
//   try {
//     const result = await get("instructors.json", {
//       access: "private",
//     });

//     if (!result || result.statusCode !== 200) {
//       return Response.json(
//         {
//           message: "강사 데이터를 찾을 수 없습니다.",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     return new Response(result.stream, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         "Cache-Control": "private, no-store",
//         "X-Content-Type-Options": "nosniff",
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     return Response.json(
//       {
//         message: "강사 데이터를 불러오지 못했습니다.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// import {
//   get,
// } from "@vercel/blob";

// import {
//   getAuthenticatedEmail,
// } from "../server/auth";

// export async function GET(
//   request: Request
// ) {
//   try {
//     /* ========================================
//        로그인 확인
//     ======================================== */

//     const email =
//       await getAuthenticatedEmail(
//         request
//       );

//     if (!email) {
//       return Response.json(
//         {
//           message:
//             "로그인이 필요합니다.",
//         },
//         {
//           status: 401,

//           headers: {
//             "Cache-Control":
//               "no-store",
//           },
//         }
//       );
//     }

//     /* ========================================
//        로그인 성공 → Blob 조회
//     ======================================== */

//     const result =
//       await get(
//         "instructors.json",
//         {
//           access:
//             "private",
//         }
//       );

//     if (
//       !result ||
//       result.statusCode !==
//         200
//     ) {
//       return Response.json(
//         {
//           message:
//             "강사 데이터를 찾을 수 없습니다.",
//         },
//         {
//           status: 404,
//         }
//       );
//     }

//     return new Response(
//       result.stream,
//       {
//         status: 200,

//         headers: {
//           "Content-Type":
//             "application/json; charset=utf-8",

//           "Cache-Control":
//             "private, no-store",

//           "X-Content-Type-Options":
//             "nosniff",

//           "Vary":
//             "Cookie",
//         },
//       }
//     );
//   } catch (error) {
//     console.error(
//       "강사 데이터 조회 실패:",
//       error
//     );

//     return Response.json(
//       {
//         message:
//           "강사 데이터를 불러오지 못했습니다.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import {
  get,
} from "@vercel/blob";

import {
  getAuthenticatedUser,
} from "./lib/auth.js";

export async function GET(
  request: Request
) {
  try {
    /* ========================================
       로그인 확인
    ======================================== */

    const user =
      await getAuthenticatedUser(
        request
      );

    if (!user) {
      return Response.json(
        {
          message:
            "로그인이 필요합니다.",
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

    /* ========================================
       로그인 성공 → Private Blob 조회
    ======================================== */

    const result =
      await get(
        "instructors.json",
        {
          access: "private",
        }
      );

    if (
      !result ||
      result.statusCode !== 200
    ) {
      return Response.json(
        {
          message:
            "강사 데이터를 찾을 수 없습니다.",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(
      result.stream,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json; charset=utf-8",

          "Cache-Control":
            "private, no-store",

          "X-Content-Type-Options":
            "nosniff",

          "Vary":
            "Cookie",
        },
      }
    );
  } catch (error) {
    console.error(
      "강사 데이터 조회 실패:",
      error
    );

    return Response.json(
      {
        message:
          "강사 데이터를 불러오지 못했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}