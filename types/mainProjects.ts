import { proxyFetch } from "@/api/authFetch";

export type RecruitmentInfo = {

};

export type ProjectCards = {
    id: string,
    name: string,
    description: string,
    projectCategory: string,
    platformCategory: string,
    imageUrl: string,
    creatorName: string,
    createdDate: string,
    endDate: string,
    likes: number,
    skillNames: string[];
    recruitmentInfo: RecruitmentInfo[];
};

