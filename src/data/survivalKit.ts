import type { L, LList } from '../i18n/types';

export type KitGroup =
  | 'linux'
  | 'windows'
  | 'network'
  | 'git'
  | 'http'
  | 'mistakes'
  | 'terms'
  | 'checklist'
  | 'roadmap'
  | 'docs'
  | 'lab';

export const KIT_GROUPS: KitGroup[] = [
  'linux',
  'windows',
  'network',
  'git',
  'http',
  'mistakes',
  'terms',
  'checklist',
  'roadmap',
  'docs',
  'lab',
];

export type OS = 'linux' | 'windows' | 'macos' | 'any';

export interface KitCommand {
  os: OS[];
  cmd: string;
}

export interface KitItem {
  id: string;
  groups: KitGroup[];
  title: L;
  text: L;
  commands?: KitCommand[];
  /** Bullet points or ordered steps. */
  points?: LList;
  ordered?: boolean;
  /** Key → explanation rows (e.g. HTTP status codes). */
  pairs?: { k: string; v: L }[];
  links?: { label: string; url: string }[];
  warning?: L;
}

export const KIT: KitItem[] = [
  {
    id: 'ip-config',
    groups: ['network', 'linux', 'windows'],
    title: { ru: 'Сетевые настройки', en: 'Network configuration', zh: '查看网络配置' },
    text: {
      ru: 'Показывает IP-адреса, маски и интерфейсы. В Windows — `ipconfig`, в Linux — `ip addr` (старый `ifconfig` есть не везде).',
      en: 'Shows IP addresses, masks and interfaces. Windows uses `ipconfig`; Linux uses `ip addr` (the older `ifconfig` is not always installed).',
      zh: '显示 IP 地址、子网掩码和网卡接口。Windows 用 `ipconfig`，Linux 用 `ip addr`（旧的 `ifconfig` 并非总是预装）。',
    },
    commands: [
      { os: ['linux'], cmd: 'ip addr' },
      { os: ['windows'], cmd: 'ipconfig /all' },
    ],
  },
  {
    id: 'ping',
    groups: ['network'],
    title: { ru: 'ping — есть ли связь', en: 'ping — is the host reachable', zh: 'ping —— 主机是否可达' },
    text: {
      ru: 'Отправляет ICMP-запросы и показывает задержку. Успешный ping не доказывает, что работает нужный сервис (например, веб-сервер на 443), а неудачный — что хост выключен: ICMP часто блокируют.',
      en: 'Sends ICMP echo requests and shows latency. A successful ping does not prove that a specific service (say, a web server on 443) works, and a failed one does not prove the host is down — ICMP is often blocked.',
      zh: '发送 ICMP 回显请求并显示延迟。ping 通不代表具体服务（例如 443 端口上的网站）正常；ping 不通也不代表主机宕机——ICMP 经常被屏蔽。',
    },
    commands: [
      { os: ['linux', 'macos'], cmd: 'ping -c 4 1.1.1.1' },
      { os: ['windows'], cmd: 'ping -n 4 1.1.1.1' },
    ],
  },
  {
    id: 'dns',
    groups: ['network'],
    title: { ru: 'Проверка DNS', en: 'DNS troubleshooting', zh: 'DNS 排查' },
    text: {
      ru: 'Если по IP сайт открывается, а по имени — нет, проблема почти наверняка в DNS. `nslookup` есть везде; `dig` даёт более подробный вывод на Linux/macOS.',
      en: 'If a site opens by IP but not by name, the problem is almost certainly DNS. `nslookup` exists everywhere; `dig` gives more detail on Linux/macOS.',
      zh: '如果能通过 IP 访问网站却无法通过域名访问，问题几乎一定出在 DNS。`nslookup` 各系统都有；`dig` 在 Linux/macOS 上输出更详细。',
    },
    commands: [
      { os: ['any'], cmd: 'nslookup example.com' },
      { os: ['linux', 'macos'], cmd: 'dig example.com +short' },
    ],
  },
  {
    id: 'route',
    groups: ['network'],
    title: { ru: 'Маршрут до узла', en: 'Trace the route', zh: '追踪路由' },
    text: {
      ru: 'Показывает, через какие узлы идут пакеты, и помогает понять, на каком участке теряется связь.',
      en: 'Shows which hops packets pass through and helps locate where connectivity breaks.',
      zh: '显示数据包经过的每一跳，帮助定位连接在哪一段中断。',
    },
    commands: [
      { os: ['linux', 'macos'], cmd: 'traceroute example.com' },
      { os: ['windows'], cmd: 'tracert example.com' },
    ],
  },
  {
    id: 'ports',
    groups: ['network', 'linux', 'windows'],
    title: {
      ru: 'Какие порты слушает моя система',
      en: 'Which ports is my machine listening on',
      zh: '本机在监听哪些端口',
    },
    text: {
      ru: 'Полезно проверить, что лишнего наружу ничего не открыто. Смотрите на свою машину — это безопасная и законная разведка.',
      en: 'Useful to make sure nothing unexpected is exposed. You are looking at your own machine — safe and legal reconnaissance.',
      zh: '用来确认没有意外暴露的服务。你查看的是自己的机器——安全且合法。',
    },
    commands: [
      { os: ['linux'], cmd: 'ss -tuln' },
      { os: ['windows'], cmd: 'netstat -ano' },
    ],
  },
  {
    id: 'hash',
    groups: ['linux', 'windows'],
    title: { ru: 'Хеш файла', en: 'File hash', zh: '计算文件哈希' },
    text: {
      ru: 'Сравни SHA-256 скачанного файла с тем, что опубликовал автор: если совпадает — файл не повреждён и не подменён.',
      en: 'Compare the SHA-256 of a downloaded file with the one published by the author: if they match, the file was not corrupted or swapped.',
      zh: '把下载文件的 SHA-256 与作者公布的值对比：一致则说明文件没有损坏或被替换。',
    },
    commands: [
      { os: ['linux'], cmd: 'sha256sum file.iso' },
      { os: ['macos'], cmd: 'shasum -a 256 file.iso' },
      { os: ['windows'], cmd: 'Get-FileHash file.iso -Algorithm SHA256' },
    ],
  },
  {
    id: 'interrupt',
    groups: ['linux', 'mistakes'],
    title: { ru: 'Ctrl + C и его соседи', en: 'Ctrl + C and friends', zh: 'Ctrl + C 及相关快捷键' },
    text: {
      ru: '`Ctrl + C` прерывает текущий процесс. `Ctrl + D` закрывает ввод (выход из оболочки). `Ctrl + Z` не останавливает, а приостанавливает процесс — вернуть его можно командой `fg`.',
      en: '`Ctrl + C` interrupts the foreground process. `Ctrl + D` sends end-of-input (exits a shell). `Ctrl + Z` does not stop a process, it suspends it — bring it back with `fg`.',
      zh: '`Ctrl + C` 中断前台进程；`Ctrl + D` 发送输入结束（退出 shell）；`Ctrl + Z` 不是终止而是挂起进程，可用 `fg` 恢复。',
    },
    commands: [{ os: ['linux', 'macos'], cmd: 'fg' }],
  },
  {
    id: 'help',
    groups: ['linux'],
    title: { ru: 'Сначала — документация', en: 'Read the manual first', zh: '先看文档' },
    text: {
      ru: 'Почти у каждой команды есть встроенная справка. Это быстрее и надёжнее, чем случайный ответ на форуме.',
      en: 'Almost every command ships with built-in help. It is faster and more reliable than a random forum answer.',
      zh: '几乎每个命令都自带帮助文档，比随便找的论坛答案更快也更可靠。',
    },
    commands: [
      { os: ['linux', 'macos'], cmd: 'man chmod' },
      { os: ['any'], cmd: 'git status --help' },
      { os: ['windows'], cmd: 'Get-Help Get-ChildItem' },
    ],
  },
  {
    id: 'whereami',
    groups: ['linux'],
    title: { ru: 'Где я и что здесь', en: 'Where am I and what is here', zh: '我在哪、这里有什么' },
    text: {
      ru: '`pwd` — текущая папка, `ls -la` — все файлы с правами, включая скрытые. Проверяй это перед любой командой, которая меняет файлы.',
      en: '`pwd` prints the current directory, `ls -la` lists all files with permissions, including hidden ones. Check before running anything that changes files.',
      zh: '`pwd` 显示当前目录，`ls -la` 列出所有文件（含隐藏文件）及权限。执行任何修改文件的命令前先确认。',
    },
    commands: [
      { os: ['linux', 'macos'], cmd: 'pwd' },
      { os: ['linux', 'macos'], cmd: 'ls -la' },
    ],
  },
  {
    id: 'rm',
    groups: ['linux', 'mistakes'],
    title: { ru: 'Удаление без корзины', en: 'Deleting has no trash bin', zh: '删除没有回收站' },
    text: {
      ru: 'В терминале `rm` удаляет сразу и навсегда. Флаг `-i` спрашивает подтверждение на каждый файл — привычка, которая спасает.',
      en: 'In the terminal, `rm` deletes immediately and permanently. The `-i` flag asks before each file — a habit that saves you.',
      zh: '在终端中 `rm` 会立即永久删除。`-i` 参数会逐个确认——这个习惯能救命。',
    },
    commands: [{ os: ['linux', 'macos'], cmd: 'rm -ri old-folder/' }],
    warning: {
      ru: 'Никогда не запускай `rm -rf` с путём, в котором не уверен, и особенно через `sudo`.',
      en: 'Never run `rm -rf` on a path you are not sure about — especially with `sudo`.',
      zh: '不要对不确定的路径执行 `rm -rf`，尤其不要配合 `sudo`。',
    },
  },
  {
    id: 'git-status',
    groups: ['git'],
    title: { ru: 'git status — что происходит', en: 'git status — what is going on', zh: 'git status —— 当前状态' },
    text: {
      ru: 'Показывает текущую ветку, изменённые и подготовленные к коммиту файлы. Запускай перед каждым `add`, `commit` и `push`.',
      en: 'Shows the current branch, modified files and staged files. Run it before every `add`, `commit` and `push`.',
      zh: '显示当前分支、已修改和已暂存的文件。每次 `add`、`commit`、`push` 前都运行一下。',
    },
    commands: [
      { os: ['any'], cmd: 'git status' },
      { os: ['any'], cmd: 'git diff' },
    ],
  },
  {
    id: 'git-log',
    groups: ['git'],
    title: { ru: 'История компактно', en: 'Compact history', zh: '简洁的提交历史' },
    text: {
      ru: 'Одна строка на коммит и граф веток — удобно понять, что и где произошло.',
      en: 'One line per commit plus a branch graph — an easy way to see what happened where.',
      zh: '每个提交一行，并显示分支图——快速了解发生了什么。',
    },
    commands: [{ os: ['any'], cmd: 'git log --oneline --graph --all' }],
  },
  {
    id: 'git-restore',
    groups: ['git', 'mistakes'],
    title: { ru: 'Отменить изменения в файле', en: 'Discard changes in a file', zh: '撤销文件的修改' },
    text: {
      ru: 'Возвращает файл к последнему коммиту. Удобно, если эксперимент не удался.',
      en: 'Restores a file to the last commit. Handy when an experiment went wrong.',
      zh: '把文件恢复到最近一次提交的状态，适合实验失败时使用。',
    },
    commands: [{ os: ['any'], cmd: 'git restore file.txt' }],
    warning: {
      ru: 'Незакоммиченные изменения в этом файле будут потеряны безвозвратно.',
      en: 'Uncommitted changes in that file are lost permanently.',
      zh: '该文件中未提交的修改会永久丢失。',
    },
  },
  {
    id: 'http-codes',
    groups: ['http'],
    title: { ru: 'HTTP-коды ответов', en: 'HTTP status codes', zh: 'HTTP 状态码' },
    text: {
      ru: 'Первая цифра — класс: 2xx успех, 3xx перенаправление, 4xx ошибка клиента, 5xx ошибка сервера.',
      en: 'The first digit is the class: 2xx success, 3xx redirect, 4xx client error, 5xx server error.',
      zh: '第一位数字表示类别：2xx 成功，3xx 重定向，4xx 客户端错误，5xx 服务器错误。',
    },
    pairs: [
      { k: '200', v: { ru: 'OK — всё хорошо', en: 'OK — all good', zh: 'OK —— 成功' } },
      { k: '201', v: { ru: 'Created — ресурс создан', en: 'Created — resource created', zh: 'Created —— 已创建' } },
      {
        k: '301',
        v: {
          ru: 'Moved Permanently — постоянный редирект',
          en: 'Moved Permanently — permanent redirect',
          zh: 'Moved Permanently —— 永久重定向',
        },
      },
      {
        k: '304',
        v: { ru: 'Not Modified — бери из кеша', en: 'Not Modified — use your cache', zh: 'Not Modified —— 使用缓存' },
      },
      {
        k: '400',
        v: {
          ru: 'Bad Request — кривой запрос',
          en: 'Bad Request — malformed request',
          zh: 'Bad Request —— 请求格式错误',
        },
      },
      {
        k: '401',
        v: {
          ru: 'Unauthorized — нужна аутентификация',
          en: 'Unauthorized — authentication required',
          zh: 'Unauthorized —— 需要身份认证',
        },
      },
      {
        k: '403',
        v: { ru: 'Forbidden — доступ запрещён', en: 'Forbidden — access denied', zh: 'Forbidden —— 禁止访问' },
      },
      {
        k: '404',
        v: { ru: 'Not Found — нет такого ресурса', en: 'Not Found — no such resource', zh: 'Not Found —— 资源不存在' },
      },
      {
        k: '429',
        v: {
          ru: 'Too Many Requests — слишком часто',
          en: 'Too Many Requests — slow down',
          zh: 'Too Many Requests —— 请求过于频繁',
        },
      },
      {
        k: '500',
        v: {
          ru: 'Internal Server Error — сервер упал',
          en: 'Internal Server Error — the server broke',
          zh: 'Internal Server Error —— 服务器内部错误',
        },
      },
      {
        k: '502',
        v: {
          ru: 'Bad Gateway — проблема за прокси',
          en: 'Bad Gateway — problem behind a proxy',
          zh: 'Bad Gateway —— 上游服务出错',
        },
      },
      {
        k: '503',
        v: {
          ru: 'Service Unavailable — перегрузка или работы',
          en: 'Service Unavailable — overloaded or down for maintenance',
          zh: 'Service Unavailable —— 过载或维护中',
        },
      },
    ],
  },
  {
    id: 'curl',
    groups: ['http', 'network'],
    title: { ru: 'Посмотреть ответ сервера', en: 'Look at a server response', zh: '查看服务器响应' },
    text: {
      ru: '`-I` запрашивает только заголовки, `-v` показывает весь обмен, включая TLS. Отличный способ понять, что реально возвращает сайт.',
      en: '`-I` fetches headers only, `-v` shows the full exchange including TLS. A great way to see what a site really returns.',
      zh: '`-I` 只获取响应头，`-v` 显示包括 TLS 在内的完整交互。是了解网站真实返回内容的好方法。',
    },
    commands: [
      { os: ['any'], cmd: 'curl -I https://example.com' },
      { os: ['any'], cmd: 'curl -v https://example.com' },
    ],
  },
  {
    id: 'mistakes',
    groups: ['mistakes'],
    title: { ru: 'Частые ошибки в терминале', en: 'Common terminal mistakes', zh: '终端常见错误' },
    text: {
      ru: 'То, на чём спотыкается почти каждый новичок.',
      en: 'Things almost every beginner trips over.',
      zh: '几乎每个新手都会踩的坑。',
    },
    points: {
      ru: [
        'Пробелы в путях без кавычек: пиши "My Files/notes.txt".',
        'Копирование команд из интернета вслепую, особенно `curl … | sh`.',
        '`sudo` «на всякий случай» — права администратора только когда понимаешь зачем.',
        'Работа не в той папке — сначала `pwd`.',
        'Пароли и токены в истории команд и в Git.',
      ],
      en: [
        'Spaces in paths without quotes: write "My Files/notes.txt".',
        'Blindly pasting commands from the internet, especially `curl … | sh`.',
        'Using `sudo` "just in case" — admin rights only when you know why.',
        'Working in the wrong directory — run `pwd` first.',
        'Passwords and tokens left in shell history or committed to Git.',
      ],
      zh: [
        '路径含空格却不加引号：应写成 "My Files/notes.txt"。',
        '盲目复制网上的命令，尤其是 `curl … | sh`。',
        '“保险起见”就用 `sudo`——只有清楚原因时才用管理员权限。',
        '在错误的目录下操作——先运行 `pwd`。',
        '把密码和令牌留在命令历史里或提交到 Git。',
      ],
    },
  },
  {
    id: 'terms',
    groups: ['terms'],
    title: { ru: 'Базовые термины', en: 'Core terminology', zh: '基础术语' },
    text: {
      ru: 'Слова, которые постоянно встречаются в статьях и отчётах.',
      en: 'Words you will see constantly in articles and reports.',
      zh: '在文章和报告中经常出现的词。',
    },
    pairs: [
      {
        k: 'CIA',
        v: {
          ru: 'Конфиденциальность, целостность, доступность — три цели защиты',
          en: 'Confidentiality, integrity, availability — the three security goals',
          zh: '机密性、完整性、可用性——安全的三大目标',
        },
      },
      {
        k: 'Vulnerability',
        v: { ru: 'Уязвимость — слабое место в системе', en: 'A weakness in a system', zh: '漏洞——系统中的弱点' },
      },
      {
        k: 'Exploit',
        v: {
          ru: 'Способ воспользоваться уязвимостью',
          en: 'A way to take advantage of a vulnerability',
          zh: '利用漏洞的方法',
        },
      },
      {
        k: 'Threat / Risk',
        v: {
          ru: 'Угроза — кто/что может навредить; риск — вероятность × ущерб',
          en: 'Threat — who or what can cause harm; risk — likelihood × impact',
          zh: '威胁——可能造成危害的人或事；风险——可能性 × 影响',
        },
      },
      {
        k: 'CVE',
        v: {
          ru: 'Публичный идентификатор известной уязвимости',
          en: 'Public identifier of a known vulnerability',
          zh: '已知漏洞的公开编号',
        },
      },
      {
        k: 'Least privilege',
        v: {
          ru: 'Давать ровно столько прав, сколько нужно',
          en: 'Grant only the access that is actually needed',
          zh: '最小权限：只授予真正需要的权限',
        },
      },
      {
        k: 'Attack surface',
        v: {
          ru: 'Всё, через что систему можно атаковать',
          en: 'Everything through which a system can be attacked',
          zh: '攻击面：系统可被攻击的所有入口',
        },
      },
    ],
  },
  {
    id: 'checklist-net',
    groups: ['checklist', 'network'],
    title: { ru: '«Нет интернета» — по шагам', en: '"No internet" — step by step', zh: '“上不了网”——逐步排查' },
    text: {
      ru: 'Иди снизу вверх: от кабеля до DNS. Так проблема находится быстрее, чем перебором.',
      en: 'Work bottom-up, from the cable to DNS. You will find the problem faster than by guessing.',
      zh: '自下而上排查：从网线到 DNS。比乱试更快找到问题。',
    },
    ordered: true,
    points: {
      ru: [
        'Есть ли физическое подключение / Wi-Fi?',
        'Есть ли у интерфейса IP-адрес (не 169.254.x.x)?',
        'Пингуется ли шлюз (роутер)?',
        'Пингуется ли внешний IP, например 1.1.1.1?',
        'Резолвится ли имя через nslookup?',
        'Открывается ли сайт в другом браузере / на другом устройстве?',
      ],
      en: [
        'Is there a physical link / Wi-Fi connection?',
        'Does the interface have an IP address (not 169.254.x.x)?',
        'Can you ping the gateway (router)?',
        'Can you ping an external IP such as 1.1.1.1?',
        'Does the name resolve with nslookup?',
        'Does the site open in another browser or on another device?',
      ],
      zh: [
        '物理连接 / Wi-Fi 是否正常？',
        '网卡是否获得了 IP 地址（不是 169.254.x.x）？',
        '能否 ping 通网关（路由器）？',
        '能否 ping 通外部 IP，例如 1.1.1.1？',
        '用 nslookup 能否解析域名？',
        '换个浏览器或设备能否打开网站？',
      ],
    },
  },
  {
    id: 'roadmap',
    groups: ['roadmap'],
    title: { ru: 'Роадмап новичка', en: 'Beginner roadmap', zh: '新手学习路线' },
    text: {
      ru: 'Порядок, в котором темы опираются друг на друга. Не нужно ждать «идеального» уровня, чтобы двигаться дальше.',
      en: 'An order in which topics build on each other. No need to reach a "perfect" level before moving on.',
      zh: '一个循序渐进的学习顺序。不必等到“完美”掌握才进入下一步。',
    },
    ordered: true,
    points: {
      ru: [
        'Операционные системы и терминал (Linux + Windows).',
        'Сети: TCP/IP, DNS, HTTP.',
        'Программирование: Python и Git.',
        'Как устроены веб-приложения.',
        'Основы безопасности: CIA, хеши, шифрование, аутентификация.',
        'Практика в своей лаборатории и на легальных платформах.',
        'Выбор направления: Blue Team, AppSec, Red Team, форензика.',
      ],
      en: [
        'Operating systems and the terminal (Linux + Windows).',
        'Networking: TCP/IP, DNS, HTTP.',
        'Programming: Python and Git.',
        'How web applications work.',
        'Security fundamentals: CIA, hashing, encryption, authentication.',
        'Practice in your own lab and on legal platforms.',
        'Pick a direction: Blue Team, AppSec, Red Team, forensics.',
      ],
      zh: [
        '操作系统与终端（Linux + Windows）。',
        '网络：TCP/IP、DNS、HTTP。',
        '编程：Python 和 Git。',
        'Web 应用的工作原理。',
        '安全基础：CIA、哈希、加密、身份认证。',
        '在自己的实验环境和合法平台上练习。',
        '选择方向：蓝队、应用安全、红队、取证。',
      ],
    },
  },
  {
    id: 'docs',
    groups: ['docs'],
    title: { ru: 'Официальная документация', en: 'Official documentation', zh: '官方文档' },
    text: {
      ru: 'Первоисточники, к которым стоит возвращаться.',
      en: 'Primary sources worth coming back to.',
      zh: '值得反复查阅的一手资料。',
    },
    links: [
      { label: 'Linux man-pages', url: 'https://man7.org/linux/man-pages/' },
      { label: 'MDN — HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
      { label: 'Pro Git', url: 'https://git-scm.com/book/en/v2' },
      { label: 'Python docs', url: 'https://docs.python.org/3/' },
      { label: 'OWASP Cheat Sheets', url: 'https://cheatsheetseries.owasp.org/' },
      { label: 'Nmap Reference Guide', url: 'https://nmap.org/book/man.html' },
    ],
  },
  {
    id: 'lab',
    groups: ['lab'],
    title: { ru: 'Безопасная домашняя лаборатория', en: 'A safe home lab', zh: '安全的家庭实验室' },
    text: {
      ru: 'Учиться атакам и защите можно только там, где это законно и никому не вредит.',
      en: 'Practise attack and defence only where it is legal and harms no one.',
      zh: '只在合法且不伤害他人的环境中练习攻防。',
    },
    points: {
      ru: [
        'Виртуальные машины (VirtualBox, VMware) в сети host-only или NAT.',
        'Снимки (snapshots) перед экспериментами — откат за секунды.',
        'Намеренно уязвимые приложения (OWASP Juice Shop, DVWA) — только локально, никогда не выставляй их в интернет.',
        'Легальные платформы для практики: TryHackMe, Hack The Box, OverTheWire.',
        'Сканируй и перехватывай трафик только в своей лаборатории.',
      ],
      en: [
        'Virtual machines (VirtualBox, VMware) on a host-only or NAT network.',
        'Take snapshots before experiments — roll back in seconds.',
        'Intentionally vulnerable apps (OWASP Juice Shop, DVWA) — local only, never expose them to the internet.',
        'Legal practice platforms: TryHackMe, Hack The Box, OverTheWire.',
        'Scan and capture traffic only inside your own lab.',
      ],
      zh: [
        '使用虚拟机（VirtualBox、VMware），网络设为仅主机或 NAT 模式。',
        '实验前先拍快照——几秒即可回滚。',
        '故意含漏洞的应用（OWASP Juice Shop、DVWA）只在本地运行，绝不要暴露到公网。',
        '合法的练习平台：TryHackMe、Hack The Box、OverTheWire。',
        '只在自己的实验环境中扫描和抓包。',
      ],
    },
    links: [{ label: 'OWASP Juice Shop', url: 'https://owasp.org/www-project-juice-shop/' }],
  },
];
