export const mapUserToCardProps = (user: any) => {
  return {
    userId: user.userId,
    profileImg: user.profileImg,
    name: user.name,
    temp: user.temp,
    sideProjectCount: user.sideProjectCount,
    skills: user.skills,
  };
};