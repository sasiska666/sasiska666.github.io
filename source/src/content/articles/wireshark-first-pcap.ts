import type { Article } from '../types';

const FILTERS = `dns
http
ip.addr == 192.168.56.10
tcp.port == 443
tcp.flags.syn == 1 && tcp.flags.ack == 0
http.request.method == "POST"`;

export const wiresharkFirstPcap: Article = {
  slug: 'wireshark-first-pcap',
  category: 'blueteam',
  minutes: 8,
  tags: ['wireshark', 'pcap', 'packet', 'traffic', 'filter', 'трафик', '抓包', '流量'],
  related: ['tcp-ip', 'http-explained', 'nmap-basics'],
  docs: [
    { label: "Wireshark User's Guide", url: 'https://www.wireshark.org/docs/wsug_html_chunked/' },
    { label: 'Display filter reference', url: 'https://www.wireshark.org/docs/dfref/' },
    { label: 'Sample captures', url: 'https://wiki.wireshark.org/SampleCaptures' },
  ],
  i18n: {
    ru: {
      title: 'Wireshark: как прочитать свой первый PCAP',
      intro:
        'PCAP — это файл с записанным сетевым трафиком. Wireshark открывает его и раскладывает каждый пакет по уровням. Разберёмся, с чего начать и как не утонуть в тысячах строк.',
      body: [
        { t: 'h', text: 'Где взять трафик' },
        {
          t: 'list',
          items: [
            'Готовые учебные PCAP из официальной вики Wireshark — самый безопасный старт.',
            'Свой трафик: запись на собственном компьютере или в своей лаборатории.',
            'Не записывай трафик в чужих или общественных сетях: там чужие данные.',
          ],
        },
        { t: 'h', text: 'Три панели' },
        {
          t: 'table',
          head: ['Панель', 'Что показывает'],
          rows: [
            ['Список пакетов', 'Время, источник, получатель, протокол, краткое описание'],
            ['Детали', 'Пакет по уровням: Ethernet → IP → TCP/UDP → протокол'],
            ['Байты', 'Сырые данные в hex и ASCII'],
          ],
        },
        { t: 'h', text: 'Фильтры отображения' },
        {
          t: 'p',
          text: 'Главный навык — фильтровать. Фильтр отображения (строка сверху) прячет лишнее, не удаляя данные. Не путай с capture-фильтром, который решает, что вообще записывать.',
        },
        { t: 'h', text: 'Порядок разбора' },
        {
          t: 'list',
          ordered: true,
          items: [
            'Statistics → Protocol Hierarchy: какие протоколы есть в файле.',
            'Statistics → Conversations: кто с кем больше всего общался.',
            'Фильтр по интересному адресу или протоколу.',
            'Правый клик по пакету → Follow → TCP Stream: весь диалог целиком.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'Фильтры, которые пригодятся в первый же день:' },
        { t: 'code', code: FILTERS, lang: 'text' },
        {
          t: 'p',
          text: 'Фильтр `tcp.flags.syn == 1 && tcp.flags.ack == 0` показывает только начала TCP-соединений. Много таких пакетов к разным портам одного хоста за короткое время — типичный признак сканирования портов.',
        },
      ],
      takeaways: [
        'Начинай с учебных PCAP или своего трафика.',
        'Фильтр отображения скрывает лишнее, capture-фильтр решает, что записать.',
        'Statistics даёт общую картину до погружения в отдельные пакеты.',
        'Follow TCP Stream превращает пакеты в понятный диалог.',
      ],
    },
    en: {
      title: 'Wireshark: How to Read Your First PCAP',
      intro:
        'A PCAP is a file of recorded network traffic. Wireshark opens it and breaks every packet down by layer. Here is where to start without drowning in thousands of lines.',
      body: [
        { t: 'h', text: 'Where to get traffic' },
        {
          t: 'list',
          items: [
            'Sample captures from the official Wireshark wiki — the safest start.',
            'Your own traffic: capture on your own computer or in your own lab.',
            "Do not capture on networks that are not yours or on public Wi-Fi: that is other people's data.",
          ],
        },
        { t: 'h', text: 'The three panes' },
        {
          t: 'table',
          head: ['Pane', 'What it shows'],
          rows: [
            ['Packet list', 'Time, source, destination, protocol, short summary'],
            ['Packet details', 'The packet by layer: Ethernet → IP → TCP/UDP → protocol'],
            ['Packet bytes', 'Raw data in hex and ASCII'],
          ],
        },
        { t: 'h', text: 'Display filters' },
        {
          t: 'p',
          text: 'Filtering is the key skill. A display filter (the bar at the top) hides noise without deleting data. Do not confuse it with a capture filter, which decides what gets recorded in the first place.',
        },
        { t: 'h', text: 'A reading routine' },
        {
          t: 'list',
          ordered: true,
          items: [
            'Statistics → Protocol Hierarchy: which protocols are in the file.',
            'Statistics → Conversations: who talked to whom the most.',
            'Filter on the interesting address or protocol.',
            'Right-click a packet → Follow → TCP Stream: the whole conversation at once.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'Filters you will use on day one:' },
        { t: 'code', code: FILTERS, lang: 'text' },
        {
          t: 'p',
          text: 'The filter `tcp.flags.syn == 1 && tcp.flags.ack == 0` shows only the first packet of each TCP connection attempt. Lots of these to many ports of one host in a short time is a classic sign of a port scan.',
        },
      ],
      takeaways: [
        'Start with sample captures or your own traffic.',
        'Display filters hide noise; capture filters decide what gets recorded.',
        'Statistics give you the big picture before you dive into packets.',
        'Follow TCP Stream turns packets into a readable conversation.',
      ],
    },
    zh: {
      title: 'Wireshark：读懂你的第一个 PCAP',
      intro:
        'PCAP 是记录网络流量的文件。Wireshark 可以打开它，并把每个数据包按层次拆开。下面教你从哪里入手，避免被成千上万行数据淹没。',
      body: [
        { t: 'h', text: '流量从哪里来' },
        {
          t: 'list',
          items: [
            'Wireshark 官方 Wiki 提供的示例抓包文件——最安全的起点。',
            '自己的流量：在自己的电脑或实验环境中抓包。',
            '不要在别人的网络或公共 Wi-Fi 上抓包：那是别人的数据。',
          ],
        },
        { t: 'h', text: '三个面板' },
        {
          t: 'table',
          head: ['面板', '显示内容'],
          rows: [
            ['数据包列表', '时间、源地址、目的地址、协议、简要信息'],
            ['数据包详情', '按层展开：以太网 → IP → TCP/UDP → 应用协议'],
            ['数据包字节', '十六进制和 ASCII 形式的原始数据'],
          ],
        },
        { t: 'h', text: '显示过滤器' },
        {
          t: 'p',
          text: '过滤是最关键的技能。显示过滤器（顶部输入栏）只隐藏无关内容，不会删除数据。注意不要和捕获过滤器混淆——后者决定一开始记录哪些流量。',
        },
        { t: 'h', text: '分析步骤' },
        {
          t: 'list',
          ordered: true,
          items: [
            'Statistics → Protocol Hierarchy：文件里有哪些协议。',
            'Statistics → Conversations：谁和谁通信最多。',
            '按感兴趣的地址或协议进行过滤。',
            '右键数据包 → Follow → TCP Stream：一次看完整段对话。',
          ],
        },
      ],
      example: [
        { t: 'p', text: '第一天就能用上的过滤器：' },
        { t: 'code', code: FILTERS, lang: 'text' },
        {
          t: 'p',
          text: '过滤器 `tcp.flags.syn == 1 && tcp.flags.ack == 0` 只显示每次 TCP 连接尝试的第一个包。短时间内大量此类包发往同一主机的不同端口，是端口扫描的典型特征。',
        },
      ],
      takeaways: [
        '从示例抓包或自己的流量开始。',
        '显示过滤器隐藏噪音，捕获过滤器决定记录什么。',
        '先用 Statistics 看全局，再深入单个数据包。',
        'Follow TCP Stream 能把数据包还原成可读的对话。',
      ],
    },
  },
};
