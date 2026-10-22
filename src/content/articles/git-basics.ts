import type { Article } from '../types';

const FLOW = `# One-time setup
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Start a project
git init my-tool
cd my-tool

# The everyday loop
git status
git add main.py
git commit -m "Add port parser"

# Try an idea safely on a branch
git switch -c feature/colors
# ...edit, add, commit...
git switch main
git merge feature/colors

# Publish (after creating an empty repo on GitHub)
git remote add origin https://github.com/<user>/my-tool.git
git push -u origin main`;

const IGNORE = `# .gitignore — never commit secrets or junk
.env
*.key
__pycache__/
node_modules/
dist/`;

export const gitBasics: Article = {
  slug: 'git-basics',
  category: 'programming',
  minutes: 7,
  tags: ['git', 'github', 'commit', 'branch', 'version control', 'коммит', 'ветка', '提交', '分支'],
  related: ['linux-permissions', 'http-explained', 'tcp-ip'],
  docs: [
    { label: 'Pro Git (free book)', url: 'https://git-scm.com/book/en/v2' },
    { label: 'Git reference', url: 'https://git-scm.com/docs' },
  ],
  i18n: {
    ru: {
      title: 'Основы Git для разработчика',
      intro:
        'Git сохраняет историю проекта: можно вернуться к любой версии, пробовать идеи в отдельных ветках и работать вместе. Вот минимум, с которого стоит начать.',
      body: [
        { t: 'h', text: 'Три зоны' },
        {
          t: 'table',
          head: ['Зона', 'Что это'],
          rows: [
            ['Рабочая папка', 'файлы, которые ты сейчас редактируешь'],
            ['Индекс (staging)', 'изменения, отобранные для следующего коммита (`git add`)'],
            ['Репозиторий', 'сохранённые коммиты — история проекта (`git commit`)'],
          ],
        },
        { t: 'h', text: 'Коммит' },
        {
          t: 'p',
          text: 'Коммит — снимок отобранных изменений с сообщением. Хорошее сообщение отвечает на вопрос «что изменилось»: `Add port parser`, а не `fix` или `update`. Маленькие частые коммиты проще понять и откатить.',
        },
        { t: 'h', text: 'Ветки' },
        {
          t: 'p',
          text: 'Ветка — независимая линия разработки. Создай ветку под задачу, работай в ней, а когда всё готово — слей с основной (`merge`). Основная ветка остаётся рабочей.',
        },
        { t: 'h', text: 'Безопасность в Git' },
        {
          t: 'note',
          text: 'Никогда не коммить пароли, токены и ключи. Даже если удалить их следующим коммитом, они останутся в истории. Если секрет попал в публичный репозиторий — считай его скомпрометированным и сразу замени.',
        },
      ],
      example: [
        { t: 'p', text: 'Полный цикл от пустой папки до GitHub:' },
        { t: 'code', code: FLOW, lang: 'bash' },
        { t: 'p', text: 'И файл, который стоит создать в каждом проекте:' },
        { t: 'code', code: IGNORE, lang: 'text' },
      ],
      takeaways: [
        'Рабочая папка → `add` → индекс → `commit` → история.',
        '`git status` перед каждым действием.',
        'Новая задача — новая ветка.',
        'Секреты — в `.gitignore` и переменные окружения, не в историю.',
      ],
    },
    en: {
      title: 'Git Basics for Developers',
      intro:
        "Git keeps your project's history: you can go back to any version, try ideas on separate branches and collaborate. Here is the minimum worth starting with.",
      body: [
        { t: 'h', text: 'Three areas' },
        {
          t: 'table',
          head: ['Area', 'What it is'],
          rows: [
            ['Working tree', 'the files you are editing right now'],
            ['Index (staging)', 'changes selected for the next commit (`git add`)'],
            ['Repository', 'saved commits — the project history (`git commit`)'],
          ],
        },
        { t: 'h', text: 'Commits' },
        {
          t: 'p',
          text: 'A commit is a snapshot of the staged changes plus a message. A good message says what changed: `Add port parser`, not `fix` or `update`. Small, frequent commits are easier to understand and to revert.',
        },
        { t: 'h', text: 'Branches' },
        {
          t: 'p',
          text: 'A branch is an independent line of development. Create one per task, work there, and `merge` it into the main branch when it is ready. Main stays working the whole time.',
        },
        { t: 'h', text: 'Security in Git' },
        {
          t: 'note',
          text: 'Never commit passwords, tokens or keys. Even if you delete them in the next commit, they stay in the history. If a secret reaches a public repository, treat it as compromised and rotate it immediately.',
        },
      ],
      example: [
        { t: 'p', text: 'The full loop from an empty folder to GitHub:' },
        { t: 'code', code: FLOW, lang: 'bash' },
        { t: 'p', text: 'And a file worth creating in every project:' },
        { t: 'code', code: IGNORE, lang: 'text' },
      ],
      takeaways: [
        'Working tree → `add` → index → `commit` → history.',
        'Run `git status` before every action.',
        'New task, new branch.',
        'Secrets go in `.gitignore` and environment variables, never in history.',
      ],
    },
    zh: {
      title: '开发者必备的 Git 基础',
      intro:
        'Git 会保存项目的历史：可以回到任意版本，在独立分支上尝试新想法，也方便多人协作。以下是值得先掌握的最小知识集。',
      body: [
        { t: 'h', text: '三个区域' },
        {
          t: 'table',
          head: ['区域', '说明'],
          rows: [
            ['工作区', '你正在编辑的文件'],
            ['暂存区（index）', '选中准备提交的修改（`git add`）'],
            ['仓库', '已保存的提交——项目历史（`git commit`）'],
          ],
        },
        { t: 'h', text: '提交' },
        {
          t: 'p',
          text: '提交是暂存修改的快照，附带一条说明。好的提交信息要写清楚改了什么：`Add port parser`，而不是 `fix` 或 `update`。小而频繁的提交更易理解，也更易回滚。',
        },
        { t: 'h', text: '分支' },
        {
          t: 'p',
          text: '分支是一条独立的开发线。每个任务新建一个分支，在上面开发，完成后再 `merge` 回主分支。主分支始终保持可用。',
        },
        { t: 'h', text: 'Git 中的安全' },
        {
          t: 'note',
          text: '永远不要提交密码、令牌或密钥。即使在下一次提交中删除，它们仍会保留在历史中。一旦密钥进入公开仓库，就应视为已泄露并立即更换。',
        },
      ],
      example: [
        { t: 'p', text: '从空文件夹到 GitHub 的完整流程：' },
        { t: 'code', code: FLOW, lang: 'bash' },
        { t: 'p', text: '以及每个项目都应创建的文件：' },
        { t: 'code', code: IGNORE, lang: 'text' },
      ],
      takeaways: [
        '工作区 → `add` → 暂存区 → `commit` → 历史。',
        '每次操作前先运行 `git status`。',
        '新任务，新分支。',
        '密钥放进 `.gitignore` 和环境变量，绝不进入历史记录。',
      ],
    },
  },
};
