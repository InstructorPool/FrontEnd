import CategoryGuidePopover from "../common/CategoryGuidePopover";

type MainHeaderProps = {
  userEmail: string;
  onLogout: () => void;
};

const MainHeader = ({
  userEmail,
  onLogout,
}: MainHeaderProps) => {
  return (
    <div className="relative mb-6">

      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          전문 강사 조회
        </h1>

        <CategoryGuidePopover />
      </div>

      {/* 로그인 사용자 + 로그아웃 */}
      <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-3">
        <span className="text-sm text-gray-500">
          {userEmail}
        </span>

        <button
          type="button"
          onClick={onLogout}
          className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-[#00337B] hover:text-[#00337B]"
        >
          로그아웃
        </button>
      </div>

    </div>
  );
};

export default MainHeader;