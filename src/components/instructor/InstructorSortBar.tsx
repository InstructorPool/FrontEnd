type InstructorSortBarProps = {
  count: number;
  sort: string;

  onSortChange: (
    value: string
  ) => void;
};

const InstructorSortBar = ({
  count,
  sort,
  onSortChange,
}: InstructorSortBarProps) => {
  const sortOptions = [
    ["name", "이름"],
    ["company", "기업명"],
    ["career", "경력"],
  ];

  return (
    <section className="mb-5 mt-5 flex flex-wrap items-center justify-between gap-4">

      <div className="text-base text-gray-900">
        조회수{" "}
        <span className="font-bold text-[#00337B]">
          {count}
        </span>
        개
      </div>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          정렬 :
        </span>

        {sortOptions.map(
          ([
            value,
            label,
          ]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="radio"
                name="sort"
                value={value}
                checked={
                  sort === value
                }
                onChange={(e) =>
                  onSortChange(
                    e.target.value
                  )
                }
                className="h-5 w-5 accent-[#00337B]"
              />

              <span
                className={
                  sort === value
                    ? "font-semibold text-[#00337B]"
                    : "text-gray-700"
                }
              >
                {label}
              </span>
            </label>
          )
        )}

      </div>
    </section>
  );
};

export default InstructorSortBar;