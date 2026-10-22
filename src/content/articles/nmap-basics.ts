import type { Article } from '../types';

const SCAN = `# 1. Your own machine — always allowed
nmap 127.0.0.1

# 2. Only selected ports + service/version detection
nmap -sV -p 22,80,443 127.0.0.1

# 3. Host discovery in YOUR lab network (e.g. a VirtualBox host-only net)
nmap -sn 192.168.56.0/24

# 4. The Nmap project's own practice host — scanning it is explicitly permitted
nmap scanme.nmap.org`;

const OUTPUT = `PORT    STATE    SERVICE
22/tcp  open     ssh
80/tcp  closed   http
443/tcp filtered https`;

export const nmapBasics: Article = {
  slug: 'nmap-basics',
  category: 'networking',
  minutes: 8,
  tags: ['nmap', 'scan', 'port', 'recon', 'сканирование', '扫描', '端口'],
  related: ['tcp-ip', 'wireshark-first-pcap', 'red-vs-blue'],
  docs: [
    { label: 'Nmap Reference Guide', url: 'https://nmap.org/book/man.html' },
    { label: 'Port scanning basics', url: 'https://nmap.org/book/man-port-scanning-basics.html' },
  ],
  i18n: {
    ru: {
      title: 'Nmap: введение в разрешённое сканирование сети',
      intro:
        'Nmap показывает, какие хосты есть в сети и какие порты на них открыты. Это базовый инструмент и для защиты, и для тестирования — но только там, где у тебя есть разрешение.',
      body: [
        { t: 'h', text: 'Сначала — правила' },
        {
          t: 'note',
          text: 'Сканируй только свои устройства, свою учебную лабораторию или цели, на которые есть явное письменное разрешение. Сканирование чужих сетей может нарушать закон и правила провайдера.',
        },
        { t: 'h', text: 'Что делает Nmap' },
        {
          t: 'list',
          items: [
            'Обнаружение хостов — кто вообще отвечает в сети.',
            'Сканирование портов — какие порты открыты, закрыты или фильтруются.',
            'Определение сервисов и версий (`-sV`) — что именно слушает порт.',
          ],
        },
        { t: 'h', text: 'Состояния портов' },
        {
          t: 'table',
          head: ['Состояние', 'Что это значит'],
          rows: [
            ['open', 'Программа принимает соединения на этом порту.'],
            ['closed', 'Хост отвечает, но на порту никто не слушает.'],
            ['filtered', 'Ответа нет — скорее всего, мешает файрвол.'],
          ],
        },
        { t: 'h', text: 'Полезные флаги' },
        {
          t: 'list',
          items: [
            '`-p 22,80,443` — только перечисленные порты; `-p-` — все 65535.',
            '`-sn` — только найти живые хосты, без сканирования портов.',
            '`-sV` — определить сервис и версию.',
            '`-oN scan.txt` — сохранить результат в файл для отчёта.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'Безопасные цели для первых экспериментов:' },
        { t: 'code', code: SCAN, lang: 'bash' },
        { t: 'p', text: 'Пример того, как может выглядеть результат:' },
        { t: 'code', code: OUTPUT, lang: 'text' },
        {
          t: 'p',
          text: 'Здесь SSH открыт, веб-сервера на 80 нет, а 443 закрыт файрволом. Следующий шаг — понять, нужен ли тебе вообще открытый SSH, и если да, то защищён ли он.',
        },
      ],
      takeaways: [
        'Разрешение важнее любых флагов: без него не сканируй.',
        'open / closed / filtered — три главных состояния порта.',
        'Начинай с `127.0.0.1` и своей виртуальной лаборатории.',
        'Результаты сканирования — повод для вопросов, а не готовый вывод.',
      ],
    },
    en: {
      title: "Nmap: A Beginner's Guide to Authorized Network Scanning",
      intro:
        'Nmap tells you which hosts are on a network and which ports they have open. It is a core tool for both defenders and testers — but only where you have permission.',
      body: [
        { t: 'h', text: 'Rules first' },
        {
          t: 'note',
          text: "Scan only your own devices, your own practice lab, or targets you have explicit written permission for. Scanning other networks can break the law and your ISP's terms.",
        },
        { t: 'h', text: 'What Nmap does' },
        {
          t: 'list',
          items: [
            'Host discovery — who is answering on the network at all.',
            'Port scanning — which ports are open, closed or filtered.',
            'Service and version detection (`-sV`) — what exactly is listening.',
          ],
        },
        { t: 'h', text: 'Port states' },
        {
          t: 'table',
          head: ['State', 'Meaning'],
          rows: [
            ['open', 'A program accepts connections on this port.'],
            ['closed', 'The host answers, but nothing is listening on the port.'],
            ['filtered', 'No answer — most likely a firewall is in the way.'],
          ],
        },
        { t: 'h', text: 'Useful flags' },
        {
          t: 'list',
          items: [
            '`-p 22,80,443` — only the listed ports; `-p-` — all 65535.',
            '`-sn` — only find live hosts, no port scan.',
            '`-sV` — detect the service and its version.',
            '`-oN scan.txt` — save the result to a file for your notes.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'Safe targets for your first experiments:' },
        { t: 'code', code: SCAN, lang: 'bash' },
        { t: 'p', text: 'This is what a result can look like:' },
        { t: 'code', code: OUTPUT, lang: 'text' },
        {
          t: 'p',
          text: 'SSH is open, there is no web server on 80, and 443 is blocked by a firewall. Next question: do you actually need SSH exposed — and if so, is it hardened?',
        },
      ],
      takeaways: [
        'Permission matters more than any flag — no permission, no scan.',
        'open / closed / filtered are the three key port states.',
        'Start with `127.0.0.1` and your own virtual lab.',
        'Scan results raise questions; they are not conclusions on their own.',
      ],
    },
    zh: {
      title: 'Nmap 入门：只做经过授权的网络扫描',
      intro:
        'Nmap 能告诉你网络中有哪些主机、它们开放了哪些端口。它是防守方和测试人员的基础工具——但只能在获得授权的范围内使用。',
      body: [
        { t: 'h', text: '先讲规则' },
        {
          t: 'note',
          text: '只扫描自己的设备、自己的练习环境，或已获得明确书面授权的目标。扫描他人网络可能违法，也可能违反运营商的服务条款。',
        },
        { t: 'h', text: 'Nmap 能做什么' },
        {
          t: 'list',
          items: [
            '主机发现——网络中有哪些主机在响应。',
            '端口扫描——哪些端口是开放、关闭或被过滤的。',
            '服务与版本识别（`-sV`）——端口上到底运行着什么。',
          ],
        },
        { t: 'h', text: '端口状态' },
        {
          t: 'table',
          head: ['状态', '含义'],
          rows: [
            ['open', '有程序在该端口接受连接。'],
            ['closed', '主机有响应，但该端口没有程序监听。'],
            ['filtered', '没有响应——很可能被防火墙拦截。'],
          ],
        },
        { t: 'h', text: '常用参数' },
        {
          t: 'list',
          items: [
            '`-p 22,80,443`——只扫描列出的端口；`-p-`——扫描全部 65535 个端口。',
            '`-sn`——只发现存活主机，不扫描端口。',
            '`-sV`——识别服务及版本。',
            '`-oN scan.txt`——把结果保存到文件，方便记录。',
          ],
        },
      ],
      example: [
        { t: 'p', text: '适合入门练习的安全目标：' },
        { t: 'code', code: SCAN, lang: 'bash' },
        { t: 'p', text: '结果大致如下：' },
        { t: 'code', code: OUTPUT, lang: 'text' },
        {
          t: 'p',
          text: 'SSH 开放，80 端口没有 Web 服务，443 被防火墙过滤。接下来要思考：你真的需要对外开放 SSH 吗？如果需要，它是否做了加固？',
        },
      ],
      takeaways: [
        '授权比任何参数都重要——没有授权就不要扫描。',
        'open / closed / filtered 是三种最关键的端口状态。',
        '从 `127.0.0.1` 和自己的虚拟实验环境开始。',
        '扫描结果只是提出问题的起点，而不是结论。',
      ],
    },
  },
};
