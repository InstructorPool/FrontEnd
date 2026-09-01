// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Main from "./pages/MainPage";
// import RootLayout from "./layout/RootLayout";
// import NotFoundPage from "./pages/NotFoundPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         index: true,
//         element: <Main />,
//       },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;


// import "./index.css";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// import Main from "./pages/MainPage";
// import LoginPage from "./pages/LoginPage";
// import RootLayout from "./layout/RootLayout";
// import NotFoundPage from "./pages/NotFoundPage";

// /* ========================================
//    로그인 인증 후 MainPage 표시
// ======================================== */

// const AuthenticatedMain = () => {
//   const [
//     userEmail,
//     setUserEmail,
//   ] = useState<string | null>(null);

//   const [
//     isLoading,
//     setIsLoading,
//   ] = useState(true);

//   /* ========================================
//      기존 로그인 세션 확인

//      사이트에 처음 접속하거나 새로고침했을 때
//      HttpOnly 로그인 쿠키가 유효한지 확인
//   ======================================== */

//   useEffect(() => {
//     let isMounted = true;

//     const checkLogin = async () => {
//       try {
//         const response = await fetch(
//           "/api/auth/me",
//           {
//             method: "GET",
//             credentials: "include",
//             cache: "no-store",
//           }
//         );

//         /* 로그인 세션이 없거나 만료된 경우 */
//         if (!response.ok) {
//           if (isMounted) {
//             setUserEmail(null);
//           }

//           return;
//         }

//         const data = await response.json();

//         if (isMounted) {
//           setUserEmail(
//             data.email ?? null
//           );
//         }
//       } catch (error) {
//         console.error(
//           "로그인 상태 확인 실패:",
//           error
//         );

//         if (isMounted) {
//           setUserEmail(null);
//         }
//       } finally {
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }
//     };

//     checkLogin();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   /* ========================================
//      로그인 완료

//      LoginPage에서 인증번호 인증 성공 후 호출
//   ======================================== */

//   const handleLogin = (
//     email: string
//   ) => {
//     setUserEmail(email);
//   };

//   /* ========================================
//      로그아웃
//   ======================================== */

//   const handleLogout = async () => {
//     try {
//       await fetch(
//         "/api/auth/logout",
//         {
//           method: "POST",
//           credentials: "include",
//         }
//       );
//     } catch (error) {
//       console.error(
//         "로그아웃 실패:",
//         error
//       );
//     } finally {
//       /*
//        쿠키 삭제 API가 성공하거나
//        오류가 발생하더라도 프론트에서는
//        로그인 화면으로 이동
//       */
//       setUserEmail(null);
//     }
//   };

//   /* ========================================
//      로그인 상태 확인 중
//   ======================================== */

//   if (isLoading) {
//     return (
//       <main className="flex min-h-[60vh] items-center justify-center text-gray-500">
//         로그인 정보를 확인하는 중입니다...
//       </main>
//     );
//   }

//   /* ========================================
//      로그인하지 않은 경우

//      → LoginPage 표시
//   ======================================== */

//   if (!userEmail) {
//     return (
//       <LoginPage
//         onLogin={handleLogin}
//       />
//     );
//   }

//   /* ========================================
//      로그인한 경우

//      → 기존 강사 조회 MainPage 표시
//   ======================================== */

//   return (
//     <Main
//       userEmail={userEmail}
//       onLogout={handleLogout}
//     />
//   );
// };

// /* ========================================
//    Router
// ======================================== */

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <NotFoundPage />,

//     children: [
//       {
//         index: true,

//         element: <AuthenticatedMain />,
//       },
//     ],
//   },
// ]);

// /* ========================================
//    App
// ======================================== */

// function App() {
//   return (
//     <RouterProvider
//       router={router}
//     />
//   );
// }

// export default App;


import "./index.css";

import {
  useEffect,
  useState,
} from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layout/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";

/* ========================================
   로그인 확인 후 MainPage 표시
======================================== */

const AuthenticatedMain = () => {
  const [
    username,
    setUsername,
  ] =
    useState<string | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  /* ========================================
     기존 로그인 세션 확인
  ======================================== */

  useEffect(() => {
    const checkLogin =
      async () => {
        try {
          const response =
            await fetch(
              "/api/auth/me",
              {
                method: "GET",

                credentials:
                  "include",

                cache:
                  "no-store",
              }
            );

          if (!response.ok) {
            setUsername(null);
            return;
          }

          const data =
            await response.json();

          setUsername(
            data.username
          );
        } catch (error) {
          console.error(
            "로그인 상태 확인 실패:",
            error
          );

          setUsername(null);
        } finally {
          setIsLoading(false);
        }
      };

    checkLogin();
  }, []);

  /* ========================================
     로그인 완료
  ======================================== */

  const handleLogin = (
    username: string
  ) => {
    setUsername(username);
  };

  /* ========================================
     로그아웃
  ======================================== */

  const handleLogout =
    async () => {
      try {
        await fetch(
          "/api/auth/logout",
          {
            method: "POST",
            credentials:
              "include",
          }
        );
      } finally {
        setUsername(null);
      }
    };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-gray-500">
        로그인 정보를 확인하는 중입니다...
      </main>
    );
  }

  if (!username) {
    return (
      <LoginPage
        onLogin={
          handleLogin
        }
      />
    );
  }

  return (
    <Main
      userEmail={
        username
      }
      onLogout={
        handleLogout
      }
    />
  );
};

/* ========================================
   Router
======================================== */

const router =
  createBrowserRouter([
    {
      path: "/",

      element:
        <RootLayout />,

      errorElement:
        <NotFoundPage />,

      children: [
        {
          index: true,

          element:
            <AuthenticatedMain />,
        },
      ],
    },
  ]);

function App() {
  return (
    <RouterProvider
      router={router}
    />
  );
}

export default App;