export const mapUserToCardProps = (user: any) => {
  return {
    userId: user.memberId,
    profileImg: user.storeFileName || "/images/userImg1.png", // 기본 이미지 설정
    name: user.realName,
    temp: user.temperature,
    sideProjectCount: user.projectCount,
    skills: user.skillList || [],
  };
};