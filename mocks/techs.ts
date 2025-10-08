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
  { kor: "HTML/CSS", eng: "HTML/CSS", iconName: "siHtml5" }, // 추가
  { kor: "Tailwind CSS", eng: "Tailwind CSS", iconName: "siTailwindcss" }, // 추가

  // 🎨 디자인
  { kor: "Adobe Illustrator", eng: "Adobe Illustrator", iconName: "siAdobeillustrator" },
  { kor: "Adobe Photoshop", eng: "Adobe Photoshop", iconName: "siAdobephotoshop" },

  // ⚙️ 백엔드
  { kor: "노드", eng: "Node.js", iconName: "siNodedotjs" },
  { kor: "익스프레스", eng: "Express.js", iconName: "siExpress" },
  { kor: "스프링부트", eng: "Spring Boot", iconName: "siSpringboot" },
  { kor: "스프링", eng: "Spring", iconName: "siSpring" }, // 추가
  { kor: "자바", eng: "Java", iconName: "siOpenjdk" },
  { kor: "코틀린", eng: "Kotlin", iconName: "siKotlin" },
  { kor: "파이썬", eng: "Python", iconName: "siPython" },
  { kor: "장고", eng: "Django", iconName: "siDjango" },
  { kor: "플라스크", eng: "Flask", iconName: "siFlask" },
  { kor: "루비온레일즈", eng: "Ruby on Rails", iconName: "siRubyonrails" },
  { kor: "PHP", eng: "PHP", iconName: "siPhp" },
  { kor: "JPA", eng: "JPA", iconName: "siHibernate" },
  { kor: "하이버네이트", eng: "Hibernate", iconName: "siHibernate" }, // 추가
  { kor: "QueryDSL", eng: "QueryDSL", iconName: "siGradle" },

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
  { kor: "Kafka", eng: "Apache Kafka", iconName: "siApachekafka" }, // 추가
  { kor: "RabbitMQ", eng: "RabbitMQ", iconName: "siRabbitmq" }, // 추가

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
  { kor: "Gradle", eng: "Gradle", iconName: "siGradle" }, // 추가
  { kor: "Maven", eng: "Maven", iconName: "siApachemaven" }, // 추가
  { kor: "Nginx", eng: "Nginx", iconName: "siNginx" }, // 추가
  { kor: "GraphQL", eng: "GraphQL", iconName: "siGraphql" }, // 추가
  { kor: "gRPC", eng: "gRPC", iconName: "siGrpc" },
  { kor: "Terraform", eng: "Terraform", iconName: "siTerraform" }, // 추가
  { kor: "Ansible", eng: "Ansible", iconName: "siAnsible" }, // 추가
  { kor: "Linux", eng: "Linux", iconName: "siLinux" }, // 추가

  // 🛠️ 협업 & 기타
  { kor: "깃", eng: "Git", iconName: "siGit" },
  { kor: "깃허브", eng: "GitHub", iconName: "siGithub" },
  { kor: "슬랙", eng: "Slack", iconName: "siSlack" },
  { kor: "Jira", eng: "Jira", iconName: "siJira" },
  { kor: "Figma", eng: "Figma", iconName: "siFigma" },
  { kor: "JUnit 5", eng: "JUnit 5", iconName: "siJunit5" },
  { kor: "Mockito", eng: "Mockito", iconName: "siOpenjdk" },
  { kor: "OAuth2", eng: "OAuth2", iconName: "siOpenid" },
  { kor: "JWT", eng: "JWT", iconName: "siJsonwebtokens" }, // 추가
  { kor: "SSE", eng: "SSE", iconName: "siW3c" },
  { kor: "WebSocket", eng: "WebSocket", iconName: "siSocketdotio" }, // 추가
  { kor: "WebFlux", eng: "Spring WebFlux", iconName: "siSpring" },
  { kor: "Micrometer", eng: "Micrometer", iconName: "siGrafana" },
  { kor: "OpenAPI/Swagger", eng: "OpenAPI/Swagger", iconName: "siSwagger" }, // 추가
  { kor: "Prometheus", eng: "Prometheus", iconName: "siPrometheus" }, // 추가
  { kor: "Grafana", eng: "Grafana", iconName: "siGrafana" }, // 추가
  { kor: "Logstash", eng: "Logstash", iconName: "siElasticstack" }, // 추가
  { kor: "Kibana", eng: "Kibana", iconName: "siKibana" }, // 추가

  // 그냥 언어
  { kor: "C언어", eng: "C", iconName: "siC" },
  { kor: "C++", eng: "C++", iconName: "siCplusplus" },
];
