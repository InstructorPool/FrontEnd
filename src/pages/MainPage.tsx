// import { useEffect, useMemo, useState } from "react";
// import type { KeyboardEvent } from "react";

// import { instructors } from "../data/instructors";
// import { categoryMap } from "../data/categories";
// import type { Instructor } from "../types/instructor";

// const MainPage = () => {
//   const [category, setCategory] = useState("전체");
//   const [subCategory, setSubCategory] = useState("전체");

//   const [searchType, setSearchType] = useState("전체");

//   const [keyword, setKeyword] = useState("");
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const [sort, setSort] = useState("name");

//   const [selectedInstructor, setSelectedInstructor] =
//     useState<Instructor | null>(null);

//   const subCategories =
//     category === "전체"
//       ? []
//       : categoryMap[category] ?? [];

//   /* ========================================
//      이름 유연 검색
//      홍1 → 홍길동1 검색 가능
//   ======================================== */

//   const isSubsequence = (
//     query: string,
//     target: string
//   ) => {
//     const normalizedQuery = query
//       .replace(/\s/g, "")
//       .toLowerCase();

//     const normalizedTarget = target
//       .replace(/\s/g, "")
//       .toLowerCase();

//     if (!normalizedQuery) {
//       return true;
//     }

//     let queryIndex = 0;

//     for (const char of normalizedTarget) {
//       if (
//         char === normalizedQuery[queryIndex]
//       ) {
//         queryIndex++;
//       }

//       if (
//         queryIndex ===
//         normalizedQuery.length
//       ) {
//         return true;
//       }
//     }

//     return false;
//   };

//   /* ========================================
//      Modal
//   ======================================== */

//   useEffect(() => {
//     if (!selectedInstructor) {
//       document.body.style.overflow = "";
//       return;
//     }

//     document.body.style.overflow = "hidden";

//     const handleEscape = (
//       e: globalThis.KeyboardEvent
//     ) => {
//       if (e.key === "Escape") {
//         setSelectedInstructor(null);
//       }
//     };

//     window.addEventListener(
//       "keydown",
//       handleEscape
//     );

//     return () => {
//       document.body.style.overflow = "";

//       window.removeEventListener(
//         "keydown",
//         handleEscape
//       );
//     };
//   }, [selectedInstructor]);

//   /* ========================================
//      Events
//   ======================================== */

//   const handleCategoryChange = (
//     value: string
//   ) => {
//     setCategory(value);
//     setSubCategory("전체");
//   };

//   const handleSearch = () => {
//     setSearchKeyword(keyword);
//   };

//   const handleKeyDown = (
//     e: KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   /* ========================================
//      Filter / Sort
//   ======================================== */

//   const filteredInstructors = useMemo(() => {
//     const result = instructors.filter(
//       (instructor) => {
//         const categoryMatch =
//           category === "전체" ||
//           instructor.categories.includes(
//             category
//           );

//         const subCategoryMatch =
//           subCategory === "전체" ||
//           instructor.topics.includes(
//             subCategory
//           );

//         const targetKeyword =
//           searchKeyword
//             .trim()
//             .toLowerCase();

//         if (!targetKeyword) {
//           return (
//             categoryMatch &&
//             subCategoryMatch
//           );
//         }

//         let searchMatch = false;

//         /* 이름 검색 */
//         if (searchType === "이름") {
//           searchMatch = isSubsequence(
//             targetKeyword,
//             instructor.name
//           );
//         }

//         /* 기업명 검색 */
//         else if (
//           searchType === "기업명"
//         ) {
//           searchMatch =
//             instructor.company
//               .toLowerCase()
//               .includes(targetKeyword);
//         }

//         /* 강의분야 검색 */
//         else if (
//           searchType === "강의분야"
//         ) {
//           searchMatch =
//             instructor.topics.some(
//               (topic) =>
//                 topic
//                   .toLowerCase()
//                   .includes(
//                     targetKeyword
//                   )
//             );
//         }

//         /* 전체 검색 */
//         else {
//           searchMatch =
//             isSubsequence(
//               targetKeyword,
//               instructor.name
//             ) ||
//             instructor.company
//               .toLowerCase()
//               .includes(
//                 targetKeyword
//               ) ||
//             instructor.department
//               .toLowerCase()
//               .includes(
//                 targetKeyword
//               ) ||
//             instructor.role
//               .toLowerCase()
//               .includes(
//                 targetKeyword
//               ) ||
//             instructor.topics.some(
//               (topic) =>
//                 topic
//                   .toLowerCase()
//                   .includes(
//                     targetKeyword
//                   )
//             );
//         }

//         return (
//           categoryMatch &&
//           subCategoryMatch &&
//           searchMatch
//         );
//       }
//     );

//     return [...result].sort(
//       (a, b) => {
//         if (sort === "name") {
//           return a.name.localeCompare(
//             b.name,
//             "ko"
//           );
//         }

//         if (sort === "company") {
//           return a.company.localeCompare(
//             b.company,
//             "ko"
//           );
//         }

//         if (sort === "career") {
//           return (
//             b.career - a.career
//           );
//         }

//         return 0;
//       }
//     );
//   }, [
//     category,
//     subCategory,
//     searchType,
//     searchKeyword,
//     sort,
//   ]);

//   return (
//     <main className="min-h-screen bg-white px-6">
//       <div className="mx-auto max-w-7xl">

//         {/* ========================================
//             제목 + 검색 영역 고정
//         ======================================== */}

//         <div className="sticky top-0 z-40 bg-white/95 pb-5 pt-8 backdrop-blur-sm">

//           {/* 제목 */}
//           <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
//             전문 강사 조회
//           </h1>

//           {/* 검색 영역 */}
//           <section className="rounded-2xl bg-slate-50 px-8 py-5 shadow-sm">
//             <div className="flex flex-wrap items-center justify-center gap-3">

//               {/* 대분류 */}
//               <select
//                 value={category}
//                 onChange={(e) =>
//                   handleCategoryChange(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   h-12 min-w-44
//                   rounded-md
//                   border border-gray-300
//                   bg-white px-4
//                   text-sm font-medium
//                   text-gray-800
//                   outline-none
//                   transition
//                   focus:border-[#00337B]
//                   focus:ring-2
//                   focus:ring-[#00337B]/15
//                 "
//               >
//                 <option value="전체">
//                   대분류
//                 </option>

//                 {Object.keys(
//                   categoryMap
//                 ).map((item) => (
//                   <option
//                     key={item}
//                     value={item}
//                   >
//                     {item}
//                   </option>
//                 ))}
//               </select>

//               {/* 세부분류 */}
//               <select
//                 value={subCategory}
//                 onChange={(e) =>
//                   setSubCategory(
//                     e.target.value
//                   )
//                 }
//                 disabled={
//                   category === "전체"
//                 }
//                 className="
//                   h-12 min-w-44
//                   rounded-md
//                   border border-gray-300
//                   bg-white px-4
//                   text-sm font-medium
//                   text-gray-800
//                   outline-none
//                   transition
//                   focus:border-[#00337B]
//                   focus:ring-2
//                   focus:ring-[#00337B]/15
//                   disabled:cursor-not-allowed
//                   disabled:bg-gray-100
//                   disabled:text-gray-400
//                 "
//               >
//                 <option value="전체">
//                   세부분류
//                 </option>

//                 {subCategories.map(
//                   (item) => (
//                     <option
//                       key={item}
//                       value={item}
//                     >
//                       {item}
//                     </option>
//                   )
//                 )}
//               </select>

//               {/* 검색 조건 */}
//               <select
//                 value={searchType}
//                 onChange={(e) =>
//                   setSearchType(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   h-12 min-w-32
//                   rounded-md
//                   border border-gray-300
//                   bg-white px-4
//                   text-sm font-medium
//                   text-gray-800
//                   outline-none
//                   transition
//                   focus:border-[#00337B]
//                   focus:ring-2
//                   focus:ring-[#00337B]/15
//                 "
//               >
//                 <option value="전체">
//                   검색조건
//                 </option>

//                 <option value="이름">
//                   이름
//                 </option>

//                 <option value="기업명">
//                   기업명
//                 </option>

//                 <option value="강의분야">
//                   강의분야
//                 </option>
//               </select>

//               {/* 검색어 */}
//               <input
//                 value={keyword}
//                 onChange={(e) =>
//                   setKeyword(
//                     e.target.value
//                   )
//                 }
//                 onKeyDown={
//                   handleKeyDown
//                 }
//                 placeholder="키워드를 입력하세요."
//                 className="
//                   h-12 w-60
//                   rounded-md
//                   border border-gray-300
//                   bg-white px-4
//                   text-sm
//                   outline-none
//                   transition
//                   placeholder:text-gray-400
//                   focus:border-[#00337B]
//                   focus:ring-2
//                   focus:ring-[#00337B]/15
//                 "
//               />

//               {/* 조회 */}
//               <button
//                 type="button"
//                 onClick={
//                   handleSearch
//                 }
//                 className="
//                   h-12
//                   rounded-md
//                   bg-[#00337B]
//                   px-8
//                   font-semibold
//                   text-white
//                   transition
//                   hover:bg-[#00265C]
//                   focus:outline-none
//                   focus:ring-2
//                   focus:ring-[#00337B]/30
//                   focus:ring-offset-2
//                 "
//               >
//                 조회하기
//               </button>
//             </div>
//           </section>
//         </div>

//         {/* ========================================
//             조회 수 / 정렬
//         ======================================== */}

//         <section className="mb-5 mt-5 flex flex-wrap items-center justify-between gap-4">

//           <div className="text-base text-gray-900">
//             조회수{" "}
//             <span className="font-bold text-[#00337B]">
//               {
//                 filteredInstructors.length
//               }
//             </span>
//             개
//           </div>

//           <div className="flex items-center gap-4">
//             <span className="font-medium">
//               정렬 :
//             </span>

//             {[
//               ["name", "이름"],
//               ["company", "기업명"],
//               ["career", "경력"],
//             ].map(
//               ([value, label]) => (
//                 <label
//                   key={value}
//                   className="flex cursor-pointer items-center gap-2"
//                 >
//                   <input
//                     type="radio"
//                     name="sort"
//                     value={value}
//                     checked={
//                       sort === value
//                     }
//                     onChange={(e) =>
//                       setSort(
//                         e.target.value
//                       )
//                     }
//                     className="h-5 w-5 accent-[#00337B]"
//                   />

//                   <span
//                     className={
//                       sort === value
//                         ? "font-semibold text-[#00337B]"
//                         : "text-gray-700"
//                     }
//                   >
//                     {label}
//                   </span>
//                 </label>
//               )
//             )}
//           </div>
//         </section>

