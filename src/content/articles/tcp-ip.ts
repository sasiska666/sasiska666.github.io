import type { Article } from '../types';

const CMD = `# Linux: your addresses and the default gateway
ip addr
ip route

# Who is listening on which port on THIS machine
ss -tuln

# Watch a real TCP connection being made (handshake + HTTP)
curl -v http://example.com`;

export const tcpIp: Article = {
  slug: 'tcp-ip',
  category: 'networking',
  minutes: 7,
  tags: ['tcp', 'ip', 'udp', 'port', 'osi', 'handshake', 'сеть', '网络', '端口'],
  related: ['http-explained', 'wireshark-first-pcap', 'nmap-basics'],
  docs: [
    { label: 'RFC 9293 — TCP', url: 'https://www.rfc-editor.org/rfc/rfc9293' },
    { label: 'MDN — TCP', url: 'https://developer.mozilla.org/en-US/docs/Glossary/TCP' },
  ],
  i18n: {
    ru: {
      title: 'TCP/IP без путаницы',
      intro:
        'Каждый раз, когда ты открываешь сайт, данные проходят через несколько уровней. Разберём, за что отвечает каждый из них, — без лишней теории.',
      body: [
        { t: 'h', text: 'Четыре уровня' },
        {
          t: 'p',
          text: 'Модель TCP/IP делит работу сети на уровни. Каждый уровень решает свою задачу и не думает о чужой — поэтому сайт работает и по Wi-Fi, и по кабелю.',
        },
        {
          t: 'table',
          head: ['Уровень', 'Задача', 'Примеры'],
          rows: [
            ['Прикладной', 'Смысл данных', 'HTTP, DNS, SSH'],
            ['Транспортный', 'Доставка между программами (порты)', 'TCP, UDP'],
            ['Сетевой', 'Доставка между компьютерами (IP-адреса)', 'IPv4, IPv6, ICMP'],
            ['Канальный', 'Передача в локальной сети', 'Ethernet, Wi-Fi'],
          ],
        },
        { t: 'h', text: 'IP-адрес и порт' },
        {
          t: 'p',
          text: 'IP-адрес указывает на компьютер, а порт — на конкретную программу на нём. Пара `IP:порт` (например, `203.0.113.10:443`) называется сокетом. Веб-серверы обычно слушают 80 (HTTP) и 443 (HTTPS), SSH — 22, DNS — 53.',
        },
        { t: 'h', text: 'TCP и UDP' },
        {
          t: 'list',
          items: [
            'TCP устанавливает соединение, нумерует данные и пересылает потерянное. Надёжно, но с накладными расходами — подходит для веба, почты, SSH.',
            'UDP просто отправляет датаграммы без гарантий. Быстро и легко — подходит для DNS-запросов, звонков, игр.',
          ],
        },
        { t: 'h', text: 'Тройное рукопожатие' },
        {
          t: 'p',
          text: 'Перед обменом данными TCP договаривается о соединении: клиент отправляет `SYN`, сервер отвечает `SYN-ACK`, клиент подтверждает `ACK`. Если порт закрыт, вместо `SYN-ACK` придёт `RST`.',
        },
        {
          t: 'note',
          text: 'Именно по этим ответам сканеры вроде Nmap понимают, открыт порт или нет.',
        },
      ],
      example: [
        { t: 'p', text: 'Посмотри на уровни вживую на своей машине (Linux):' },
        { t: 'code', code: CMD, lang: 'bash' },
        {
          t: 'p',
          text: 'В выводе `curl -v` строка `Connected to example.com (…) port 80` означает, что рукопожатие TCP прошло; дальше идёт уже прикладной уровень — HTTP-запрос и ответ.',
        },
      ],
      takeaways: [
        'IP-адрес — какой компьютер, порт — какая программа.',
        'TCP — надёжная доставка с соединением, UDP — быстрая без гарантий.',
        'Соединение TCP начинается с SYN → SYN-ACK → ACK.',
        'Проблему в сети удобно искать по уровням, снизу вверх.',
      ],
    },
    en: {
      title: 'TCP/IP Explained Without the Confusion',
      intro:
        'Every time you open a website, your data passes through several layers. Here is what each one is responsible for — without the textbook overload.',
      body: [
        { t: 'h', text: 'Four layers' },
        {
          t: 'p',
          text: 'The TCP/IP model splits networking into layers. Each one solves its own problem and ignores the others — which is why the same website works over Wi-Fi or a cable.',
        },
        {
          t: 'table',
          head: ['Layer', 'Job', 'Examples'],
          rows: [
            ['Application', 'What the data means', 'HTTP, DNS, SSH'],
            ['Transport', 'Delivery between programs (ports)', 'TCP, UDP'],
            ['Internet', 'Delivery between machines (IP addresses)', 'IPv4, IPv6, ICMP'],
            ['Link', 'Transmission on the local network', 'Ethernet, Wi-Fi'],
          ],
        },
        { t: 'h', text: 'IP address and port' },
        {
          t: 'p',
          text: 'An IP address identifies a machine; a port identifies a program on it. The pair `IP:port` (for example `203.0.113.10:443`) is called a socket. Web servers usually listen on 80 (HTTP) and 443 (HTTPS), SSH on 22, DNS on 53.',
        },
        { t: 'h', text: 'TCP vs UDP' },
        {
          t: 'list',
          items: [
            'TCP sets up a connection, numbers the data and resends anything lost. Reliable but with overhead — used for the web, email, SSH.',
            'UDP just sends datagrams with no guarantees. Fast and lightweight — used for DNS queries, calls, games.',
          ],
        },
        { t: 'h', text: 'The three-way handshake' },
        {
          t: 'p',
          text: 'Before any data flows, TCP negotiates the connection: the client sends `SYN`, the server answers `SYN-ACK`, the client confirms with `ACK`. If the port is closed, the server replies with `RST` instead.',
        },
        {
          t: 'note',
          text: 'Those replies are exactly how scanners such as Nmap decide whether a port is open.',
        },
      ],
      example: [
        { t: 'p', text: 'See the layers in action on your own machine (Linux):' },
        { t: 'code', code: CMD, lang: 'bash' },
        {
          t: 'p',
          text: 'In the `curl -v` output, the line `Connected to example.com (…) port 80` means the TCP handshake succeeded; everything after it is the application layer — the HTTP request and response.',
        },
      ],
      takeaways: [
        'The IP address picks the machine; the port picks the program.',
        'TCP is reliable and connection-based; UDP is fast with no guarantees.',
        'A TCP connection starts with SYN → SYN-ACK → ACK.',
        'Troubleshoot networks layer by layer, from the bottom up.',
      ],
    },
    zh: {
      title: '一次讲清 TCP/IP',
      intro: '每次打开网站，数据都会经过好几层。下面不讲繁琐的理论，只说清楚每一层负责什么。',
      body: [
        { t: 'h', text: '四个层次' },
        {
          t: 'p',
          text: 'TCP/IP 模型把网络通信分成若干层。每层只解决自己的问题，不关心其他层——所以同一个网站无论用 Wi-Fi 还是网线都能访问。',
        },
        {
          t: 'table',
          head: ['层次', '职责', '示例'],
          rows: [
            ['应用层', '数据的含义', 'HTTP、DNS、SSH'],
            ['传输层', '程序之间的传递（端口）', 'TCP、UDP'],
            ['网络层', '主机之间的传递（IP 地址）', 'IPv4、IPv6、ICMP'],
            ['链路层', '局域网内的传输', '以太网、Wi-Fi'],
          ],
        },
        { t: 'h', text: 'IP 地址与端口' },
        {
          t: 'p',
          text: 'IP 地址标识一台主机，端口标识主机上的某个程序。`IP:端口` 这一组合（例如 `203.0.113.10:443`）称为套接字（socket）。Web 服务器通常监听 80（HTTP）和 443（HTTPS），SSH 用 22，DNS 用 53。',
        },
        { t: 'h', text: 'TCP 与 UDP' },
        {
          t: 'list',
          items: [
            'TCP 先建立连接，为数据编号并重传丢失的部分。可靠但有开销——用于网页、邮件、SSH。',
            'UDP 直接发送数据报，不做任何保证。快速轻量——用于 DNS 查询、语音通话、游戏。',
          ],
        },
        { t: 'h', text: '三次握手' },
        {
          t: 'p',
          text: '传输数据之前，TCP 要先建立连接：客户端发送 `SYN`，服务器回复 `SYN-ACK`，客户端再用 `ACK` 确认。如果端口关闭，服务器会回复 `RST`。',
        },
        { t: 'note', text: 'Nmap 等扫描器正是根据这些回复来判断端口是否开放的。' },
      ],
      example: [
        { t: 'p', text: '在自己的机器上（Linux）实际观察这些层次：' },
        { t: 'code', code: CMD, lang: 'bash' },
        {
          t: 'p',
          text: '在 `curl -v` 的输出中，`Connected to example.com (…) port 80` 这一行表示 TCP 握手成功；之后的内容属于应用层——HTTP 请求与响应。',
        },
      ],
      takeaways: [
        'IP 地址决定哪台主机，端口决定哪个程序。',
        'TCP 可靠、面向连接；UDP 快速、不作保证。',
        'TCP 连接以 SYN → SYN-ACK → ACK 开始。',
        '排查网络问题时，按层次自下而上进行。',
      ],
    },
  },
};
