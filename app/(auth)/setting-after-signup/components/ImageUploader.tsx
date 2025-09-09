"use client";

import Image from "next/image";
import { LiaUploadSolid } from "react-icons/lia";
import CameraIcon from "@/public/images/camera.svg";

interface ImageUploaderProps {
  value: string | null;
  onUploadImage: (img: string | null) => void;
}

export default function ImageUploader({
  value,
  onUploadImage,
}: ImageUploaderProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(value);
  return (
    <>
      {/*프로필 사진*/}
      <div className="flex flex-col justify-between items-start mt-4 mb-6 w-[330px]">
        <div className="flex flex-col justify-start items-start py-3">
          <span className="text-[15px] font-semibold w-full">프로필 사진</span>
          <span className="text-[12px] font-normal text-[#757575]">
            10MB 이내의 이미지 파일을 업로드 해주세요.
          </span>
        </div>

        <div className="flex justify-center items-center gap-x-7 py-3">
          {/*프로필 이미지 박스*/}
          <div
            className="w-[87px] h-[87px] border border-none rounded-[50%] bg-[#F8F8F8] overflow-hidden flex justify-center items-center
          relative"
          >
            {value ? (
              <Image
                className="rounded-full w-full h-full object-cover"
                fill
                alt="선택된 사진"
                src={value}
              />
            ) : (
              <Image
                width={20}
                height={20}
                alt="카메라 아이콘"
                src={CameraIcon}
              />
            )}
          </div>

          {/*업로드 버튼*/}
          <label className="w-[148px] h-[35px] border border-[#D9D9D9] rounded-[22px] flex justify-center items-center gap-x-1 cursor-pointer">
            <LiaUploadSolid className="text-[12.63px]" />
            <span className="text-[12.63px]">프로필 사진 업로드</span>
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </>
  );
  return;
}
