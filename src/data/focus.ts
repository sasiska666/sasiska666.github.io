import type { L } from '../i18n/types';

/**
 * CURRENT FOCUS — learning interests, edit freely.
 * Intentionally no percentages or proficiency scores.
 */
export interface FocusTopic {
  id: string;
  title: L;
  /** What exactly is being studied inside this topic. */
  detail: L;
}

export const FOCUS: FocusTopic[] = [
  {
    id: 'networking',
    title: { ru: 'Сети', en: 'Networking', zh: '网络' },
    detail: {
      ru: 'TCP/IP, DNS, маршрутизация, чтение трафика в Wireshark.',
      en: 'TCP/IP, DNS, routing, reading traffic in Wireshark.',
      zh: 'TCP/IP、DNS、路由，以及用 Wireshark 读懂流量。',
    },
  },
  {
    id: 'linux',
    title: { ru: 'Linux', en: 'Linux', zh: 'Linux' },
    detail: {
      ru: 'Терминал, права доступа, процессы, службы и логи.',
      en: 'The terminal, permissions, processes, services and logs.',
      zh: '终端、权限、进程、服务与日志。',
    },
  },
  {
    id: 'fundamentals',
    title: { ru: 'Основы кибербезопасности', en: 'Cybersecurity fundamentals', zh: '网络安全基础' },
    detail: {
      ru: 'Триада CIA, модели угроз, хеширование и шифрование.',
      en: 'The CIA triad, threat modeling, hashing and encryption.',
      zh: 'CIA 三要素、威胁建模、哈希与加密。',
    },
  },
  {
    id: 'websec',
    title: { ru: 'Веб-безопасность', en: 'Web security', zh: 'Web 安全' },
    detail: {
      ru: 'HTTP, cookies, OWASP Top 10 на учебных стендах.',
      en: 'HTTP, cookies, the OWASP Top 10 on practice labs.',
      zh: 'HTTP、Cookie，以及在练习环境中学习 OWASP Top 10。',
    },
  },
  {
    id: 'programming',
    title: { ru: 'Программирование', en: 'Programming', zh: '编程' },
    detail: {
      ru: 'Python и C#, Git, чистый и понятный код.',
      en: 'Python and C#, Git, clean and readable code.',
      zh: 'Python 和 C#、Git，以及清晰易读的代码。',
    },
  },
  {
    id: 'automation',
    title: { ru: 'Автоматизация безопасности', en: 'Security automation', zh: '安全自动化' },
    detail: {
      ru: 'Скрипты для рутины: разбор логов, проверки, отчёты.',
      en: 'Scripts for routine work: log parsing, checks, reports.',
      zh: '用脚本处理重复工作：日志解析、检查、报告。',
    },
  },
  {
    id: 'forensics',
    title: { ru: 'Цифровая криминалистика', en: 'Digital forensics', zh: '数字取证' },
    detail: {
      ru: 'Хеши, метаданные, таймлайны — на учебных образах.',
      en: 'Hashes, metadata, timelines — on practice images.',
      zh: '哈希、元数据、时间线——基于练习用镜像。',
    },
  },
];
