import type { L } from '../i18n/types';

export type ToolStatus = 'learning' | 'exploring' | 'used';
export type ToolCategory = 'analysis' | 'scanner' | 'vcs' | 'os' | 'language' | 'proxy' | 'database' | 'containers';

export interface Tool {
  id: string;
  name: string;
  /** Two-letter "element" symbol for the grid. */
  symbol: string;
  category: ToolCategory;
  /** Honest familiarity label — change it when it becomes true. */
  status: ToolStatus;
  docs: string;
  text: L;
}

export const TOOLS: Tool[] = [
  {
    id: 'wireshark',
    name: 'Wireshark',
    symbol: 'Ws',
    category: 'analysis',
    status: 'exploring',
    docs: 'https://www.wireshark.org/docs/',
    text: {
      ru: 'Анализатор сетевого трафика: показывает пакеты по слоям и помогает понять, что на самом деле происходит в сети.',
      en: 'A network protocol analyzer: it shows packets layer by layer and helps you see what is really happening on the wire.',
      zh: '网络协议分析器：逐层展示数据包，帮助你看清网络中真正发生了什么。',
    },
  },
  {
    id: 'nmap',
    name: 'Nmap',
    symbol: 'Nm',
    category: 'scanner',
    status: 'exploring',
    docs: 'https://nmap.org/docs.html',
    text: {
      ru: 'Сетевой сканер для поиска хостов и открытых портов. Использовать только в своей сети или с разрешения.',
      en: 'A network scanner for discovering hosts and open ports. Use it only on your own network or with permission.',
      zh: '用于发现主机和开放端口的网络扫描器。仅在自己的网络或获得授权时使用。',
    },
  },
  {
    id: 'git',
    name: 'Git',
    symbol: 'Gt',
    category: 'vcs',
    status: 'learning',
    docs: 'https://git-scm.com/doc',
    text: {
      ru: 'Система контроля версий: история изменений, ветки и совместная работа над кодом.',
      en: 'A version control system: change history, branches and collaborating on code.',
      zh: '版本控制系统：记录变更历史、管理分支，支持协作开发。',
    },
  },
  {
    id: 'linux',
    name: 'Linux',
    symbol: 'Lx',
    category: 'os',
    status: 'learning',
    docs: 'https://man7.org/linux/man-pages/',
    text: {
      ru: 'Основа большинства серверов и инструментов безопасности. Терминал, права, процессы, сеть.',
      en: 'The foundation of most servers and security tooling. Terminal, permissions, processes, networking.',
      zh: '大多数服务器和安全工具的基础。终端、权限、进程、网络。',
    },
  },
  {
    id: 'python',
    name: 'Python',
    symbol: 'Py',
    category: 'language',
    status: 'learning',
    docs: 'https://docs.python.org/3/',
    text: {
      ru: 'Язык для автоматизации, скриптов и анализа данных. Отличный первый язык для безопасности.',
      en: 'A language for automation, scripting and data analysis. A great first language for security work.',
      zh: '适合自动化、脚本和数据分析的语言，是入门安全领域的理想首选语言。',
    },
  },
  {
    id: 'csharp',
    name: 'C#',
    symbol: 'C#',
    category: 'language',
    status: 'learning',
    docs: 'https://learn.microsoft.com/dotnet/csharp/',
    text: {
      ru: 'Строго типизированный язык платформы .NET для десктопных приложений, утилит и сервисов.',
      en: 'A strongly typed .NET language for desktop apps, utilities and services.',
      zh: '.NET 平台上的强类型语言，可用于桌面应用、工具和服务。',
    },
  },
  {
    id: 'zap',
    name: 'OWASP ZAP',
    symbol: 'Zp',
    category: 'proxy',
    status: 'exploring',
    docs: 'https://www.zaproxy.org/docs/',
    text: {
      ru: 'Бесплатный прокси для тестирования веб-приложений. Применять только к своим учебным стендам или с разрешением.',
      en: 'A free proxy for testing web applications. Use it only against your own practice apps or with permission.',
      zh: '免费的 Web 应用测试代理。仅用于自己的练习应用或获得授权的目标。',
    },
  },
  {
    id: 'burp',
    name: 'Burp Suite',
    symbol: 'Bp',
    category: 'proxy',
    status: 'exploring',
    docs: 'https://portswigger.net/burp/documentation',
    text: {
      ru: 'Перехватывающий прокси: позволяет смотреть и изменять HTTP-запросы. Community Edition подходит для обучения.',
      en: 'An intercepting proxy for viewing and modifying HTTP requests. The Community Edition is fine for learning.',
      zh: '拦截代理，可查看并修改 HTTP 请求。社区版足以用于学习。',
    },
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    symbol: 'Sq',
    category: 'database',
    status: 'exploring',
    docs: 'https://www.sqlite.org/docs.html',
    text: {
      ru: 'Встраиваемая база данных в одном файле. Удобна для учебных проектов и изучения SQL.',
      en: 'An embedded, single-file database. Handy for small projects and for learning SQL.',
      zh: '单文件嵌入式数据库，适合小项目和学习 SQL。',
    },
  },
  {
    id: 'docker',
    name: 'Docker',
    symbol: 'Dk',
    category: 'containers',
    status: 'exploring',
    docs: 'https://docs.docker.com/',
    text: {
      ru: 'Контейнеры для изолированных окружений: удобно поднимать учебные стенды и быстро их удалять.',
      en: 'Containers for isolated environments: an easy way to spin up practice labs and throw them away.',
      zh: '用容器创建隔离环境：方便快速搭建练习环境，用完即删。',
    },
  },
];
