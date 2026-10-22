import type { L, LList } from '../i18n/types';

export type ProjectStatus = 'concept' | 'experimental' | 'in-progress';

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  summary: L;
  /** Paragraphs shown in the detail view. Keep them factual. */
  details: LList;
  tags: string[];
  /** Optional external links. Leave empty until a real repository / page exists. */
  links: { label: string; url: string }[];
  /** Seed for the generated SVG cover (no image files needed). */
  seed: number;
}

/**
 * Initial placeholders — edit to match reality.
 * Never mark something finished that isn't.
 */
export const PROJECTS: Project[] = [
  {
    id: 'b1t-exe',
    name: 'B1t_g0r1lla.exe',
    status: 'concept',
    summary: {
      ru: 'Задуманная рабочая станция для кибербезопасности: анализ сети, утилиты безопасности и сценарии расследований.',
      en: 'A planned cybersecurity workstation exploring network analysis, security utilities, and investigation workflows.',
      zh: '规划中的网络安全工作台，探索网络分析、安全工具与调查流程。',
    },
    details: {
      ru: [
        'Сейчас это концепт: рабочей сборки пока нет.',
        'Идея — собрать в одном месте инструменты, которые я изучаю: просмотр сетевой активности, набор утилит и заметки по ходу расследования.',
        'Следующий шаг — описать сценарии использования и собрать первый прототип интерфейса.',
      ],
      en: [
        'Right now this is a concept: there is no working build yet.',
        'The idea is to bring the tools I am learning into one place: a view of network activity, a set of utilities, and notes taken during an investigation.',
        'Next step: describe the use cases and put together a first interface prototype.',
      ],
      zh: [
        '目前只是一个概念，还没有可运行的版本。',
        '设想是把我正在学习的工具集中到一处：网络活动视图、一组实用工具，以及调查过程中的笔记。',
        '下一步：梳理使用场景，并做出第一个界面原型。',
      ],
    },
    tags: ['C#', 'Networking', 'Blue Team', 'UI'],
    links: [],
    seed: 7,
  },
  {
    id: 'toolbox',
    name: 'Personal Toolbox',
    status: 'experimental',
    summary: {
      ru: 'Набор небольших скриптов, утилит и экспериментов в разработке.',
      en: 'A collection of small scripts, utilities, and development experiments.',
      zh: '一组小脚本、实用工具和开发实验。',
    },
    details: {
      ru: [
        'Место для маленьких инструментов, которые решают мои повседневные задачи и помогают разобраться в теме.',
        'Статус «эксперимент»: что-то работает, что-то переписывается, что-то будет удалено.',
        'Ничего отсюда не стоит запускать на чужих системах — только в своей лаборатории.',
      ],
      en: [
        'A home for small tools that solve my everyday tasks and help me understand a topic.',
        'Status "experimental": some things work, some are being rewritten, some will be removed.',
        "Nothing here is meant to be run against other people's systems — only in my own lab.",
      ],
      zh: [
        '存放小工具的地方，用来解决日常小问题，也帮助我理解某个主题。',
        '状态为“实验中”：有的能用，有的在重写，有的会被删除。',
        '这里的任何内容都只应在自己的实验环境中运行，不针对他人的系统。',
      ],
    },
    tags: ['Python', 'Bash', 'Automation'],
    links: [],
    seed: 19,
  },
  {
    id: 'notes',
    name: 'Cybersecurity Notes',
    status: 'in-progress',
    summary: {
      ru: 'Растущая база знаний: технические заметки, туториалы и полезные ссылки.',
      en: 'An evolving knowledge base of technical notes, tutorials, and useful references.',
      zh: '不断完善的知识库：技术笔记、教程和实用参考资料。',
    },
    details: {
      ru: [
        'Заметки, которые я веду во время обучения. Часть из них уже опубликована в разделе «Обучение» на этом сайте.',
        'Формат: коротко, с примерами и ссылками на официальную документацию.',
        'Пополняется по мере изучения новых тем.',
      ],
      en: [
        'Notes I keep while learning. Some of them are already published in the Learn section of this site.',
        'Format: short, with examples and links to official documentation.',
        'Grows as I study new topics.',
      ],
      zh: [
        '学习过程中记录的笔记，其中一部分已发布在本站的“学习”栏目中。',
        '格式：简短、有示例，并附官方文档链接。',
        '随着学习新主题持续更新。',
      ],
    },
    tags: ['Markdown', 'Networking', 'Linux', 'Web'],
    links: [],
    seed: 31,
  },
];
