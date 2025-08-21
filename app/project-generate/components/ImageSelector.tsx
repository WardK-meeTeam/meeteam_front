import Image from "next/image";
import CameraIcon from "@/public/images/camera.svg";

export default function ImageSelector() {
  return (
    <div className="flex flex-row gap-5 justify-start items-center">
      <label htmlFor="project-cover-img-upload">
        <div className="flex justify-center items-center w-20 h-20 bg-[#F8F8F8] rounded-full cursor-pointer">
          <Image width={20} height={20} alt="카메라 아이콘" src={CameraIcon} />
        </div>
      </label>
      <input type="file" id="project-cover-img-upload" className="hidden" />
      <div className="flex flex-col">
        <b>프로젝트 커버 이미지</b>
        <span className="text-main text-[12px]">
          PNG, JPG 형식의 이미지를 업로드해주세요!
        </span>
      </div>
    </div>
  );
}
