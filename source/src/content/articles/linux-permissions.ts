import type { Article } from '../types';

const LS = `$ ls -l
-rw-r--r-- 1 alice dev  1204 Oct  2 10:15 notes.md
-rwxr-x--- 1 alice dev   880 Oct  2 10:20 backup.sh
drwx------ 2 alice alice 4096 Oct  2 10:21 secrets`;

const CMDS = `# Make a script executable for its owner
chmod u+x backup.sh

# Same idea with numbers: owner rwx, group r-x, others nothing
chmod 750 backup.sh

# A private file that only you can read and write
chmod 600 ~/.ssh/id_ed25519

# Check the result
ls -l backup.sh`;

export const linuxPermissions: Article = {
  slug: 'linux-permissions',
  category: 'linux',
  minutes: 6,
  tags: ['chmod', 'chown', 'rwx', 'permissions', 'права', '权限', 'linux'],
  related: ['git-basics', 'hash-encrypt-encode', 'red-vs-blue'],
  docs: [
    { label: 'chmod(1) — man7.org', url: 'https://man7.org/linux/man-pages/man1/chmod.1.html' },
    { label: 'chown(1) — man7.org', url: 'https://man7.org/linux/man-pages/man1/chown.1.html' },
  ],
  i18n: {
    ru: {
      title: 'Права доступа к файлам в Linux',
      intro:
        'Строка вроде `-rwxr-x---` поначалу выглядит как шифр. На деле это всего три вопроса: кто владелец, какая группа и что можно делать всем остальным.',
      body: [
        { t: 'h', text: 'Три группы по три права' },
        {
          t: 'p',
          text: 'Права задаются для владельца (u), группы (g) и остальных (o). У каждой тройки есть `r` — чтение, `w` — запись, `x` — выполнение. Первый символ строки — тип: `-` файл, `d` папка.',
        },
        {
          t: 'table',
          head: ['Право', 'Для файла', 'Для папки'],
          rows: [
            ['r (4)', 'читать содержимое', 'видеть список файлов'],
            ['w (2)', 'изменять', 'создавать и удалять файлы внутри'],
            ['x (1)', 'запускать', 'заходить в папку (cd)'],
          ],
        },
        { t: 'h', text: 'Числовая запись' },
        {
          t: 'p',
          text: 'Права в тройке складываются: r=4, w=2, x=1. Поэтому `7` = rwx, `5` = r-x, `4` = r--, `0` = ничего. `755` — владелец может всё, остальные — читать и запускать; `644` — типичный обычный файл; `600` — приватный файл.',
        },
        { t: 'h', text: 'chmod и chown' },
        {
          t: 'list',
          items: [
            '`chmod` меняет права: символьно (`u+x`, `go-w`) или числом (`640`).',
            '`chown` меняет владельца и группу: `chown alice:dev file`. Обычно нужен `sudo` — используй его осознанно.',
          ],
        },
        {
          t: 'note',
          text: '`chmod 777` — почти всегда плохая идея: любой пользователь системы сможет изменить файл. Если «не работает», выясни, кому не хватает какого права, и выдай только его.',
        },
      ],
      example: [
        { t: 'p', text: 'Читаем вывод `ls -l`:' },
        { t: 'code', code: LS, lang: 'text' },
        {
          t: 'p',
          text: '`notes.md` (644) могут читать все, менять — только alice. `backup.sh` (750) группа dev может запускать, остальные не видят. В `secrets` (700) может зайти только владелец.',
        },
        { t: 'code', code: CMDS, lang: 'bash' },
      ],
      takeaways: [
        'Права = владелец / группа / остальные × чтение / запись / выполнение.',
        'r=4, w=2, x=1 — так получаются 755, 644, 600.',
        'У папок `x` означает право войти в неё.',
        'Выдавай минимально нужные права, а не 777.',
      ],
    },
    en: {
      title: 'Linux File Permissions',
      intro:
        'A string like `-rwxr-x---` looks like a cipher at first. It is really just three questions: who is the owner, which group, and what can everyone else do.',
      body: [
        { t: 'h', text: 'Three sets of three' },
        {
          t: 'p',
          text: 'Permissions are set for the owner (u), the group (g) and others (o). Each set has `r` — read, `w` — write, `x` — execute. The first character is the type: `-` file, `d` directory.',
        },
        {
          t: 'table',
          head: ['Permission', 'On a file', 'On a directory'],
          rows: [
            ['r (4)', 'read the contents', 'list the files'],
            ['w (2)', 'modify it', 'create and delete files inside'],
            ['x (1)', 'run it', 'enter it (cd)'],
          ],
        },
        { t: 'h', text: 'Numeric notation' },
        {
          t: 'p',
          text: 'Within a set the values add up: r=4, w=2, x=1. So `7` = rwx, `5` = r-x, `4` = r--, `0` = nothing. `755` means the owner can do everything and others can read and run; `644` is a typical regular file; `600` is a private file.',
        },
        { t: 'h', text: 'chmod and chown' },
        {
          t: 'list',
          items: [
            '`chmod` changes permissions, symbolically (`u+x`, `go-w`) or numerically (`640`).',
            '`chown` changes owner and group: `chown alice:dev file`. It usually needs `sudo` — use it deliberately.',
          ],
        },
        {
          t: 'note',
          text: '`chmod 777` is almost always a bad idea: every user on the system can modify the file. If something "doesn\'t work", find out who is missing which permission and grant only that.',
        },
      ],
      example: [
        { t: 'p', text: 'Reading `ls -l` output:' },
        { t: 'code', code: LS, lang: 'text' },
        {
          t: 'p',
          text: "`notes.md` (644) is readable by everyone, writable only by alice. `backup.sh` (750) can be run by the dev group; others can't see it. Only the owner can enter `secrets` (700).",
        },
        { t: 'code', code: CMDS, lang: 'bash' },
      ],
      takeaways: [
        'Permissions = owner / group / others × read / write / execute.',
        'r=4, w=2, x=1 — that is where 755, 644 and 600 come from.',
        'On a directory, `x` means permission to enter it.',
        'Grant the minimum needed — not 777.',
      ],
    },
    zh: {
      title: 'Linux 文件权限',
      intro: '`-rwxr-x---` 这样的字符串乍看像密码。其实它只回答三个问题：属主是谁、属于哪个组、其他人能做什么。',
      body: [
        { t: 'h', text: '三组，每组三种权限' },
        {
          t: 'p',
          text: '权限分别针对属主（u）、属组（g）和其他人（o）。每组包含 `r`——读、`w`——写、`x`——执行。第一个字符表示类型：`-` 是文件，`d` 是目录。',
        },
        {
          t: 'table',
          head: ['权限', '对文件', '对目录'],
          rows: [
            ['r (4)', '读取内容', '列出文件'],
            ['w (2)', '修改', '在目录中创建和删除文件'],
            ['x (1)', '执行', '进入目录（cd）'],
          ],
        },
        { t: 'h', text: '数字表示法' },
        {
          t: 'p',
          text: '同一组内数值相加：r=4、w=2、x=1。所以 `7` = rwx，`5` = r-x，`4` = r--，`0` = 无权限。`755` 表示属主拥有全部权限，其他人可读可执行；`644` 是常见的普通文件；`600` 是私密文件。',
        },
        { t: 'h', text: 'chmod 与 chown' },
        {
          t: 'list',
          items: [
            '`chmod` 修改权限，可用符号（`u+x`、`go-w`）或数字（`640`）。',
            '`chown` 修改属主和属组：`chown alice:dev file`。通常需要 `sudo`——请谨慎使用。',
          ],
        },
        {
          t: 'note',
          text: '`chmod 777` 几乎总是坏主意：系统中任何用户都能修改该文件。遇到“没权限”时，先弄清楚是谁缺了哪项权限，只授予那一项。',
        },
      ],
      example: [
        { t: 'p', text: '解读 `ls -l` 的输出：' },
        { t: 'code', code: LS, lang: 'text' },
        {
          t: 'p',
          text: '`notes.md`（644）所有人可读，只有 alice 可写。`backup.sh`（750）dev 组可以执行，其他人看不到内容。`secrets`（700）只有属主能进入。',
        },
        { t: 'code', code: CMDS, lang: 'bash' },
      ],
      takeaways: [
        '权限 = 属主 / 属组 / 其他人 × 读 / 写 / 执行。',
        'r=4、w=2、x=1——755、644、600 就是这么来的。',
        '对目录而言，`x` 表示可以进入。',
        '只授予最小必要权限，而不是 777。',
      ],
    },
  },
};
