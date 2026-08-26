import { get } from "@vercel/blob";

export default {
  async fetch(request: Request) {
    // GET 요청만 허용
    if (request.method !== "GET") {
      return Response.json(
        {
          message: "Method Not Allowed",
        },
        {
          status: 405,
        }
      );
    }

    try {
      // Vercel Private Blob에 저장된 instructors.json 읽기
      const result = await get("instructors.json", {
        access: "private",
      });

      if (
        !result ||
        result.statusCode !== 200 ||
        !result.stream
      ) {
        return Response.json(
          {
            message: "강사 데이터를 찾을 수 없습니다.",
          },
          {
            status: 404,
          }
        );
      }

      // Private Blob 내용을 프론트에 전달
      return new Response(result.stream, {
        status: 200,
        headers: {
          "Content-Type":
            "application/json; charset=utf-8",

          // 개인정보가 브라우저에 오래 캐싱되는 것 방지
          "Cache-Control": "private, no-store",

          "X-Content-Type-Options": "nosniff",
        },
      });
    } catch (error) {
      console.error(
        "Instructor data load error:",
        error
      );

      return Response.json(
        {
          message:
            "강사 데이터를 불러오는 중 오류가 발생했습니다.",
        },
        {
          status: 500,
        }
      );
    }
  },
};