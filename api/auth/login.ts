import bcrypt from "bcryptjs";

import {
  createSessionCookie,
  createSessionToken,
} from "../../server/auth";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const username =
      String(
        body.username ?? ""
      ).trim();

    const password =
      String(
        body.password ?? ""
      );

    /* ========================================
       환경변수 확인
    ======================================== */

    const savedUsername =
      process.env.AUTH_USERNAME;

    const savedPasswordHash =
      process.env
        .AUTH_PASSWORD_HASH;


    /* ========================================
       ✅ [추가]
       환경변수가 서버에서 실제로 읽히는지 확인
       실제 비밀번호/해시는 출력하지 않음
    ======================================== */

    console.log(
      "===== AUTH ENV CHECK ====="
    );

    console.log(
      "AUTH_USERNAME 존재:",
      Boolean(savedUsername)
    );

    console.log(
      "AUTH_PASSWORD_HASH 존재:",
      Boolean(savedPasswordHash)
    );

    console.log(
      "AUTH_SECRET 존재:",
      Boolean(
        process.env.AUTH_SECRET
      )
    );


    if (
      !savedUsername ||
      !savedPasswordHash
    ) {
      console.error(
        "로그인 환경변수가 설정되지 않았습니다."
      );

      return Response.json(
        {
          message:
            "로그인 설정 오류가 발생했습니다.",
        },
        {
          status: 500,
        }
      );
    }

    /* ========================================
       아이디 확인
    ======================================== */

    if (
      username !==
      savedUsername
    ) {
      return Response.json(
        {
          message:
            "아이디 또는 비밀번호가 올바르지 않습니다.",
        },
        {
          status: 401,
        }
      );
    }

    /* ========================================
       비밀번호 확인
    ======================================== */

    const passwordMatch =
      await bcrypt.compare(
        password,
        savedPasswordHash
      );

    if (!passwordMatch) {
      return Response.json(
        {
          message:
            "아이디 또는 비밀번호가 올바르지 않습니다.",
        },
        {
          status: 401,
        }
      );
    }

    /* ========================================
       로그인 성공
       7일 세션 생성
    ======================================== */

    const sessionToken =
      await createSessionToken(
        username
      );

    return Response.json(
      {
        success: true,
        username,
      },
      {
        status: 200,

        headers: {
          "Set-Cookie":
            createSessionCookie(
              sessionToken
            ),

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "로그인 오류:",
      error
    );

    return Response.json(
      {
        message:
          "로그인 처리 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}