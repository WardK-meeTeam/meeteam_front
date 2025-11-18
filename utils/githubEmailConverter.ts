import { USER_PROFILE_CONSTANTS } from "@/constants/userProfileConstants";

export function githubEmailConverter(email: string) {
  if (!email.includes(USER_PROFILE_CONSTANTS.GITHUB_EMAIL_STRING)) {
    return email;
  }
  return USER_PROFILE_CONSTANTS.GITHUB_DISPLAY_EMAIL;
}
