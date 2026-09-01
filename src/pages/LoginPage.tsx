// import {
//   useState,
// } from "react";

// type LoginPageProps = {
//   onLogin: (
//     email: string
//   ) => void;
// };

// const LoginPage = ({
//   onLogin,
// }: LoginPageProps) => {
//   const [
//     email,
//     setEmail,
//   ] = useState("");

//   const [
//     code,
//     setCode,
//   ] = useState("");

//   const [
//     codeSent,
//     setCodeSent,
//   ] = useState(false);

//   const [
//     isLoading,
//     setIsLoading,
//   ] = useState(false);

//   const [
//     message,
//     setMessage,
//   ] = useState("");

//   const [
//     errorMessage,
//     setErrorMessage,
//   ] = useState("");

//   /* ========================================
//      인증번호 발송
//   ======================================== */

//   const sendCode =
//     async () => {
//       setMessage("");
//       setErrorMessage("");

//       const normalizedEmail =
//         email
//           .trim()
//           .toLowerCase();

//       if (
//         !normalizedEmail
//       ) {
//         setErrorMessage(
//           "이메일을 입력해주세요."
//         );

//         return;
//       }

//       try {
//         setIsLoading(true);

//         const response =
//           await fetch(
//             "/api/auth/send-code",
//             {
//               method:
//                 "POST",

//               credentials:
//                 "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },

//               body:
//                 JSON.stringify({
//                   email:
//                     normalizedEmail,
//                 }),
//             }
//           );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           throw new Error(
//             data.message ??
//               "인증번호 발송에 실패했습니다."
//           );
//         }

//         setEmail(
//           normalizedEmail
//         );

//         setCodeSent(true);

//         setMessage(
//           "인증번호를 이메일로 발송했습니다."
//         );
//       } catch (error) {
//         setErrorMessage(
//           error instanceof Error
//             ? error.message
//             : "인증번호 발송에 실패했습니다."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//   /* ========================================
//      인증번호 확인
//   ======================================== */

//   const verifyCode =
//     async () => {
//       setMessage("");
//       setErrorMessage("");

//       if (
//         !/^\d{6}$/.test(
//           code
//         )
//       ) {
//         setErrorMessage(
//           "6자리 인증번호를 입력해주세요."
//         );

//         return;
//       }

//       try {
//         setIsLoading(true);

//         const response =
//           await fetch(
//             "/api/auth/verify-code",
//             {
//               method:
//                 "POST",

//               credentials:
//                 "include",

//               headers: {
//                 "Content-Type":
//                   "application/json",
//               },

//               body:
//                 JSON.stringify({
//                   email,
//                   code,
//                 }),
//             }
//           );

//         const data =
//           await response.json();

//         if (!response.ok) {
//           throw new Error(
//             data.message ??
//               "인증에 실패했습니다."
//           );
//         }

//         onLogin(
//           data.email
//         );
//       } catch (error) {
//         setErrorMessage(
//           error instanceof Error
//             ? error.message
//             : "인증에 실패했습니다."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-[#F1F5FA] px-6">
//       <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900">
//             전문 강사 조회
//           </h1>

//           <p className="mt-3 text-sm text-gray-500">
//             KISIA 임직원 전용
//           </p>
//         </div>

