// import {
//   createHmac,
//   randomBytes,
//   randomInt,
//   timingSafeEqual,
// } from "node:crypto";

// import {
//   SignJWT,
//   jwtVerify,
// } from "jose";

// /* ========================================
//    설정
// ======================================== */

// const KISIA_DOMAIN =
//   "kisia.or.kr";

// export const OTP_COOKIE_NAME =
//   "instructorpool_otp";

// export const SESSION_COOKIE_NAME =
//   "instructorpool_session";

// const OTP_EXPIRES_SECONDS =
//   60 * 5; // 5분

// const SESSION_EXPIRES_SECONDS =
//   60 * 60 * 24 * 7; // 7일

// /* ========================================
//    Secret
// ======================================== */

// const getSecret = () => {
//   const secret =
//     process.env.AUTH_SECRET;

//   if (!secret) {
//     throw new Error(
//       "AUTH_SECRET 환경변수가 없습니다."
//     );
//   }

//   return new TextEncoder().encode(
//     secret
//   );
// };

// const getSecretString = () => {
//   const secret =
//     process.env.AUTH_SECRET;

//   if (!secret) {
//     throw new Error(
//       "AUTH_SECRET 환경변수가 없습니다."
//     );
//   }

//   return secret;
// };

// /* ========================================
//    이메일
// ======================================== */

// export const normalizeEmail = (
//   email: string
// ) => {
//   return email
//     .trim()
//     .toLowerCase();
// };

// export const isKisiaEmail = (
//   email: string
// ) => {
//   const normalizedEmail =
//     normalizeEmail(email);

//   const parts =
//     normalizedEmail.split("@");

//   if (parts.length !== 2) {
//     return false;
//   }

//   return (
//     parts[0].length > 0 &&
//     parts[1] === KISIA_DOMAIN
//   );
// };

// /* ========================================
//    인증번호 생성
// ======================================== */

// export const generateOtpCode =
//   () => {
//     return randomInt(
//       100000,
//       1000000
//     ).toString();
//   };

// /* ========================================
//    OTP Hash
// ======================================== */

// const createOtpHash = (
//   email: string,
//   code: string,
//   nonce: string
// ) => {
//   return createHmac(
//     "sha256",
//     getSecretString()
//   )
//     .update(
//       `${email}:${nonce}:${code}`
//     )
//     .digest("hex");
// };

// const safeEqual = (
//   valueA: string,
//   valueB: string
// ) => {
//   const a =
//     Buffer.from(valueA);

//   const b =
//     Buffer.from(valueB);

//   if (
//     a.length !== b.length
//   ) {
//     return false;
//   }

//   return timingSafeEqual(a, b);
// };

// /* ========================================
//    OTP Challenge 생성
// ======================================== */

// export const createOtpToken =
//   async (
//     email: string,
//     code: string
//   ) => {
//     const normalizedEmail =
//       normalizeEmail(email);

//     const nonce =
//       randomBytes(16)
//         .toString("hex");

//     const codeHash =
//       createOtpHash(
//         normalizedEmail,
//         code,
//         nonce
//       );

//     return new SignJWT({
//       type: "otp",
//       email: normalizedEmail,
//       nonce,
//       codeHash,
//     })
//       .setProtectedHeader({
//         alg: "HS256",
//       })
//       .setIssuedAt()
//       .setExpirationTime(
//         "5m"
//       )
//       .sign(
//         getSecret()
//       );
//   };

// /* ========================================
//    OTP 검증
// ======================================== */

// export const verifyOtpToken =
//   async (
//     token: string,
//     email: string,
//     code: string
//   ) => {
//     try {
//       const { payload } =
//         await jwtVerify(
//           token,
//           getSecret()
//         );

//       if (
//         payload.type !==
//         "otp"
//       ) {
//         return false;
//       }

//       const normalizedEmail =
//         normalizeEmail(email);

//       if (
//         payload.email !==
//         normalizedEmail
//       ) {
//         return false;
//       }

//       if (
//         typeof payload.nonce !==
//           "string" ||
//         typeof payload.codeHash !==
//           "string"
//       ) {
//         return false;
//       }

//       const expectedHash =
//         createOtpHash(
//           normalizedEmail,
//           code,
//           payload.nonce
//         );

//       return safeEqual(
//         payload.codeHash,
//         expectedHash
//       );
//     } catch {
//       return false;
//     }
//   };

// /* ========================================
//    로그인 세션 생성
// ======================================== */

// export const createSessionToken =
//   async (
//     email: string
//   ) => {
//     return new SignJWT({
//       type: "session",
//       email:
//         normalizeEmail(email),
//     })
//       .setProtectedHeader({
//         alg: "HS256",
//       })
//       .setIssuedAt()
//       .setExpirationTime(
//         "7d"
//       )
//       .sign(
//         getSecret()
//       );
//   };

// /* ========================================
//    로그인 세션 검증
// ======================================== */

// export const verifySessionToken =
//   async (
//     token: string
//   ) => {
//     try {
//       const { payload } =
//         await jwtVerify(
//           token,
//           getSecret()
//         );

//       if (
//         payload.type !==
//         "session"
//       ) {
//         return null;
//       }

//       if (
//         typeof payload.email !==
//         "string"
//       ) {
//         return null;
//       }

//       if (
//         !isKisiaEmail(
//           payload.email
//         )
//       ) {
//         return null;
//       }

//       return {
//         email:
//           payload.email,
//       };
//     } catch {
//       return null;
//     }
//   };

// /* ========================================
//    Cookie 읽기
// ======================================== */

// export const getCookie = (
//   request: Request,
//   name: string
// ) => {
//   const cookieHeader =
//     request.headers.get(
//       "cookie"
//     );

