import {
  useEffect,
} from "react";

import type {
  Instructor,
} from "../../types/instructor";

type InstructorModalProps = {
  instructor: Instructor;
  onClose: () => void;
};

const InstructorModal = ({
  instructor,
  onClose,
}: InstructorModalProps) => {
  /* ========================================
     Modal
  ======================================== */

  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      e: globalThis.KeyboardEvent
    ) => {
      if (
        e.key === "Escape"
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="sticky top-0 z-20 flex items-start justify-between border-b border-gray-200 bg-white px-7 py-6">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {instructor.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              강사 상세 이력
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-[#00337B]"
          >
            ×
          </button>

        </div>

        <div className="px-7 py-7">

          {(instructor.company ||
            instructor.department ||
            instructor.role ||
            instructor.number ||
            instructor.email ||
            instructor
              .instructorGrade) && (
            <section className="rounded-xl bg-slate-50 p-5">

              <h3 className="mb-4 font-bold">
                기본 정보
              </h3>

              <div className="grid gap-3 text-sm sm:grid-cols-2">

                {instructor.company && (
                  <p>
                    <b>소속 :</b>{" "}
                    {
                      instructor.company
                    }
                  </p>
                )}

                {instructor.role && (
                  <p>
                    <b>직책 :</b>{" "}
                    {
                      instructor.role
                    }
                  </p>
                )}

                {instructor.department && (
                  <p>
                    <b>담당 업무 :</b>{" "}
                    {
                      instructor.department
                    }
                  </p>
                )}

                {/* 강사 등급 */}
                {instructor
                  .instructorGrade && (
                  <p>
                    <b>강사 등급 :</b>{" "}
                    {
                      instructor
                        .instructorGrade
                    }
                  </p>
                )}

                {instructor.number && (
                  <p>
                    <b>연락처 :</b>{" "}
                    {
                      instructor.number
                    }
                  </p>
                )}

                {instructor.email && (
                  <p className="break-all">
                    <b>이메일 :</b>{" "}
                    {
                      instructor.email
                    }
                  </p>
                )}

              </div>
            </section>
          )}

          {(instructor.workYears ||
            instructor
              .workHistories
              .length >
              0 ||
            instructor
              .formerCompanies
              .length >
              0) && (
            <section className="mt-8">

              <h3 className="mb-5 text-lg font-bold">
                근무 이력
              </h3>

              {instructor.workYears && (
                <div className="mb-6 rounded-xl border border-gray-200 px-5 py-4">

                  <b>
                    총 근무경력
                  </b>

                  <span className="ml-3">
                    {
                      instructor.workYears
                    }
                  </span>

                </div>
              )}

              {instructor
                .workHistories
                .length >
                0 && (
                <div className="mb-7">

                  {instructor.workHistories.map(
                    (
                      history,
                      index
                    ) => (
                      <div
                        key={index}
                        className="relative flex gap-5 border-l-2 border-[#C7D5E6] pb-7 pl-6 last:pb-0"
                      >

                        <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#00337B]" />

                        {history.period && (
                          <div className="w-24 shrink-0 text-sm font-bold text-[#00337B]">
                            {
                              history.period
                            }
                          </div>
                        )}

                        <div className="text-sm text-gray-700">
                          {
                            history.content
                          }
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

              {instructor
                .formerCompanies
                .length >
                0 && (
                <div className="flex flex-wrap gap-2">

                  {instructor.formerCompanies.map(
                    (company) => (
                      <span
                        key={company}
                        className="rounded-lg bg-gray-100 px-3 py-2 text-sm"
                      >
                        {company}
                      </span>
                    )
                  )}

                </div>
              )}

            </section>
          )}

          {instructor
            .lectureHistories
            .length >
            0 && (
            <section className="mt-8 border-t pt-7">

              <h3 className="mb-5 text-lg font-bold">
                강의 이력
              </h3>

              <ul className="space-y-3">

                {instructor.lectureHistories.map(
                  (
                    lecture,
                    index
                  ) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00337B]" />

                      <span>

                        {lecture.period && (
                          <strong className="mr-3 text-[#00337B]">
                            {
                              lecture.period
                            }
                          </strong>
                        )}

                        {
                          lecture.content
                        }

                      </span>
                    </li>
                  )
                )}

              </ul>
            </section>
          )}

          {instructor
            .historyRaw
            ?.trim() && (
            <section className="mt-8 border-t border-gray-200 pt-7">

              <h3 className="mb-4 text-lg font-bold text-gray-900">
                강사 이력
              </h3>

              <div className="rounded-xl bg-slate-50 px-5 py-4">

                <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                  {
                    instructor.historyRaw
                  }
                </p>

              </div>
            </section>
          )}

          {instructor
            .certifications
            .length >
            0 && (
            <section className="mt-8 border-t pt-7">

              <h3 className="mb-4 text-lg font-bold">
                자격
              </h3>

              <div className="flex flex-wrap gap-2">

                {instructor.certifications.map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#C7D5E6] bg-[#F1F5FA] px-3 py-1.5 text-sm text-[#00337B]"
                    >
                      {item}
                    </span>
                  )
                )}

              </div>
            </section>
          )}

          {instructor
            .publications
            .length >
            0 && (
            <section className="mt-8 border-t pt-7">

              <h3 className="mb-4 text-lg font-bold">
                저서
              </h3>

              <ul className="space-y-3">

                {instructor.publications.map(
                  (item) => (
                    <li key={item}>
                      • {item}
                    </li>
                  )
                )}

              </ul>
            </section>
          )}

          <div className="mt-9 flex justify-end border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg bg-[#00337B] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#00265C]"
            >
              닫기
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorModal;