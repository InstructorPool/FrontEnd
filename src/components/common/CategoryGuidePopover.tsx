import {
  useRef,
  useState,
} from "react";

import {
  categoryMap,
} from "../../data/categories";

const CategoryGuidePopover = () => {
  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  /* ========================================
     팝업 닫기 지연 Timer
  ======================================== */

  const closeTimerRef =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);

  /* ========================================
     팝업 열기
  ======================================== */

  const handleOpen = () => {
    if (
      closeTimerRef.current
    ) {
      clearTimeout(
        closeTimerRef.current
      );

      closeTimerRef.current =
        null;
    }

    setIsOpen(true);
  };

  /* ========================================
        지연시간 적용
  ======================================== */

  const handleClose = () => {
    closeTimerRef.current =
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={
        handleOpen
      }
      onMouseLeave={
        handleClose
      }
    >
      {/* ? 버튼 */}
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            handleOpen();
          }
        }}
        className="
          flex
          h-5
          w-5
          cursor-help
          items-center
          justify-center
          rounded-full
          border
          border-gray-400
          bg-white
          text-xs
          font-bold
          text-gray-500
          transition
          hover:border-[#00337B]
          hover:text-[#00337B]
        "
        aria-label="강의 분야 분류 안내"
      >
        ?
      </button>

      {/* ========================================
          분류 설명
      ======================================== */}

      {isOpen && (
        <div
          className="
            absolute
            left-0
            top-full
            z-[100]
            w-[670px]
            pt-2
            pl-5
          "
          onMouseEnter={
            handleOpen
          }
          onMouseLeave={
            handleClose
          }
        >
          {/* 실제 팝업 */}
          <div
            className="
              max-h-[450px]
              w-[650px]
              overflow-y-auto
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-xl
            "
          >
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">
                강의 분야 분류 안내
              </h3>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                대분류는 강의 분야의 큰 범주이며,
                세부분류는 각 대분류에 포함되는
                구체적인 강의 분야입니다.
              </p>
            </div>

            {/* 표 */}
            <div className="overflow-hidden rounded-lg border border-gray-200">

              {/* 표 헤더 */}
              <div className="grid grid-cols-[140px_1fr] bg-[#F1F5FA]">

                <div className="border-r border-gray-200 px-4 py-3 text-sm font-bold text-[#00337B]">
                  대분류
                </div>

                <div className="px-4 py-3 text-sm font-bold text-[#00337B]">
                  세부분류
                </div>

              </div>

              {/* 분류 목록 */}
              {Object.entries(
                categoryMap
              ).map(
                ([
                  category,
                  subCategories,
                ]) => (
                  <div
                    key={
                      category
                    }
                    className="grid grid-cols-[140px_1fr] border-t border-gray-200"
                  >
                    {/* 대분류 */}
                    <div className="border-r border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800">
                      {
                        category
                      }
                    </div>

                    {/* 세부분류 */}
                    <div className="flex flex-wrap gap-1.5 px-4 py-3">

                      {subCategories.length >
                      0 ? (
                        subCategories.map(
                          (
                            subCategory
                          ) => (
                            <span
                              key={
                                subCategory
                              }
                              className="
                                rounded-md
                                border
                                border-[#C7D5E6]
                                bg-[#F1F5FA]
                                px-2
                                py-1
                                text-xs
                                text-[#00337B]
                              "
                            >
                              {
                                subCategory
                              }
                            </span>
                          )
                        )
                      ) : (
                        <span className="text-xs text-gray-400">
                          별도 세부분류 없음
                        </span>
                      )}

                    </div>
                  </div>
                )
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryGuidePopover;