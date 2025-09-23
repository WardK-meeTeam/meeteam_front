// 1. 기준이 되는 '한글 -> 영문' 변환 맵을 정의합니다. (Single Source of Truth)
const KOR_TO_ENG = {
  "프로덕트 매니저/오너": "productManager",
  그래픽디자인: "graphicDesign",
  "UI/UX디자인": "uiuxDesign",
  "모션 디자인": "motionDesign",
  "BX/브랜드 디자인": "brandDesign",
  웹프론트엔드: "webFrontend",
  iOS: "ios",
  안드로이드: "android",
  크로스플랫폼: "crossPlatform",
  웹서버: "webServer",
  AI: "ai",
  "DBA/빅데이터/DS": "dbaBigDataDs",
  기타: "other",
};

// 2. KOR_TO_ENG 맵을 기반으로 '영문 -> 한글' 맵을 자동으로 생성합니다.
const ENG_TO_KOR = Object.entries(KOR_TO_ENG).reduce(
  (acc, [kor, eng]) => {
    acc[eng] = kor;
    return acc;
  },
  {} as Record<string, string>,
);

/**
 * 주어진 한글 또는 영문 하위 카테고리를 상호 변환합니다.
 * @param term 변환할 문자열 (한글 또는 영문)
 * @returns 변환된 문자열. 매칭되는 값이 없으면 원본 문자열을 반환합니다.
 */
export const convertSubCategory = (term: string): string => {
  // 한글 -> 영문 변환 시도
  if (KOR_TO_ENG[term as keyof typeof KOR_TO_ENG]) {
    return KOR_TO_ENG[term as keyof typeof KOR_TO_ENG];
  }

  // 영문 -> 한글 변환 시도
  if (ENG_TO_KOR[term as keyof typeof ENG_TO_KOR]) {
    return ENG_TO_KOR[term as keyof typeof ENG_TO_KOR];
  }

  // 매칭되는 값이 없으면 원본을 그대로 반환
  return term;
};