//         {/* ========================================
//             강사 카드
//         ======================================== */}

//         {filteredInstructors.length >
//         0 ? (
//           <section className="grid grid-cols-1 gap-5 pb-12 md:grid-cols-2 xl:grid-cols-3">

//             {filteredInstructors.map(
//               (instructor) => (
//                 <article
//                   key={
//                     instructor.id
//                   }
//                   className="
//                     flex min-h-[500px]
//                     flex-col
//                     rounded-3xl
//                     border border-gray-300
//                     bg-white p-6
//                     transition
//                     duration-200
//                     hover:-translate-y-1
//                     hover:border-[#7FA1C9]
//                     hover:shadow-lg
//                   "
//                 >

//                   {/* 이름 */}
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     {
//                       instructor.name
//                     }
//                   </h2>

//                   {/* 대분류 */}
//                   {instructor
//                     .categories.length >
//                     0 && (
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {instructor.categories.map(
//                         (item) => (
//                           <span
//                             key={
//                               item
//                             }
//                             className="
//                               rounded-md
//                               bg-[#00337B]
//                               px-2.5
//                               py-1
//                               text-xs
//                               font-medium
//                               text-white
//                             "
//                           >
//                             {
//                               item
//                             }
//                           </span>
//                         )
//                       )}
//                     </div>
//                   )}

//                   {/* 기본 정보 */}
//                   <div className="mt-5 space-y-2 text-[15px] text-gray-800">

//                     {instructor.career >
//                       0 && (
//                       <p>
//                         <span className="font-bold">
//                           재직 경력 :
//                         </span>{" "}
//                         {
//                           instructor.career
//                         }
//                         년
//                       </p>
//                     )}

//                     {instructor.company && (
//                       <p>
//                         <span className="font-bold">
//                           소속 :
//                         </span>{" "}
//                         {
//                           instructor.company
//                         }
//                       </p>
//                     )}

//                     {instructor.department && (
//                       <p>
//                         <span className="font-bold">
//                           담당 업무 :
//                         </span>{" "}
//                         {
//                           instructor.department
//                         }
//                       </p>
//                     )}

//                     {instructor.role && (
//                       <p>
//                         <span className="font-bold">
//                           직책 :
//                         </span>{" "}
//                         {
//                           instructor.role
//                         }
//                       </p>
//                     )}

//                     {instructor.number && (
//                       <p>
//                         <span className="font-bold">
//                           연락처 :
//                         </span>{" "}
//                         {
//                           instructor.number
//                         }
//                       </p>
//                     )}

//                     {instructor.email && (
//                       <p className="break-all">
//                         <span className="font-bold">
//                           이메일 :
//                         </span>{" "}
//                         {
//                           instructor.email
//                         }
//                       </p>
//                     )}
//                   </div>

//                   {/* 설명 */}
//                   {instructor.description && (
//                     <p className="mt-5 leading-7 text-gray-700">
//                       {
//                         instructor.description
//                       }
//                     </p>
//                   )}

//                   {/* 하단 */}
//                   <div className="mt-auto border-t border-gray-200 pt-5">

//                     {/* 강의 가능 분야 */}
//                     {instructor.topics
//                       .length > 0 && (
//                       <>
//                         <p className="mb-3 text-sm font-bold text-gray-700">
//                           강의 가능 분야
//                         </p>

//                         <div className="flex flex-wrap gap-2">
//                           {instructor.topics.map(
//                             (
//                               topic
//                             ) => (
//                               <span
//                                 key={
//                                   topic
//                                 }
//                                 className="
//                                   rounded-full
//                                   border
//                                   border-[#C7D5E6]
//                                   bg-[#F1F5FA]
//                                   px-3
//                                   py-1.5
//                                   text-xs
//                                   font-medium
//                                   text-[#00337B]
//                                 "
//                               >
//                                 {
//                                   topic
//                                 }
//                               </span>
//                             )
//                           )}
//                         </div>
//                       </>
//                     )}

//                     {/* 이력 버튼 */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setSelectedInstructor(
//                           instructor
//                         )
//                       }
//                       className="
//                         mt-5
//                         w-full
//                         rounded-lg
//                         border
//                         border-[#00337B]
//                         py-2.5
//                         text-sm
//                         font-semibold
//                         text-[#00337B]
//                         transition
//                         hover:bg-[#00337B]
//                         hover:text-white
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-[#00337B]/25
//                         focus:ring-offset-2
//                       "
//                     >
//                       강사 이력 더보기
//                     </button>
//                   </div>
//                 </article>
//               )
//             )}
//           </section>
//         ) : (
//           <div className="flex h-60 items-center justify-center rounded-2xl bg-gray-50 text-gray-500">
//             검색 조건에 맞는
//             강사가 없습니다.
//           </div>
//         )}
//       </div>

//       {/* ========================================
//           강사 상세 Modal
//       ======================================== */}

//       {selectedInstructor && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
//           onClick={() =>
//             setSelectedInstructor(
//               null
//             )
//           }
//         >
//           <div
//             className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >

//             {/* Header */}
//             <div className="sticky top-0 z-20 flex items-start justify-between border-b border-gray-200 bg-white px-7 py-6">

//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {
//                     selectedInstructor.name
//                   }
//                 </h2>

//                 <p className="mt-1 text-sm text-gray-500">
//                   강사 상세 이력
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 aria-label="팝업 닫기"
//                 onClick={() =>
//                   setSelectedInstructor(
//                     null
//                   )
//                 }
//                 className="flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-[#00337B]"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="px-7 py-7">

//               {/* 기본 정보 */}
//               {(selectedInstructor.company ||
//                 selectedInstructor.department ||
//                 selectedInstructor.role ||
//                 selectedInstructor.number ||
//                 selectedInstructor.email) && (
//                 <section className="rounded-xl bg-slate-50 p-5">

//                   <h3 className="mb-4 text-base font-bold text-gray-900">
//                     기본 정보
//                   </h3>

//                   <div className="grid gap-x-8 gap-y-3 text-sm text-gray-700 sm:grid-cols-2">

//                     {selectedInstructor.company && (
//                       <p>
//                         <span className="font-semibold text-gray-900">
//                           소속 :
//                         </span>{" "}
//                         {
//                           selectedInstructor.company
//                         }
//                       </p>
//                     )}

//                     {selectedInstructor.role && (
//                       <p>
//                         <span className="font-semibold text-gray-900">
//                           직책 :
//                         </span>{" "}
//                         {
//                           selectedInstructor.role
//                         }
//                       </p>
//                     )}

//                     {selectedInstructor.department && (
//                       <p>
//                         <span className="font-semibold text-gray-900">
//                           담당 업무 :
//                         </span>{" "}
//                         {
//                           selectedInstructor.department
//                         }
//                       </p>
//                     )}

//                     {selectedInstructor.number && (
//                       <p>
//                         <span className="font-semibold text-gray-900">
//                           연락처 :
//                         </span>{" "}
//                         {
//                           selectedInstructor.number
//                         }
//                       </p>
//                     )}

//                     {selectedInstructor.email && (
//                       <p className="break-all">
//                         <span className="font-semibold text-gray-900">
//                           이메일 :
//                         </span>{" "}
//                         {
//                           selectedInstructor.email
//                         }
//                       </p>
//                     )}
//                   </div>
//                 </section>
//               )}

//               {/* 근무 이력 */}
//               {(selectedInstructor.workYears ||
//                 selectedInstructor
//                   .workHistories
//                   .length > 0 ||
//                 selectedInstructor
//                   .formerCompanies
//                   .length > 0) && (
//                 <section className="mt-8">

//                   <h3 className="mb-5 text-lg font-bold text-gray-900">
//                     근무 이력
//                   </h3>

//                   {/* 총 근무 경력 */}
//                   {selectedInstructor.workYears && (
//                     <div className="mb-6 rounded-xl border border-gray-200 px-5 py-4">

//                       <span className="text-sm font-bold text-gray-900">
//                         총 근무경력
//                       </span>

//                       <span className="ml-3 text-sm text-gray-700">
//                         {
//                           selectedInstructor.workYears
//                         }
//                       </span>
//                     </div>
//                   )}

//                   {/* 연도별 */}
//                   {selectedInstructor
//                     .workHistories
//                     .length > 0 && (
//                     <div className="mb-7">

//                       <h4 className="mb-5 text-sm font-bold text-gray-800">
//                         경력 사항
//                       </h4>

//                       {selectedInstructor.workHistories.map(
//                         (
//                           history,
//                           index
//                         ) => (
//                           <div
//                             key={`${history.period ?? "history"}-${index}`}
//                             className="relative flex gap-5 border-l-2 border-[#C7D5E6] pb-7 pl-6 last:pb-0"
//                           >
//                             <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#00337B]" />

//                             {history.period && (
//                               <div className="w-24 shrink-0 text-sm font-bold text-[#00337B]">
//                                 {
//                                   history.period
//                                 }
//                               </div>
//                             )}

//                             <div className="text-sm leading-6 text-gray-700">
//                               {
//                                 history.content
//                               }
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   )}

//                   {/* 전 소속 */}
//                   {selectedInstructor
//                     .formerCompanies
//                     .length > 0 && (
//                     <div>
//                       <h4 className="mb-3 text-sm font-bold text-gray-800">
//                         전 소속기관
//                       </h4>

//                       <div className="flex flex-wrap gap-2">
//                         {selectedInstructor.formerCompanies.map(
//                           (
//                             company,
//                             index
//                           ) => (
//                             <span
//                               key={`${company}-${index}`}
//                               className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
//                             >
//                               {
//                                 company
//                               }
//                             </span>
//                           )
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </section>
//               )}

//               {/* 강의 이력 */}
//               {selectedInstructor
//                 .lectureHistories
//                 .length > 0 && (
//                 <section className="mt-8 border-t border-gray-200 pt-7">

//                   <h3 className="mb-5 text-lg font-bold text-gray-900">
//                     강의 이력
//                   </h3>

//                   <ul className="space-y-3">
//                     {selectedInstructor.lectureHistories.map(
//                       (
//                         lecture,
//                         index
//                       ) => (
//                         <li
//                           key={`${lecture.period ?? "lecture"}-${index}`}
//                           className="flex items-start gap-3 text-sm leading-6 text-gray-700"
//                         >
//                           <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00337B]" />

//                           <div>
//                             {lecture.period && (
//                               <span className="mr-3 font-semibold text-[#00337B]">
//                                 {
//                                   lecture.period
//                                 }
//                               </span>
//                             )}

//                             {
//                               lecture.content
//                             }
//                           </div>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </section>
//               )}

//               {/* 자격 */}
//               {selectedInstructor
//                 .certifications
//                 .length > 0 && (
//                 <section className="mt-8 border-t border-gray-200 pt-7">

//                   <h3 className="mb-4 text-lg font-bold text-gray-900">
//                     자격
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {selectedInstructor.certifications.map(
//                       (
//                         certification,
//                         index
//                       ) => (
//                         <span
//                           key={`${certification}-${index}`}
//                           className="rounded-full border border-[#C7D5E6] bg-[#F1F5FA] px-3 py-1.5 text-sm text-[#00337B]"
//                         >
//                           {
//                             certification
//                           }
//                         </span>
//                       )
//                     )}
//                   </div>
//                 </section>
//               )}

//               {/* 저서 */}
//               {selectedInstructor
//                 .publications.length >
//                 0 && (
//                 <section className="mt-8 border-t border-gray-200 pt-7">

//                   <h3 className="mb-4 text-lg font-bold text-gray-900">
//                     저서
//                   </h3>

//                   <ul className="space-y-3">
//                     {selectedInstructor.publications.map(
//                       (
//                         publication,
//                         index
//                       ) => (
//                         <li
//                           key={`${publication}-${index}`}
//                           className="flex items-start gap-3 text-sm leading-6 text-gray-700"
//                         >
//                           <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00337B]" />

//                           {
//                             publication
//                           }
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 </section>
//               )}

//               {/* 강의 가능 분야 */}
//               {selectedInstructor
//                 .topics.length > 0 && (
//                 <section className="mt-8 border-t border-gray-200 pt-7">

//                   <h3 className="mb-4 text-lg font-bold text-gray-900">
//                     강의 가능 분야
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {selectedInstructor.topics.map(
//                       (topic) => (
//                         <span
//                           key={topic}
//                           className="rounded-full border border-[#C7D5E6] bg-[#F1F5FA] px-3 py-1.5 text-xs font-medium text-[#00337B]"
//                         >
//                           {topic}
//                         </span>
//                       )
//                     )}
//                   </div>
//                 </section>
//               )}

//               {/* 닫기 */}
//               <div className="mt-9 flex justify-end border-t border-gray-200 pt-5">
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setSelectedInstructor(
//                       null
//                     )
//                   }
//                   className="rounded-lg bg-[#00337B] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00265C]"
//                 >
//                   닫기
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default MainPage;


import { useEffect, useMemo, useState} from "react";

import type { KeyboardEvent } from "react";

// import {
//   categoryMap,
//   topicAliasMap,
// } from "../data/categories";
import {
  categoryMap,
} from "../data/categories";

import type {
  Instructor,
} from "../types/instructor";

const MainPage = () => {
  /* ========================================
     강사 데이터
  ======================================== */

  const [instructors, setInstructors] =
    useState<Instructor[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");

  /* ========================================
     검색 / 필터
  ======================================== */

  const [category, setCategory] =
    useState("전체");

  const [
    subCategory,
    setSubCategory,
  ] = useState("전체");

  const [searchType, setSearchType] =
    useState("전체");

  const [keyword, setKeyword] =
    useState("");

  const [
    searchKeyword,
    setSearchKeyword,
  ] = useState("");

  // KISIA 강의 이력이 있는 강사 조회
  const [
    onlyKisia,
    setOnlyKisia,
  ] = useState(false);

  const [sort, setSort] =
    useState("name");

  const [
    selectedInstructor,
    setSelectedInstructor,
  ] =
    useState<Instructor | null>(null);

  const subCategories =
    category === "전체"
      ? []
      : categoryMap[category] ?? [];

  /* ========================================
     API에서 강사 데이터 가져오기
  ======================================== */

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await fetch(
          "/api/instructors",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const data =
          (await response.json()) as Instructor[];

        setInstructors(data);
      } catch (error) {
        console.error(
          "강사 데이터 조회 실패:",
          error
        );

        setLoadError(
          "강사 정보를 불러오지 못했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructors();
  }, []);

  /* ========================================
     이름 유연 검색
     홍1 → 홍길동1
  ======================================== */

  const isSubsequence = (
    query: string,
    target: string
  ) => {
    const normalizedQuery = query
      .replace(/\s/g, "")
      .toLowerCase();

    const normalizedTarget = target
      .replace(/\s/g, "")
      .toLowerCase();

    if (!normalizedQuery) {
      return true;
    }

    let queryIndex = 0;

    for (const char of normalizedTarget) {
      if (
        char ===
        normalizedQuery[queryIndex]
      ) {
        queryIndex++;
      }

      if (
        queryIndex ===
        normalizedQuery.length
      ) {
        return true;
      }
    }

    return false;
  };

  // const normalizeTopic = (value: string) =>
  //   value
  //     .replace(/\s/g, "")
  //     .replace(/[·.,/()_-]/g, "")
  //     .toLowerCase();

  // const matchesSubCategory = (
  //   topics: string[],
  //   subCategory: string
  // ) => {
  //   const aliases =
  //     topicAliasMap[subCategory] ?? [
  //       subCategory,
  //     ];

  //   return topics.some((topic) => {
  //     const normalizedTopic =
  //       normalizeTopic(topic);

  //     return aliases.some((alias) => {
  //       const normalizedAlias =
  //         normalizeTopic(alias);

  //       return normalizedTopic.includes(
  //         normalizedAlias
  //       );
  //     });
  //   });
  // };

  /* ========================================
     Modal
  ======================================== */

  useEffect(() => {
    if (!selectedInstructor) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      e: globalThis.KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        setSelectedInstructor(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedInstructor]);

  /* ========================================
     Events
  ======================================== */

  const handleCategoryChange = (
    value: string
  ) => {
    setCategory(value);
    setSubCategory("전체");
  };

  const handleSearch = () => {
    setSearchKeyword(keyword);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /* ========================================
     Filter / Sort
  ======================================== */

  const filteredInstructors =
    useMemo(() => {
      const result =
        instructors.filter(
          (instructor) => {
            // const categoryMatch =
            //   category === "전체" ||
            //   (
            //     categoryMap[category] ?? []
            //   ).some((categorySubItem) =>
            //     matchesSubCategory(
            //       instructor.topics,
            //       categorySubItem
            //     )
            //   );

            // const subCategoryMatch =
            //   subCategory === "전체" ||
            //   matchesSubCategory(
            //     instructor.topics,
            //     subCategory
            //   );
            const categoryMatch =
              category === "전체" ||
              instructor.categories.includes(
                category
              );

            const subCategoryMatch =
              subCategory === "전체" ||
              instructor.subCategories.includes(
                subCategory
              );

            // 체크했으면 KISIA 강의 이력이 1개 이상인 강사만 통과
            const kisiaMatch =
              !onlyKisia ||
              (
                instructor
                  .kisiaLectureHistories
                  ?.length ?? 0
              ) > 0;

            const targetKeyword =
              searchKeyword
                .trim()
                .toLowerCase();

            if (!targetKeyword) {
              return (
                categoryMatch &&
                subCategoryMatch &&
                kisiaMatch
              );
            }

            let searchMatch = false;

            if (
              searchType === "이름"
            ) {
              searchMatch =
                isSubsequence(
                  targetKeyword,
                  instructor.name
                );
            } else if (
              searchType === "기업명"
            ) {
              searchMatch =
                instructor.company
                  .toLowerCase()
                  .includes(
                    targetKeyword
                  );
            } else if (
              searchType === "강의분야"
            ) {
              searchMatch =
                instructor.topics.some(
                  (topic) =>
                    topic
                      .toLowerCase()
                      .includes(
                        targetKeyword
                      )
                );
            } else {
              searchMatch =
                isSubsequence(
                  targetKeyword,
                  instructor.name
                ) ||
                instructor.company
                  .toLowerCase()
                  .includes(
                    targetKeyword
                  ) ||
                instructor.department
                  .toLowerCase()
                  .includes(
                    targetKeyword
                  ) ||
                instructor.role
                  .toLowerCase()
                  .includes(
                    targetKeyword
                  ) ||
                instructor.topics.some(
                  (topic) =>
                    topic
                      .toLowerCase()
                      .includes(
                        targetKeyword
                      )
                );
            }

            return (
              categoryMatch &&
              subCategoryMatch &&
              kisiaMatch &&
              searchMatch
            );
          }
        );

      return [...result].sort(
        (a, b) => {
          if (sort === "name") {
            return a.name.localeCompare(
              b.name,
              "ko"
            );
          }

          if (sort === "company") {
            return a.company.localeCompare(
              b.company,
              "ko"
            );
          }

          if (sort === "career") {
            return (
              b.career - a.career
            );
          }

          return 0;
        }
      );
    }, [
      instructors,
      category,
      subCategory,
      searchType,
      searchKeyword,
      sort,
      onlyKisia,
    ]);

  return (
    <main className="min-h-screen bg-white px-6">
      <div className="mx-auto max-w-7xl">

        {/* ========================================
            제목 + 검색 고정
        ======================================== */}

        <div className="sticky top-0 z-40 bg-white/95 pb-5 pt-8 backdrop-blur-sm">

          <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">
            전문 강사 조회
          </h1>

          <section className="rounded-2xl bg-slate-50 px-8 py-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-center gap-3">

              {/* 대분류 */}
              <div className="relative min-w-44">
                <select
                  value={category}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value)
                  }
                  className="h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-11 text-sm font-medium text-gray-800 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
                >
                  <option value="전체">
                    대분류
                  </option>

                  {Object.keys(categoryMap).map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
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
                    setSubCategory(e.target.value)
                  }
                  disabled={category === "전체"}
                  className="h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-11 text-sm font-medium text-gray-800 outline-none transition focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="전체">
                    세부분류
                  </option>

                  {subCategories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
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
                    setSearchType(e.target.value)
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
                    setOnlyKisia(
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

              {/* 검색어 */}
              <input
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="키워드를 입력하세요."
                className="h-12 w-60 rounded-md border border-gray-300 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#00337B] focus:ring-2 focus:ring-[#00337B]/15"
              />

              {/* 조회 버튼 */}
              <button
                type="button"
                onClick={handleSearch}
                className="h-12 cursor-pointer rounded-md bg-[#00337B] px-8 font-semibold text-white transition hover:bg-[#00265C] focus:outline-none focus:ring-2 focus:ring-[#00337B]/30 focus:ring-offset-2"
              >
                조회하기
              </button>

            </div>
          </section>
        </div>

        {/* ========================================
            Loading / Error
        ======================================== */}

        {isLoading && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            강사 정보를 불러오는 중입니다...
          </div>
        )}

        {!isLoading &&
          loadError && (
            <div className="flex h-64 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              {loadError}
            </div>
          )}

        {/* ========================================
            정상 데이터
        ======================================== */}

        {!isLoading &&
          !loadError && (
            <>
              {/* 조회수 / 정렬 */}
              <section className="mb-5 mt-5 flex flex-wrap items-center justify-between gap-4">

                <div className="text-base text-gray-900">
                  조회수{" "}
                  <span className="font-bold text-[#00337B]">
                    {
                      filteredInstructors.length
                    }
                  </span>
                  개
                </div>

                <div className="flex items-center gap-4">

                  <span className="font-medium">
                    정렬 :
                  </span>

                  {[
                    ["name", "이름"],
                    [
                      "company",
                      "기업명",
                    ],
                    [
                      "career",
                      "경력",
                    ],
                  ].map(
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
                          value={
                            value
                          }
                          checked={
                            sort ===
                            value
                          }
                          onChange={(
                            e
                          ) =>
                            setSort(
                              e
                                .target
                                .value
                            )
                          }
                          className="h-5 w-5 accent-[#00337B]"
                        />

                        <span
                          className={
                            sort ===
                            value
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

              {/* ========================================
                  카드
              ======================================== */}

              {filteredInstructors.length >
              0 ? (
                <section className="grid grid-cols-1 gap-5 pb-12 md:grid-cols-2 xl:grid-cols-3">

                  {filteredInstructors.map(
                    (
                      instructor
                    ) => (
                      <article
                        key={
                          instructor.id
                        }
                        className="flex min-h-[500px] flex-col rounded-3xl border border-gray-300 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#7FA1C9] hover:shadow-lg"
                      >

                        <h2 className="text-2xl font-bold text-gray-900">
                          {
                            instructor.name
                          }
                        </h2>

                        {instructor
                          .categories
                          .length >
                          0 && (
                          <div className="mt-3 flex flex-wrap gap-2">

                            {instructor.categories.map(
                              (
                                item
                              ) => (
                                <span
                                  key={
                                    item
                                  }
                                  className="rounded-md bg-[#00337B] px-2.5 py-1 text-xs font-medium text-white"
                                >
                                  {
                                    item
                                  }
                                </span>
                              )
                            )}
                          </div>
                        )}

                        <div className="mt-5 space-y-2 text-[15px] text-gray-800 mb-3">

                          {instructor.career >
                            0 && (
                            <p>
                              <span className="font-bold">
                                재직
                                경력 :
                              </span>{" "}
                              {
                                instructor.career
                              }
                              년
                            </p>
                          )}

                          {instructor.company && (
                            <p>
                              <span className="font-bold">
                                소속 :
                              </span>{" "}
                              {
                                instructor.company
                              }
                            </p>
                          )}

                          {instructor.department && (
                            <p>
                              <span className="font-bold">
                                담당
                                업무 :
                              </span>{" "}
                              {
                                instructor.department
                              }
                            </p>
                          )}

                          {instructor.role && (
                            <p>
                              <span className="font-bold">
                                직책 :
                              </span>{" "}
                              {
                                instructor.role
                              }
                            </p>
                          )}

                          {instructor.number && (
                            <p>
                              <span className="font-bold">
                                연락처 :
                              </span>{" "}
                              {
                                instructor.number
                              }
                            </p>
                          )}

                          {instructor.email && (
                            <p className="break-all">
                              <span className="font-bold">
                                이메일 :
                              </span>{" "}
                              {
                                instructor.email
                              }
                            </p>
                          )}
                        </div>

                        {instructor.description && (
                          <p className="mt-5 leading-7 text-gray-700">
                            {
                              instructor.description
                            }
                          </p>
                        )}

                        {/* KISIA 강의 이력 */}
                        {(instructor.kisiaLectureHistories?.length ?? 0) > 0 && (
                          <div className="mt-5 mb-3">
                            <p className="mb-3 text-m font-bold text-gray-700">
                              KISIA 강의 이력
                            </p>

                            <div className="space-y-2">
                              {instructor.kisiaLectureHistories.map(
                                (lecture, index) => (
                                  <div
                                    key={`${lecture.period ?? "kisia"}-${index}`}
                                    className="flex items-start gap-2 text-sm text-gray-700"
                                  >
                                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#00337B]" />

                                    <div>
                                      {lecture.period && (
                                        <span className="mr-2 font-semibold text-[#00337B]">
                                          {lecture.period}
                                        </span>
                                      )}

                                      <span>{lecture.content}</span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {instructor.satisfaction?.trim() && (
                              <div className="mt-3 text-sm text-gray-700 mb-3 font-semibold">
                                <span className="font-bold">
                                  만족도 :
                                </span>{" "}
                                <span className="font-semibold text-black">
                                  {instructor.satisfaction}
                                </span>
                              </div>
                            )}

                        <div className="mt-auto border-t border-gray-200 pt-5">

                          {instructor
                            .topics
                            .length >
                            0 && (
                            <>
                              <p className="mb-3 text-m font-bold text-gray-700">
                                강의 가능
                                분야
                              </p>

                              <div className="flex flex-wrap gap-2">

                                {instructor.topics.map(
                                  (
                                    topic
                                  ) => (
                                    <span
                                      key={
                                        topic
                                      }
                                      className="rounded-full border border-[#C7D5E6] bg-[#F1F5FA] px-3 py-1.5 text-xs font-medium text-[#00337B]"
                                    >
                                      {
                                        topic
                                      }
                                    </span>
                                  )
                                )}
                              </div>
                            </>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedInstructor(
                                instructor
                              )
                            }
                            className="mt-5 w-full rounded-lg border border-[#00337B] py-2.5 text-sm font-semibold text-[#00337B] transition hover:bg-[#00337B] hover:text-white cursor-pointer"
                          >
                            강사 이력
                            더보기
                          </button>
                        </div>
                      </article>
                    )
                  )}
                </section>
              ) : (
                <div className="flex h-60 items-center justify-center rounded-2xl bg-gray-50 text-gray-500">
                  검색 조건에 맞는
                  강사가 없습니다.
                </div>
              )}
            </>
          )}
      </div>

      {/* ========================================
          Modal
      ======================================== */}

      {selectedInstructor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          onClick={() =>
            setSelectedInstructor(
              null
            )
          }
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
                  {
                    selectedInstructor.name
                  }
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  강사 상세 이력
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedInstructor(
                    null
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-[#00337B] cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="px-7 py-7">

              {(selectedInstructor.company ||
                selectedInstructor.department ||
                selectedInstructor.role ||
                selectedInstructor.number ||
                selectedInstructor.email ||
                selectedInstructor.instructorGrade) && (
                <section className="rounded-xl bg-slate-50 p-5">
                  <h3 className="mb-4 font-bold">
                    기본 정보
                  </h3>

                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    {selectedInstructor.company && (
                      <p>
                        <b>소속 :</b>{" "}
                        {selectedInstructor.company}
                      </p>
                    )}

                    {selectedInstructor.role && (
                      <p>
                        <b>직책 :</b>{" "}
                        {selectedInstructor.role}
                      </p>
                    )}

                    {selectedInstructor.department && (
                      <p>
                        <b>담당 업무 :</b>{" "}
                        {selectedInstructor.department}
                      </p>
                    )}

                    {/* 강사 등급 */}
                    {selectedInstructor.instructorGrade && (
                      <p>
                        <b>강사 등급 :</b>{" "}
                        {selectedInstructor.instructorGrade}
                      </p>
                    )}

                    {selectedInstructor.number && (
                      <p>
                        <b>연락처 :</b>{" "}
                        {selectedInstructor.number}
                      </p>
                    )}

                    {selectedInstructor.email && (
                      <p className="break-all">
                        <b>이메일 :</b>{" "}
                        {selectedInstructor.email}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {(selectedInstructor.workYears ||
                selectedInstructor
                  .workHistories
                  .length > 0 ||
                selectedInstructor
                  .formerCompanies
                  .length > 0) && (
                <section className="mt-8">

                  <h3 className="mb-5 text-lg font-bold">
                    근무 이력
                  </h3>

                  {selectedInstructor.workYears && (
                    <div className="mb-6 rounded-xl border border-gray-200 px-5 py-4">
                      <b>
                        총 근무경력
                      </b>

                      <span className="ml-3">
                        {
                          selectedInstructor.workYears
                        }
                      </span>
                    </div>
                  )}

                  {selectedInstructor
                    .workHistories
                    .length > 0 && (
                    <div className="mb-7">

                      {selectedInstructor.workHistories.map(
                        (
                          history,
                          index
                        ) => (
                          <div
                            key={
                              index
                            }
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

                  {selectedInstructor
                    .formerCompanies
                    .length > 0 && (
                    <div className="flex flex-wrap gap-2">

                      {selectedInstructor.formerCompanies.map(
                        (
                          company
                        ) => (
                          <span
                            key={
                              company
                            }
                            className="rounded-lg bg-gray-100 px-3 py-2 text-sm"
                          >
                            {
                              company
                            }
                          </span>
                        )
                      )}
                    </div>
                  )}
                </section>
              )}

              {selectedInstructor
                .lectureHistories
                .length > 0 && (
                <section className="mt-8 border-t pt-7">

                  <h3 className="mb-5 text-lg font-bold">
                    강의 이력
                  </h3>

                  <ul className="space-y-3">

                    {selectedInstructor.lectureHistories.map(
                      (
                        lecture,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
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

              {selectedInstructor.historyRaw?.trim() && (
                <section className="mt-8 border-t border-gray-200 pt-7">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">
                    강사 이력
                  </h3>

                  <div className="rounded-xl bg-slate-50 px-5 py-4">
                    <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                      {selectedInstructor.historyRaw}
                    </p>
                  </div>
                </section>
              )}

              {selectedInstructor
                .certifications
                .length > 0 && (
                <section className="mt-8 border-t pt-7">

                  <h3 className="mb-4 text-lg font-bold">
                    자격
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {selectedInstructor.certifications.map(
                      (
                        item
                      ) => (
                        <span
                          key={
                            item
                          }
                          className="rounded-full border border-[#C7D5E6] bg-[#F1F5FA] px-3 py-1.5 text-sm text-[#00337B]"
                        >
                          {
                            item
                          }
                        </span>
                      )
                    )}
                  </div>
                </section>
              )}

              {selectedInstructor
                .publications
                .length > 0 && (
                <section className="mt-8 border-t pt-7">

                  <h3 className="mb-4 text-lg font-bold">
                    저서
                  </h3>

                  <ul className="space-y-3">

                    {selectedInstructor.publications.map(
                      (
                        item
                      ) => (
                        <li
                          key={
                            item
                          }
                        >
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
                  onClick={() =>
                    setSelectedInstructor(
                      null
                    )
                  }
                  className="rounded-lg bg-[#00337B] px-7 py-2.5 text-sm font-semibold text-white hover:bg-[#00265C] cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainPage;