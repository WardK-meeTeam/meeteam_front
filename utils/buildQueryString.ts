// 객체를 쿼리 파라미터 문자열로 변환하는 유틸 함수
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // 배열인 경우 각 요소를 개별적으로 추가
        value.forEach(item => {
          if (item !== undefined && item !== null && item !== '') {
            searchParams.append(key, String(item));
          }
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
