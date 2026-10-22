import type { Article } from '../types';

const LOG = `# Blue Team habit on your own Linux machine:
# recent failed SSH logins (systemd-based distros)
journalctl -u ssh --since "1 hour ago" | grep "Failed password"

# Who is logged in right now, and recent logins
who
last -n 10`;

export const redVsBlue: Article = {
  slug: 'red-vs-blue',
  category: 'fundamentals',
  minutes: 5,
  tags: ['red team', 'blue team', 'purple team', 'soc', 'career', 'карьера', '红队', '蓝队'],
  related: ['nmap-basics', 'wireshark-first-pcap', 'hash-encrypt-encode'],
  docs: [
    { label: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
    { label: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
  ],
  i18n: {
    ru: {
      title: 'Red Team и Blue Team: в чём разница',
      intro:
        'Red Team ищет пути атаки, Blue Team их замечает и закрывает. Обе стороны работают на одну цель — сделать систему безопаснее.',
      body: [
        { t: 'h', text: 'Red Team' },
        {
          t: 'p',
          text: 'Красная команда моделирует действия реального злоумышленника — но по договору, в согласованных рамках и с разрешения владельца. Задача — найти слабые места раньше, чем их найдёт кто-то другой.',
        },
        { t: 'h', text: 'Blue Team' },
        {
          t: 'p',
          text: 'Синяя команда защищает: настраивает системы, собирает и анализирует логи, отслеживает подозрительную активность и реагирует на инциденты. Сюда относится работа в SOC, харденинг, мониторинг.',
        },
        {
          t: 'table',
          head: ['', 'Red Team', 'Blue Team'],
          rows: [
            ['Вопрос', 'Как это можно взломать?', 'Как это заметить и остановить?'],
            ['Навыки', 'Сети, веб, эксплуатация, социнженерия', 'Логи, SIEM, сети, форензика'],
            ['Результат', 'Отчёт об уязвимостях', 'Обнаружение, защита, восстановление'],
          ],
        },
        { t: 'h', text: 'Purple Team' },
        {
          t: 'p',
          text: 'Это не отдельная команда, а формат совместной работы: красные показывают технику атаки, синие сразу проверяют, видят ли они её, и улучшают защиту. Общий язык для этого даёт MITRE ATT&CK.',
        },
        {
          t: 'note',
          text: 'Новичку не нужно выбирать сторону сразу. Обе опираются на одну базу: сети, Linux, Windows, веб и программирование.',
        },
      ],
      example: [
        {
          t: 'p',
          text: 'Привычка защитника, которую можно начать тренировать уже сейчас, — смотреть логи своей системы:',
        },
        { t: 'code', code: LOG, lang: 'bash' },
        {
          t: 'p',
          text: 'Много неудачных входов с одного адреса — повод проверить, нужен ли SSH снаружи, отключить вход по паролю и перейти на ключи.',
        },
      ],
      takeaways: [
        'Red Team атакует по договору, Blue Team защищает и обнаруживает.',
        'Без разрешения и согласованных рамок это не Red Team, а атака.',
        'Purple Team — совместная работа, а не отдельная профессия.',
        'Фундамент у обеих сторон общий — с него и стоит начинать.',
      ],
    },
    en: {
      title: 'What Is the Difference Between Red Team and Blue Team?',
      intro:
        'The red team looks for ways in; the blue team spots them and shuts them down. Both work toward the same goal: a more secure system.',
      body: [
        { t: 'h', text: 'Red Team' },
        {
          t: 'p',
          text: "The red team emulates a real adversary — but under contract, within an agreed scope and with the owner's permission. The goal is to find weaknesses before someone else does.",
        },
        { t: 'h', text: 'Blue Team' },
        {
          t: 'p',
          text: 'The blue team defends: hardening systems, collecting and analysing logs, watching for suspicious activity and responding to incidents. SOC work, hardening and monitoring all live here.',
        },
        {
          t: 'table',
          head: ['', 'Red Team', 'Blue Team'],
          rows: [
            ['Question', 'How could this be broken?', 'How do we notice and stop it?'],
            ['Skills', 'Networking, web, exploitation, social engineering', 'Logs, SIEM, networking, forensics'],
            ['Output', 'A findings report', 'Detection, protection, recovery'],
          ],
        },
        { t: 'h', text: 'Purple Team' },
        {
          t: 'p',
          text: 'Not a separate team but a way of working together: red demonstrates an attack technique, blue immediately checks whether they can see it and improves the defences. MITRE ATT&CK provides the shared vocabulary.',
        },
        {
          t: 'note',
          text: 'As a beginner you do not need to pick a side yet. Both rest on the same foundation: networking, Linux, Windows, the web and programming.',
        },
      ],
      example: [
        { t: 'p', text: "A defender's habit you can start practising today — reading your own system's logs:" },
        { t: 'code', code: LOG, lang: 'bash' },
        {
          t: 'p',
          text: 'Many failed logins from one address are a reason to ask whether SSH needs to be exposed at all, disable password login and switch to keys.',
        },
      ],
      takeaways: [
        'Red Team attacks under contract; Blue Team defends and detects.',
        'Without permission and an agreed scope it is not red teaming — it is an attack.',
        'Purple teaming is collaboration, not a separate job.',
        'Both sides share the same fundamentals — start there.',
      ],
    },
    zh: {
      title: '红队和蓝队有什么区别？',
      intro: '红队寻找入侵途径，蓝队发现并封堵它们。双方的目标一致：让系统更安全。',
      body: [
        { t: 'h', text: '红队' },
        {
          t: 'p',
          text: '红队模拟真实攻击者的行为——但前提是签订合同、在约定范围内、并获得系统所有者的授权。目标是抢在别人之前发现弱点。',
        },
        { t: 'h', text: '蓝队' },
        {
          t: 'p',
          text: '蓝队负责防守：加固系统、收集和分析日志、监测可疑活动并响应安全事件。SOC 工作、系统加固和安全监控都属于这一方向。',
        },
        {
          t: 'table',
          head: ['', '红队', '蓝队'],
          rows: [
            ['核心问题', '这个系统怎么会被攻破？', '如何发现并阻止攻击？'],
            ['技能', '网络、Web、漏洞利用、社会工程学', '日志、SIEM、网络、取证'],
            ['产出', '漏洞报告', '检测、防护、恢复'],
          ],
        },
        { t: 'h', text: '紫队' },
        {
          t: 'p',
          text: '紫队不是独立的团队，而是一种协作方式：红队演示攻击技术，蓝队当场验证能否检测到，并改进防御。MITRE ATT&CK 为双方提供了共同语言。',
        },
        { t: 'note', text: '新手不必急着选边站。两个方向的基础相同：网络、Linux、Windows、Web 和编程。' },
      ],
      example: [
        { t: 'p', text: '一个现在就能练起来的防守习惯——查看自己系统的日志：' },
        { t: 'code', code: LOG, lang: 'bash' },
        { t: 'p', text: '如果同一地址出现大量登录失败，就该想想 SSH 是否真的需要对外开放，并关闭密码登录、改用密钥。' },
      ],
      takeaways: [
        '红队在授权合同下进行攻击，蓝队负责防御和检测。',
        '没有授权和约定范围的“红队”，就是攻击。',
        '紫队是一种协作方式，而不是单独的岗位。',
        '双方的基础相同——从基础开始。',
      ],
    },
  },
};