//         {!codeSent ? (
//           <>
//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               KISIA 이메일
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(
//                   e.target.value
//                 )
//               }
//               onKeyDown={(e) => {
//                 if (
//                   e.key ===
//                   "Enter"
//                 ) {
//                   sendCode();
//                 }
//               }}
//               placeholder="example@kisia.or.kr"
//               className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
//             />

//             <button
//               type="button"
//               onClick={
//                 sendCode
//               }
//               disabled={
//                 isLoading
//               }
//               className="mt-4 h-12 w-full cursor-pointer rounded-lg bg-[#00337B] font-semibold text-white transition hover:bg-[#00265C] disabled:cursor-not-allowed disabled:bg-gray-400"
//             >
//               {isLoading
//                 ? "발송 중..."
//                 : "인증번호 받기"}
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="mb-5 rounded-lg bg-[#F1F5FA] px-4 py-3 text-sm text-gray-700">
//               <span className="font-semibold text-[#00337B]">
//                 {email}
//               </span>

//               <br />

//               위 이메일로 인증번호를 발송했습니다.
//             </div>

//             <label className="mb-2 block text-sm font-semibold text-gray-700">
//               인증번호
//             </label>

//             <input
//               value={code}
//               autoFocus
//               inputMode="numeric"
//               maxLength={6}
//               onChange={(e) =>
//                 setCode(
//                   e.target.value
//                     .replace(
//                       /\D/g,
//                       ""
//                     )
//                     .slice(
//                       0,
//                       6
//                     )
//                 )
//               }
//               onKeyDown={(e) => {
//                 if (
//                   e.key ===
//                   "Enter"
//                 ) {
//                   verifyCode();
//                 }
//               }}
//               placeholder="6자리 인증번호"
//               className="h-12 w-full rounded-lg border border-gray-300 px-4 text-center text-lg tracking-[0.35em] outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
//             />

//             <button
//               type="button"
//               onClick={
//                 verifyCode
//               }
//               disabled={
//                 isLoading
//               }
//               className="mt-4 h-12 w-full cursor-pointer rounded-lg bg-[#00337B] font-semibold text-white transition hover:bg-[#00265C] disabled:cursor-not-allowed disabled:bg-gray-400"
//             >
//               {isLoading
//                 ? "인증 중..."
//                 : "인증하고 로그인"}
//             </button>

//             <button
//               type="button"
//               onClick={() => {
//                 setCodeSent(
//                   false
//                 );

//                 setCode("");

//                 setMessage("");

//                 setErrorMessage("");
//               }}
//               className="mt-3 w-full cursor-pointer py-2 text-sm font-medium text-gray-500 hover:text-[#00337B]"
//             >
//               이메일 다시 입력하기
//             </button>
//           </>
//         )}

//         {message && (
//           <p className="mt-4 text-center text-sm text-[#00337B]">
//             {message}
//           </p>
//         )}

//         {errorMessage && (
//           <p className="mt-4 text-center text-sm text-red-600">
//             {errorMessage}
//           </p>
//         )}

//         <p className="mt-8 border-t border-gray-100 pt-5 text-center text-xs leading-5 text-gray-400">
//           본 서비스는 KISIA 내부 강사 정보 조회를 위한 서비스입니다.
//         </p>
//       </div>
//     </main>
//   );
// };

// export default LoginPage;


import {
  useState,
} from "react";

type LoginPageProps = {
  onLogin: (
    username: string
  ) => void;
};

const LoginPage = ({
  onLogin,
}: LoginPageProps) => {
  const [
    username,
    setUsername,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  /* ========================================
     로그인
  ======================================== */

  const handleLogin =
    async () => {
      setErrorMessage("");

      if (
        !username.trim() ||
        !password
      ) {
        setErrorMessage(
          "아이디와 비밀번호를 입력해주세요."
        );

        return;
      }

      try {
        setIsLoading(true);

        const response =
          await fetch(
            "/api/auth/login",
            {
              method: "POST",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  username:
                    username.trim(),

                  password,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              "로그인에 실패했습니다."
          );
        }

        onLogin(
          data.username
        );
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "로그인에 실패했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F1F5FA] px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            전문 강사 조회
          </h1>

        </div>

        {/* 아이디 */}

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          아이디
        </label>

        <input
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          placeholder="아이디"
          autoComplete="username"
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
        />

        {/* 비밀번호 */}

        <label className="mb-2 mt-4 block text-sm font-semibold text-gray-700">
          비밀번호
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              handleLogin();
            }
          }}
          placeholder="비밀번호"
          autoComplete="current-password"
          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
        />

        {/* 로그인 버튼 */}

        <button
          type="button"
          onClick={
            handleLogin
          }
          disabled={
            isLoading
          }
          className="mt-6 h-12 w-full cursor-pointer rounded-lg bg-[#00337B] font-semibold text-white transition hover:bg-[#00265C] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading
            ? "로그인 중..."
            : "로그인"}
        </button>

        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <p className="mt-8 border-t border-gray-100 pt-5 text-center text-xs leading-5 text-gray-400">
          본 서비스는 KISIA 내부 강사 정보 조회를 위한 서비스입니다.
        </p>

      </div>
    </main>
  );
};

export default LoginPage;