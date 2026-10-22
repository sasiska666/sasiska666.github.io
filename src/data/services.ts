import type { L } from '../i18n/types';

/**
 * WHAT I CAN HELP WITH — edit, remove or add entries.
 * No prices, clients or testimonials on purpose.
 */
export interface Service {
  id: string;
  title: L;
  text: L;
}

export const SERVICES: Service[] = [
  {
    id: 'network',
    title: { ru: 'Базовая диагностика сети', en: 'Basic network diagnostics', zh: '基础网络诊断' },
    text: {
      ru: 'Разобраться, почему пропадает интернет, не открывается сайт или не работает DNS — по шагам.',
      en: "Work out step by step why the connection drops, a site won't load, or DNS misbehaves.",
      zh: '一步步排查断网、网站打不开或 DNS 异常的原因。',
    },
  },
  {
    id: 'linux',
    title: { ru: 'Установка и настройка Linux', en: 'Linux setup & troubleshooting', zh: 'Linux 安装与排错' },
    text: {
      ru: 'Помочь новичку поставить дистрибутив, настроить окружение и починить типичные проблемы.',
      en: 'Help a beginner install a distro, set up the environment, and fix common issues.',
      zh: '帮助新手安装发行版、配置环境并解决常见问题。',
    },
  },
  {
    id: 'automation',
    title: { ru: 'Простые скрипты автоматизации', en: 'Simple automation scripts', zh: '简单的自动化脚本' },
    text: {
      ru: 'Небольшие скрипты на Python или Bash, которые избавляют от рутины.',
      en: 'Small Python or Bash scripts that take care of repetitive work.',
      zh: '用 Python 或 Bash 编写的小脚本，帮你摆脱重复劳动。',
    },
  },
  {
    id: 'code',
    title: { ru: 'Небольшие задачи по программированию', en: 'Small programming tasks', zh: '小型编程任务' },
    text: {
      ru: 'Учебные и бытовые задачи на Python или C#, с понятным кодом и комментариями.',
      en: 'Study or everyday tasks in Python or C#, with readable, commented code.',
      zh: '用 Python 或 C# 完成学习或日常任务，代码清晰并附注释。',
    },
  },
  {
    id: 'web',
    title: { ru: 'Поддержка и доработка сайтов', en: 'Website maintenance & frontend fixes', zh: '网站维护与前端改进' },
    text: {
      ru: 'Мелкие правки вёрстки, адаптив, обновление контента на статических сайтах.',
      en: 'Small layout fixes, responsiveness, and content updates on static sites.',
      zh: '静态网站的小型布局修复、响应式适配和内容更新。',
    },
  },
  {
    id: 'review',
    title: {
      ru: 'Базовая проверка настроек безопасности',
      en: 'Basic security configuration review',
      zh: '基础安全配置检查',
    },
    text: {
      ru: 'Чек-лист для домашнего роутера, аккаунтов или небольшого сервера: пароли, 2FA, обновления, лишние открытые порты.',
      en: 'A checklist pass over a home router, accounts or a small server: passwords, 2FA, updates, unnecessary open ports.',
      zh: '针对家用路由器、账号或小型服务器做清单式检查：密码、双因素认证、更新、多余的开放端口。',
    },
  },
  {
    id: 'docs',
    title: { ru: 'Объяснения и документация', en: 'Explanations & technical docs', zh: '技术讲解与文档' },
    text: {
      ru: 'Простыми словами объяснить тему или оформить README и инструкцию.',
      en: 'Explain a topic in plain words, or write a README and a how-to.',
      zh: '用通俗的话讲清一个主题，或编写 README 和使用说明。',
    },
  },
];
