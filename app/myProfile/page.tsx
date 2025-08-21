"use client";

import ToggleSwitchButton from "@/components/ToggleSwitchButton";
import { useState } from "react";

export default function myPofile() {

    const partGroups = [
        ["디자인", "uiux디자인"], 
        ["디자인", "3d 그래픽"], 
        ["프론트엔드", "웹 프론트엔드"]
    ];
    const stacksImg = ["/images/Ps.png", "/images/Figma.png", "/images/Ps.png"];
    const reviews = [
        {name: "박서현", star: 4.5, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
        {name: "박서현", star: 4.0, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
        {name: "박서현", star: 4.5, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
        {name: "박서현", star: 4.0, review: "디자인 감각이 뛰어나고 세부적인 디테일까지 꼼꼼하게 챙기는 모습이 인상적입니다. 아이디어 회의 때는 다른 사람의 생각을 잘 경청하며...."},
    ]
    
    const [selected, setSelected] = useState(false);

    return (
        <div className="flex justify-center gap-x-11">

            {/*왼쪽 정보 */}
            <aside className="flex flex-col gap-y-12 mr-5">
                <div className="flex flex-col gap-y-4 items-center">
                    <img 
                    src="/images/userImg1.png"
                    className="w-[194px] h-[194px] rounded-[50%]"
                    />
                    <div className="flex justify-center items-center gap-x-4">
                        <div className="text-[36px] font-extrabold">김성림</div>
                        <div className="text-[14px] text-[#AD5FFF]">정보 수정하기</div>
                    </div>
                    <div className="w-[148px] h-[45px] rounded-[8px] bg-[#FFF3F0] text-[16px] flex justify-center items-center text-[#FF4802] font-bold">
                        협업온도 98'
                    </div>
                </div>

                <div className="flex justify-center items-between gap-x-9 mt-10">
                    <div className="flex flex-col gap-y-3">
                        <div className="text-[16px] font-bold">나이</div>
                        <div className="text-[16px] font-bold">성별</div>
                        <div className="text-[16px] font-bold">이메일</div>
                        <div className="text-[16px] font-bold">분야</div>
                    </div>
                    <div className="flex flex-col gap-y-3 text-[16px] text-[#474747]">
                        <div className="text-[16px]">22세</div>
                        <div className="text-[16px]">여성</div>
                        <div className="text-[16px] flex items-center">volunteer.24@gmail.com</div>
                        <div className="flex flex-col">
                            {partGroups.map(([left, right], idx) => (
                                <div key={idx} className="flex gap-x-2">
                                    <span className="after:content-[','] last:after:content-['']">{left}</span>
                                    <span className="after:content-[','] last:after:content-['']">{right}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-3">
                    <div className="text-[16px] font-bold">기술 스택</div>
                    <div className="flex gap-x-3">
                        {stacksImg.map((stack, idx) => (
                            <img key={idx} src={stack} className="w-[40px] h-[40px] rounded-[50%]"/>
                        ))}
                    </div>
                    <div className="flex gap-x-3 mt-7">
                        <div className="text-[16px] font-bold">프로젝트 참여 여부</div>
                        <ToggleSwitchButton onClick={() => setSelected((prev) => !prev) } isSelected={selected}/>
                    </div>
                    <div className="flex gap-x-3 mt-5">
                        <div className="text-[16px] font-bold">프로젝트 참여 수</div>
                        <div className="text-[16px] font-bold">5개</div>
                    </div>
                    <div className="flex gap-x-3">
                        <div className="text-[16px] font-bold">리뷰 개수</div>
                        <div className="text-[16px] font-bold">4개</div>
                    </div>
                </div>
            </aside>

            {/*메인 정보 부분 */}
            <main className="flex flex-col gap-y-12 mt-10 ml-10 pl-10">
                <div>
                    <div className="text-[40px] font-extrabold">안녕하세요! 김성림입니다🐠</div>
                    <div className="text-[16px] my-8">
                        저는 시각디자인과에서
                        <br/>
                        타이포그래피, 레이아웃, 그리고 브랜딩 작업을 즐기는 디자이너입니다
                        <br/>
                        깔끔한 디자인 안에 톡톡 튀는 포인트💫를 넣는 걸 좋아합니다
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-[15px] font-bold">제가 잘하는 것</div>
                        <div className="flex flex-col text-[15px] gap-y-1">
                            <div>- 포스터, 웹.앱, UI 디자인</div>
                            <div>- 위계가 잘 잡힌 타이포와 레이아웃</div>
                            <div>- 브랜드 컨셉 잡기와 키 비주얼 제작</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 my-12">
                    <div className="flex items-center gap-x-5">
                        <div className="text-[20px] font-extrabold flex justify-center items-center">Review</div>
                        <div className="flex justify-center items-center">4개</div>
                    </div>
                    <div className="w-[753px] h-[2px] bg-black"></div>
                    <div className="w-[753px] flex overflow-x-auto gap-x-5">
                        {reviews.map((idx, key) => (
                            <div
                            key={key} 
                            className="w-[365px] h-[169px] rounded-[8px] shrink-0 bg-[#F8F8F8] border">
                                <div className="flex  justify-between">
                                    <div>{idx.name}</div>
                                    <div>{idx.star}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
};