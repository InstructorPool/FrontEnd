// import NavBar from "../components/NavBar/NavBar";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#313131] font-[Pretendard]">
      <div className="w-full max-w-[400px] flex flex-col min-h-screen relative">
        <main className="flex-grow bg-[#f5f5f5]">
          <h1 className="text-2xl mb-4">❌페이지를 찾을 수 없습니다❌</h1>
          <a href="/" className="text-blue-400 hover:text-blue-700">
            홈으로 돌아가기
          </a>
        </main>
        {/* <NavBar /> */}
      </div>
    </div>
  );
};

export default NotFoundPage;