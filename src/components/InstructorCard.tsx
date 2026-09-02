import type { Instructor } from "../types/instructor";


type InstructorCardProps = {
  instructor: Instructor;

  onOpen: (
    instructor: Instructor
  ) => void;
};

const InstructorCard = ({
  instructor,
  onOpen,
}: InstructorCardProps) => {
  return (
    <article className="flex min-h-[500px] flex-col rounded-3xl border border-gray-300 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#7FA1C9] hover:shadow-lg">

      <h2 className="text-2xl font-bold text-gray-900">
        {instructor.name}
      </h2>

      {instructor.categories.length >
        0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {instructor.categories.map(
            (item) => (
              <span
                key={item}
                className="rounded-md bg-[#00337B] px-2.5 py-1 text-xs font-medium text-white"
              >
                {item}
              </span>
            )
          )}
        </div>
      )}

      <div className="mb-3 mt-5 space-y-2 text-[15px] text-gray-800">

        {instructor.career >
          0 && (
          <p>
            <span className="font-bold">
              재직 경력 :
            </span>{" "}
            {instructor.career}년
          </p>
        )}

        {instructor.company && (
          <p>
            <span className="font-bold">
              소속 :
            </span>{" "}
            {instructor.company}
          </p>
        )}

        {instructor.department && (
          <p>
            <span className="font-bold">
              담당 업무 :
            </span>{" "}
            {instructor.department}
          </p>
        )}

        {instructor.role && (
          <p>
            <span className="font-bold">
              직책 :
            </span>{" "}
            {instructor.role}
          </p>
        )}

        {instructor.number && (
          <p>
            <span className="font-bold">
              연락처 :
            </span>{" "}
            {instructor.number}
          </p>
        )}

        {instructor.email && (
          <p className="break-all">
            <span className="font-bold">
              이메일 :
            </span>{" "}
            {instructor.email}
          </p>
        )}

      </div>

      {instructor.description && (
        <p className="mt-5 leading-7 text-gray-700">
          {instructor.description}
        </p>
      )}

      {/* KISIA 강의 이력 */}
      {(instructor
        .kisiaLectureHistories
        ?.length ?? 0) >
        0 && (
        <div className="mb-3 mt-5">

          <p className="mb-3 text-m font-bold text-gray-700">
            KISIA 강의 이력
          </p>

          <div className="space-y-2">

            {instructor
              .kisiaLectureHistories
              .map(
                (
                  lecture,
                  index
                ) => (
                  <div
                    key={`${
                      lecture.period ??
                      "kisia"
                    }-${index}`}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00337B]" />

                    <div>
                      {lecture.period && (
                        <span className="mr-2 font-semibold text-[#00337B]">
                          {
                            lecture.period
                          }
                        </span>
                      )}

                      <span>
                        {
                          lecture.content
                        }
                      </span>
                    </div>
                  </div>
                )
              )}

          </div>
        </div>
      )}

      {instructor.satisfaction
        ?.trim() && (
        <div className="mb-3 mt-3 text-sm font-semibold text-gray-700">

          <span className="font-bold">
            만족도 :
          </span>{" "}

          <span className="font-semibold text-black">
            {
              instructor.satisfaction
            }
          </span>

        </div>
      )}

      <div className="mt-auto border-t border-gray-200 pt-5">

        {instructor.topics.length >
          0 && (
          <>
            <p className="mb-3 text-m font-bold text-gray-700">
              강의 가능 분야
            </p>

            <div className="flex flex-wrap gap-2">

              {instructor.topics.map(
                (topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-[#C7D5E6] bg-[#F1F5FA] px-3 py-1.5 text-xs font-medium text-[#00337B]"
                  >
                    {topic}
                  </span>
                )
              )}

            </div>
          </>
        )}

        <button
          type="button"
          onClick={() =>
            onOpen(
              instructor
            )
          }
          className="mt-5 w-full cursor-pointer rounded-lg border border-[#00337B] py-2.5 text-sm font-semibold text-[#00337B] transition hover:bg-[#00337B] hover:text-white"
        >
          강사 이력 더보기
        </button>

      </div>
    </article>
  );
};

export default InstructorCard;