//   if (!cookieHeader) {
//     return null;
//   }

//   const cookies =
//     cookieHeader.split(";");

//   for (
//     const cookie of cookies
//   ) {
//     const [
//       key,
//       ...valueParts
//     ] =
//       cookie
//         .trim()
//         .split("=");

//     if (key === name) {
//       return decodeURIComponent(
//         valueParts.join("=")
//       );
//     }
//   }

//   return null;
// };

// /* ========================================
//    Secure Cookie 여부
// ======================================== */

// const useSecureCookie =
//   () => {
//     return (
//       process.env.NODE_ENV ===
//         "production" ||
//       Boolean(
//         process.env.VERCEL
//       )
//     );
//   };

// /* ========================================
//    OTP Cookie
// ======================================== */

// export const createOtpCookie = (
//   token: string
// ) => {
//   return [
//     `${OTP_COOKIE_NAME}=${encodeURIComponent(
//       token
//     )}`,
//     "Path=/",
//     "HttpOnly",
//     "SameSite=Strict",
//     useSecureCookie()
//       ? "Secure"
//       : "",
//     `Max-Age=${OTP_EXPIRES_SECONDS}`,
//   ]
//     .filter(Boolean)
//     .join("; ");
// };

// /* ========================================
//    로그인 Cookie
// ======================================== */

// export const createSessionCookie = (
//   token: string
// ) => {
//   return [
//     `${SESSION_COOKIE_NAME}=${encodeURIComponent(
//       token
//     )}`,
//     "Path=/",
//     "HttpOnly",
//     "SameSite=Strict",
//     useSecureCookie()
//       ? "Secure"
//       : "",
//     `Max-Age=${SESSION_EXPIRES_SECONDS}`,
//   ]
//     .filter(Boolean)
//     .join("; ");
// };

// /* ========================================
//    Cookie 삭제
// ======================================== */

// export const clearCookie = (
//   name: string
// ) => {
//   return [
//     `${name}=`,
//     "Path=/",
//     "HttpOnly",
//     "SameSite=Strict",
//     useSecureCookie()
//       ? "Secure"
//       : "",
//     "Max-Age=0",
//   ]
//     .filter(Boolean)
//     .join("; ");
// };

// /* ========================================
//    로그인한 이메일 조회
// ======================================== */

// export const getAuthenticatedEmail =
//   async (
//     request: Request
//   ) => {
//     const token =
//       getCookie(
//         request,
//         SESSION_COOKIE_NAME
//       );

//     if (!token) {
//       return null;
//     }

//     const session =
//       await verifySessionToken(
//         token
//       );

//     return (
//       session?.email ??
//       null
//     );
//   };




import {
  SignJWT,
  jwtVerify,
} from "jose";

/* ========================================
   로그인 세션 설정
======================================== */

export const SESSION_COOKIE_NAME =
  "instructorpool_session";

/* 로그인 유지기간: 7일 */
const SESSION_EXPIRES_SECONDS =
  60 * 60 * 24 * 7;

/* ========================================
   AUTH_SECRET
======================================== */

const getSecret = () => {
  const secret =
    process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error(
      "AUTH_SECRET 환경변수가 없습니다."
    );
  }

  return new TextEncoder().encode(
    secret
  );
};

/* ========================================
   로그인 세션 생성
======================================== */

export const createSessionToken =
  async (
    username: string
  ) => {
    return new SignJWT({
      type: "session",
      username,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(getSecret());
  };

/* ========================================
   로그인 세션 검증
======================================== */

export const verifySessionToken =
  async (
    token: string
  ) => {
    try {
      const { payload } =
        await jwtVerify(
          token,
          getSecret()
        );

      if (
        payload.type !==
        "session"
      ) {
        return null;
      }

      if (
        typeof payload.username !==
        "string"
      ) {
        return null;
      }

      return {
        username:
          payload.username,
      };
    } catch {
      return null;
    }
  };

/* ========================================
   Cookie 읽기
======================================== */

export const getCookie = (
  request: Request,
  name: string
) => {
  const cookieHeader =
    request.headers.get(
      "cookie"
    );

  if (!cookieHeader) {
    return null;
  }

  const cookies =
    cookieHeader.split(";");

  for (const cookie of cookies) {
    const [
      key,
      ...valueParts
    ] =
      cookie
        .trim()
        .split("=");

    if (key === name) {
      return decodeURIComponent(
        valueParts.join("=")
      );
    }
  }

  return null;
};

/* ========================================
   Secure Cookie 여부
======================================== */

const useSecureCookie = () => {
  return (
    process.env.NODE_ENV ===
      "production" ||
    Boolean(process.env.VERCEL)
  );
};

/* ========================================
   로그인 Cookie 생성
======================================== */

export const createSessionCookie = (
  token: string
) => {
  return [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(
      token
    )}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",

    useSecureCookie()
      ? "Secure"
      : "",

    `Max-Age=${SESSION_EXPIRES_SECONDS}`,
  ]
    .filter(Boolean)
    .join("; ");
};

/* ========================================
   Cookie 삭제
======================================== */

export const clearCookie = (
  name: string
) => {
  return [
    `${name}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",

    useSecureCookie()
      ? "Secure"
      : "",

    "Max-Age=0",
  ]
    .filter(Boolean)
    .join("; ");
};

/* ========================================
   현재 로그인 사용자 확인
======================================== */

export const getAuthenticatedUser =
  async (
    request: Request
  ) => {
    const token =
      getCookie(
        request,
        SESSION_COOKIE_NAME
      );

    if (!token) {
      return null;
    }

    return await verifySessionToken(
      token
    );
  };