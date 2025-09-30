"use client";
import { useState, useActionState } from "react";
import StarRating from "./StarRating";
import { createProjectReview } from "@/api/createProjectReview";
import TextArea from "@/components/TextArea";
import MainButton from "@/components/MainButton";
import { useRouter } from "next/navigation";

const initialState = {
  error: "",
  success: false,
  result: null
}

export default function ProjectReviewForm({ projectId }: { projectId: string }) {
  const [ state, formAction, isPending] = useActionState(createProjectReview, initialState);
  const router = useRouter();
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(0);
  console.log(state, 'state');
  const handleChangeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  }
  const handleChangeRating = (rating: number) => {
    setRating(rating);
  }
  return (
    <form action={formAction} className="flex flex-col gap-12 w-150">
      <input type="hidden" name="projectId" value={projectId}/>
      <div>
        <input type="hidden" name="rating" value={rating} />
        <h2 className="mb-1 text-xl font-bold">별점 남기기</h2>
        <p className="mb-4 text-xs font-medium text-mtm-text-gray">리뷰는 본인과 상대방 모두의 성장에 큰 힘이 됩니다!</p>
        <div className="flex">
          <span className="inline-block w-32 font-bold">프로젝트 별점</span>
          <StarRating rating={rating} onChangeRating={handleChangeRating} />
        </div>
      </div>
      <div>
        <input type="hidden" name="contents" value={contents} />
        <h2 className="mb-1 text-xl font-bold">리뷰 작성</h2>
        <p className="mb-4 text-xs font-medium text-mtm-main-blue">리뷰는 800자 이내로 작성해주세요!</p>
        <TextArea maxSize={800} value={contents} onChange={handleChangeContents} />
      </div>
      <div className="flex gap-2 justify-space-between">
        <MainButton 
          buttonName="취소" 
          type="button" 
          onClick={() => router.back()} 
          disabled={isPending} 
          invertedColor customClass="flex-1" 
        />
        <MainButton 
          buttonName="리뷰 작성" 
          type="submit" 
          disabled={isPending} 
          customClass="flex-2" 
        />
      </div>
    </form>
  )
}