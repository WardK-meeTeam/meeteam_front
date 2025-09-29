import { authFetch } from "./authFetch";

export const createProjectReview = async (prevState: any, formData: FormData) => {
  if (!formData) {
      return { error: '입력값이 없습니다', success: false, result: null };
  }

  try {
      const projectId = formData.get('projectId');
      const obj = {
          contents: formData.get('contents'),
          rating: formData.get('rating'),
      };
      
      console.log(projectId, obj, 'api 요청');
      const data = obj;

      // const res = await authFetch(`/projects/${projectId}/review`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(obj),
      // });

      // console.log('writeReviewAction: ', res);
      
      // const data = await res.json();

      // if (!res.ok) {
      //     return { error: data.message || '프로젝트 리뷰를 작성하지 못했습니다', success: false, result: null };
      // }
      
      return { error: "", success: true, result: data };
  } catch (error: any) {
      return { error: error.message, success: false, result: null };
  }
}