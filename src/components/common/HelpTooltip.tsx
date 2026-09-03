type HelpTooltipProps = {
  text: string;
};

const HelpTooltip = ({
  text,
}: HelpTooltipProps) => {
  return (
    <div className="group relative inline-flex">

      {/* ? 버튼 */}
      <button
        type="button"
        className="flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-gray-400 bg-white text-xs font-bold text-gray-500 transition hover:border-[#00337B] hover:text-[#00337B] focus:outline-none focus:ring-2 focus:ring-[#00337B]/20"
        aria-label="도움말"
      >
        ?
      </button>

      {/* ========================================
          마우스 Hover 시 설명 표시
      ======================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          z-50
          mt-2
          hidden
          w-64
          -translate-x-1/2
          rounded-lg
          bg-gray-900
          px-3
          py-2.5
          text-left
          text-xs
          font-normal
          leading-5
          text-white
          shadow-lg
          group-hover:block
          group-focus-within:block
        "
      >
        {text}

        {/* 말풍선 삼각형 */}
        <div
          className="
            absolute
            bottom-full
            left-1/2
            -translate-x-1/2
            border-4
            border-transparent
            border-b-gray-900
          "
        />
      </div>

    </div>
  );
};

export default HelpTooltip;