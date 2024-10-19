// Get random sets of languages and frameworks

import { Language, LanguageEnum } from "@/ts_client";

const languages_list = Object.values(LanguageEnum);

export function get_random_languages(): Language[] {
  // Randomly select a language from 1 to 4
  const qty = Math.floor(Math.random() * 4) + 1;
  // Randomly select languages
  const languages = Array.from(
    new Set(
      new Array(qty).fill(0).map(() => {
        return { name: languages_list[Math.floor(Math.random() * languages_list.length)] };
      }),
    ),
  );
  return languages;
}

export function get_random_sets() {
  return {
    languages: get_random_languages(),
    skills: get_random_skills(),
    bio: random_bios[Math.floor(Math.random() * random_bios.length)],
  };
}

export function get_random_skills() {
  // Randomly select a skills from 7 to 22
  const qty = Math.floor(Math.random() * 16) + 7;
  // Randomly select skills
  return Array.from(
    new Set(
      new Array(qty).fill(0).map(() => {
        return skills[Math.floor(Math.random() * skills.length)];
      }),
    ),
  );
}

const random_bios = [
  "I am a full stack developer with 5 years of experience in building web applications.",
  "I am a software engineer with a passion for building scalable and maintainable software.",
  "I am a front end developer with expertise in React and Vue.",
  "I am a back end developer with experience in building RESTful APIs.",
  "I am a software developer with a focus on building mobile applications.",
  "I am a software engineer with experience in building cloud native applications.",
  "I am a full stack developer with a focus on building microservices.",
];

export const skills = [ "React", "Vue", "Angular", "Node.js", "Express", "Django", "Flask", "Spring", "PostgreSQL", "MySQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Azure", "Git", "Jenkins", "GraphQL", "REST", "SOAP", "Ruby on Rails", "Java", "Python", "C#", "C++", "PHP", "Laravel", "Sass", "Less", "HTML5", "CSS3", "JavaScript", "TypeScript", "Selenium", "Cypress", "Terraform", "Ansible", "Puppet", "Chef", "PowerShell", "Bash", "Linux", "Windows Server", "CentOS", "Ubuntu", "Nginx", "Apache", "Vagrant", "VirtualBox", "QEMU", "Vim", "Emacs", "VS Code", "Eclipse", "IntelliJ IDEA", "NetBeans", "Xcode", "Swift", "Objective-C", "Kotlin", "Go", "Rust", "Elixir", "Scala", "Perl", "R", "MATLAB", "Hadoop", "Spark", "Kafka", "RabbitMQ", "Redis", "Elasticsearch", "Logstash", "Grafana", "Prometheus", "Splunk", "Tableau", "Power BI", "Salesforce", "ServiceNow", "SAP", "Oracle", "Jira", "Confluence", "Trello", "Slack", "Zoom", "Figma", "Sketch", "InVision", "Adobe XD", "Unity", "Unreal Engine", "Blender", "3ds Max", "Maya", "Firebase", "Heroku", "DigitalOcean", "Linode", "CircleCI", "Travis CI",
];

