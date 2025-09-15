export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/,
);
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 대문자, 소문자, 특수문자를 각각 최소 1개 이상 포함해야 합니다.";
