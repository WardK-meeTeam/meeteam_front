/* 토큰 갱신이 필요한지 확인 (만료시간 5분전) */
export const isTokenExpired = (token: string): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);

  try {
    if (!token) return true;
    
    const payload = JSON.parse(atob(token.split(".")[1])); // payload base64 디코딩
    
    return payload.exp <= currentTime;
  } catch (error) {
    console.error('토큰 만료 체크 실패:', error);
    return true;
  }
};

export const isTokenNearExpiry = (token: string): boolean => {
  const REFRESH_THRESHOLD = 5 * 60; // 5분
  const currentTime = Math.floor(Date.now() / 1000);
  
  try {
    if (!token) return true;
    
    const payload = JSON.parse(atob(token.split(".")[1])); // payload base64 디코딩
    const timeUntilExpiry = payload.exp - currentTime;
    
    return timeUntilExpiry <= REFRESH_THRESHOLD;
  } catch (error) {
    console.error('토큰 갱신 체크 실패:', error);
    return true;
  }
};