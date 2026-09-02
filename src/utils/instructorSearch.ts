/* ========================================
   이름 유연 검색
   홍1 → 홍길동1
======================================== */

export const isSubsequence = (
  query: string,
  target: string
) => {
  const normalizedQuery =
    query
      .replace(/\s/g, "")
      .toLowerCase();

  const normalizedTarget =
    target
      .replace(/\s/g, "")
      .toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  let queryIndex = 0;

  for (
    const char of normalizedTarget
  ) {
    if (
      char ===
      normalizedQuery[
        queryIndex
      ]
    ) {
      queryIndex++;
    }

    if (
      queryIndex ===
      normalizedQuery.length
    ) {
      return true;
    }
  }

  return false;
};