export async function createAccount(formData: FormData) {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // {  요청 성공시 아래와 같은 형태로 data에 담김
      //   "code": "COMMON200",
      //   "message": "요청에 성공했습니다.",
      //   "result": {
      //       "username": "홍길동"
      //   }
      // }
      const data = await response.json();
      return { success: true, data };
    } else {
      //   { 실패는 이렇게
      //     "code": "MEMBER400",
      //     "message": "이미 존재하는 회원입니다."
      // }
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    return {
      success: false,
      error: { message: `알 수 없는 오류가 발생했습니다. (${error})` },
    };
  }
}
