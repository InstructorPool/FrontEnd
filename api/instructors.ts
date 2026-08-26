import { get } from "@vercel/blob";

export async function GET() {
  try {
    const result = await get("instructors.json", {
      access: "private",
    });

    if (!result || result.statusCode !== 200) {
      return Response.json(
        {
          message: "강사 데이터를 찾을 수 없습니다.",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(result.stream, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "강사 데이터를 불러오지 못했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}