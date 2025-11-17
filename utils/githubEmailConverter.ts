import { userProfileConstants } from "@/constants/userProfileConstants";

export function githubEmailConverter(email: string) {
  if (!email.includes(userProfileConstants.GITHUB_EMAIL_STRING)) {
    return email;
  }
  return userProfileConstants.GITHUB_DISPLAY_EMAIL;
}
