import {
  categoryMap,
} from "../../data/categories";

type InstructorSearchFiltersProps = {
  category: string;
  subCategory: string;
  subCategories: string[];
  searchType: string;
  keyword: string;
  onlyKisia: boolean;
  onlySatisfaction: boolean;

  onCategoryChange: (
    value: string
  ) => void;

  onSubCategoryChange: (
    value: string
  ) => void;

  onSearchTypeChange: (
    value: string
  ) => void;

  onKeywordChange: (
    value: string
  ) => void;

  onOnlyKisiaChange: (
    value: boolean
  ) => void;

  onOnlySatisfactionChange: (
    value: boolean
  ) => void;

  onSearch: () => void;
};

const InstructorSearchFilters = ({
  category,
  subCategory,
  subCategories,
  searchType,
  keyword,
  onlyKisia,
  onlySatisfaction,

  onCategoryChange,
  onSubCategoryChange,
  onSearchTypeChange,
  onKeywordChange,
  onOnlyKisiaChange,
  onOnlySatisfactionChange,
  onSearch,
}: InstructorSearchFiltersProps) => {
  return (
    <section className="rounded-2xl bg-slate-50 px-8 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-3">

        {/* 대분류 */}
        <div className="relative min-w-44">
          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(
                e.target.value
              )
            }
            className="h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-11 text-sm font-medium text-gray-800 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
          >
            <option value="전체">
              대분류
            </option>

            {Object.keys(
              categoryMap
            ).map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 세부분류 */}
        <div className="relative min-w-44">
          <select
            value={subCategory}
            onChange={(e) =>
              onSubCategoryChange(
                e.target.value
              )
            }
            disabled={
              category === "전체"
            }
            className="h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-11 text-sm font-medium text-gray-800 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="전체">
              세부분류
            </option>

            {subCategories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <svg
            className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
              category === "전체"
                ? "text-gray-300"
                : "text-gray-500"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 검색 조건 */}
        <div className="relative min-w-32">
          <select
            value={searchType}
            onChange={(e) =>
              onSearchTypeChange(
                e.target.value
              )
            }
            className="h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-11 text-sm font-medium text-gray-800 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
          >
            <option value="전체">
              검색조건
            </option>

            <option value="이름">
              이름
            </option>

            <option value="기업명">
              기업명
            </option>

            <option value="강의분야">
              강의분야
            </option>
          </select>

          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="m6 9 6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ========================================
            KISIA 강의 이력 필터
        ======================================== */}

        <label
          className="
            flex
            h-12
            cursor-pointer
            items-center
            gap-2
            whitespace-nowrap
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            font-medium
            text-gray-700
            transition
            hover:border-[#7FA1C9]
          "
        >
          <input
            type="checkbox"
            checked={onlyKisia}
            onChange={(e) =>
              onOnlyKisiaChange(
                e.target.checked
              )
            }
            className="
              h-4
              w-4
              cursor-pointer
              accent-[#00337B]
            "
          />

          KISIA 강의 이력
        </label>

        <label
          className="
            flex
            h-12
            cursor-pointer
            items-center
            gap-2
            whitespace-nowrap
            rounded-md
            border
            border-gray-300
            bg-white
            px-4
            text-sm
            font-medium
            text-gray-700
            transition
            hover:border-[#7FA1C9]
          "
        >
          <input
            type="checkbox"
            checked={
              onlySatisfaction
            }
            onChange={(e) =>
              onOnlySatisfactionChange(
                e.target.checked
              )
            }
            className="
              h-4
              w-4
              cursor-pointer
              accent-[#00337B]
            "
          />

          만족도 등록
        </label>

        {/* 검색어 */}
        <input
          value={keyword}
          onChange={(e) =>
            onKeywordChange(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              onSearch();
            }
          }}
          placeholder="키워드를 입력하세요."
          className="h-12 w-60 rounded-md border border-gray-300 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
        />

        {/* 조회 버튼 */}
        <button
          type="button"
          onClick={onSearch}
          className="h-12 cursor-pointer rounded-md bg-[#00337B] px-8 font-semibold text-white transition hover:bg-[#00265C] focus:outline-none focus:ring-2 focus:ring-[#00337B]/30 focus:ring-offset-2"
        >
          조회하기
        </button>

      </div>
    </section>
  );
};

export default InstructorSearchFilters;