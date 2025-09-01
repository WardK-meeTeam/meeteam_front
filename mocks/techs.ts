export interface TechStackOption {
  kor: string;
  eng: string;
  iconName: string;
}

export const techStackOptions: TechStackOption[] = [
  // 🚀 프론트엔드
  { kor: "리액트", eng: "React.js", iconName: "siReact" },
  { kor: "넥스트", eng: "Next.js", iconName: "siNextdotjs" },
  { kor: "뷰", eng: "Vue.js", iconName: "siVuedotjs" },
  { kor: "앵귤러", eng: "Angular", iconName: "siAngular" },
  { kor: "타입스크립트", eng: "TypeScript", iconName: "siTypescript" },
  { kor: "자바스크립트", eng: "JavaScript", iconName: "siJavascript" },
  { kor: "리덕스", eng: "Redux", iconName: "siRedux" },
  { kor: "리액트네이티브", eng: "React Native", iconName: "siReact" },
  { kor: "엑스포", eng: "Expo", iconName: "siExpo" },
  { kor: "안드로이드", eng: "Android", iconName: "siAndroid" },
  { kor: "스위프트", eng: "Swift", iconName: "siSwift" },

  // ⚙️ 백엔드
  { kor: "노드", eng: "Node.js", iconName: "siNodedotjs" },
  { kor: "익스프레스", eng: "Express.js", iconName: "siExpress" },
  { kor: "스프링부트", eng: "Spring Boot", iconName: "siSpringboot" },
  { kor: "자바", eng: "Java", iconName: "siOpenjdk" },
  { kor: "코틀린", eng: "Kotlin", iconName: "siKotlin" },
  { kor: "파이썬", eng: "Python", iconName: "siPython" },
  { kor: "장고", eng: "Django", iconName: "siDjango" },
  { kor: "플라스크", eng: "Flask", iconName: "siFlask" },
  { kor: "루비온레일즈", eng: "Ruby on Rails", iconName: "siRubyonrails" },
  { kor: "PHP", eng: "PHP", iconName: "siPhp" },

  // 🗄️ 데이터베이스
  { kor: "MySQL", eng: "MySQL", iconName: "siMysql" },
  { kor: "PostgreSQL", eng: "PostgreSQL", iconName: "siPostgresql" },
  { kor: "MongoDB", eng: "MongoDB", iconName: "siMongodb" },
  { kor: "Redis", eng: "Redis", iconName: "siRedis" },
  { kor: "SQLite", eng: "SQLite", iconName: "siSqlite" },
  { kor: "MariaDB", eng: "MariaDB", iconName: "siMariadb" },
  { kor: "OracleDB", eng: "Oracle Database", iconName: "siOracle" },
  { kor: "Firebase", eng: "Firebase", iconName: "siFirebase" },
  { kor: "Supabase", eng: "Supabase", iconName: "siSupabase" },
  { kor: "Elasticsearch", eng: "Elasticsearch", iconName: "siElasticsearch" },

  // ☁️ 클라우드 / 인프라
  { kor: "도커", eng: "Docker", iconName: "siDocker" },
  { kor: "쿠버네티스", eng: "Kubernetes", iconName: "siKubernetes" },
  { kor: "AWS", eng: "Amazon Web Services", iconName: "siAmazonaws" },
  { kor: "애저", eng: "Microsoft Azure", iconName: "siMicrosoftazure" },
  { kor: "구글클라우드", eng: "Google Cloud", iconName: "siGooglecloud" },
  { kor: "깃허브액션", eng: "GitHub Actions", iconName: "siGithubactions" },
  { kor: "젠킨스", eng: "Jenkins", iconName: "siJenkins" },
  { kor: "GitLab CI", eng: "GitLab CI/CD", iconName: "siGitlab" },
  { kor: "Cloudflare", eng: "Cloudflare", iconName: "siCloudflare" },
  { kor: "Vercel", eng: "Vercel", iconName: "siVercel" },

  // 🛠️ 협업 & 기타
  { kor: "깃", eng: "Git", iconName: "siGit" },
  { kor: "깃허브", eng: "GitHub", iconName: "siGithub" },
  { kor: "슬랙", eng: "Slack", iconName: "siSlack" },
  { kor: "Jira", eng: "Jira", iconName: "siJira" },
  { kor: "Figma", eng: "Figma", iconName: "siFigma" },

  // 그냥 언어
  { kor: "C언어", eng: "C", iconName: "siC" },
  { kor: "C++", eng: "C++", iconName: "siCplusplus" },
];
