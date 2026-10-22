import type { Article } from '../types';

const RAW = `GET /docs/ HTTP/1.1
Host: example.com
User-Agent: curl/8.5.0
Accept: */*

HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
Cache-Control: max-age=3600

<!doctype html>...`;

const CURL = `# Headers only
curl -I https://example.com

# Full exchange: TLS, request headers (>) and response headers (<)
curl -v https://example.com -o /dev/null

# Send JSON with POST to a local practice API
curl -X POST http://127.0.0.1:8000/api/notes \\
  -H "Content-Type: application/json" \\
  -d '{"title":"hello"}'`;

export const httpExplained: Article = {
  slug: 'http-explained',
  category: 'websec',
  minutes: 7,
  tags: ['http', 'https', 'request', 'response', 'headers', 'cookie', 'curl', 'запрос', '请求', '响应'],
  related: ['tcp-ip', 'wireshark-first-pcap', 'hash-encrypt-encode'],
  docs: [
    { label: 'MDN — HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
    { label: 'MDN — Set-Cookie', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie' },
    { label: 'curl manual', url: 'https://curl.se/docs/manpage.html' },
  ],
  i18n: {
    ru: {
      title: 'HTTP-запросы и ответы простыми словами',
      intro:
        'Почти весь веб — это диалог «запрос → ответ». Если понимать, из чего он состоит, проще и отлаживать сайты, и находить в них проблемы безопасности.',
      body: [
        { t: 'h', text: 'Из чего состоит запрос' },
        {
          t: 'list',
          items: [
            'Стартовая строка: метод, путь, версия — `GET /docs/ HTTP/1.1`.',
            'Заголовки: `Host`, `User-Agent`, `Cookie`, `Authorization`…',
            'Тело (не всегда): данные формы или JSON, обычно в POST/PUT.',
          ],
        },
        { t: 'h', text: 'Методы' },
        {
          t: 'table',
          head: ['Метод', 'Смысл'],
          rows: [
            ['GET', 'получить ресурс, без тела'],
            ['POST', 'отправить данные, создать что-то'],
            ['PUT / PATCH', 'заменить / частично изменить'],
            ['DELETE', 'удалить'],
          ],
        },
        { t: 'h', text: 'Из чего состоит ответ' },
        {
          t: 'p',
          text: 'Код состояния (`200 OK`, `404 Not Found`…), заголовки (`Content-Type`, `Set-Cookie`, `Cache-Control`) и тело — HTML, JSON, картинка.',
        },
        { t: 'h', text: 'Что важно для безопасности' },
        {
          t: 'list',
          items: [
            'HTTP не хранит состояние — «вход в аккаунт» держится на cookie или токене. Кто украл cookie сессии, тот и вошёл.',
            'Флаги cookie: `HttpOnly` (не доступна из JavaScript), `Secure` (только по HTTPS), `SameSite` (защита от межсайтовых запросов).',
            'Всё, что приходит от клиента, — заголовки, параметры, тело — может быть подделано. Проверять нужно на сервере.',
            'HTTPS шифрует весь обмен; по обычному HTTP пароль видно в трафике.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'Так выглядит обмен «как есть» (запрос, пустая строка, ответ):' },
        { t: 'code', code: RAW, lang: 'http' },
        { t: 'p', text: 'Посмотреть его самому можно через curl:' },
        { t: 'code', code: CURL, lang: 'bash' },
      ],
      takeaways: [
        'Запрос = метод + путь + заголовки + (тело). Ответ = код + заголовки + тело.',
        'Сессия живёт в cookie или токене — их нужно защищать.',
        'HttpOnly, Secure, SameSite — базовая гигиена cookie.',
        'Никогда не доверяй данным от клиента без проверки на сервере.',
      ],
    },
    en: {
      title: 'HTTP Requests and Responses Explained',
      intro:
        'Almost the whole web is a "request → response" conversation. Once you know what it is made of, debugging sites and spotting security problems both get easier.',
      body: [
        { t: 'h', text: 'Anatomy of a request' },
        {
          t: 'list',
          items: [
            'Request line: method, path, version — `GET /docs/ HTTP/1.1`.',
            'Headers: `Host`, `User-Agent`, `Cookie`, `Authorization`…',
            'Body (optional): form data or JSON, usually with POST/PUT.',
          ],
        },
        { t: 'h', text: 'Methods' },
        {
          t: 'table',
          head: ['Method', 'Meaning'],
          rows: [
            ['GET', 'fetch a resource, no body'],
            ['POST', 'send data, create something'],
            ['PUT / PATCH', 'replace / partially update'],
            ['DELETE', 'remove'],
          ],
        },
        { t: 'h', text: 'Anatomy of a response' },
        {
          t: 'p',
          text: 'A status code (`200 OK`, `404 Not Found`…), headers (`Content-Type`, `Set-Cookie`, `Cache-Control`) and a body — HTML, JSON, an image.',
        },
        { t: 'h', text: 'What matters for security' },
        {
          t: 'list',
          items: [
            'HTTP is stateless — being "logged in" relies on a cookie or token. Whoever steals the session cookie is logged in.',
            'Cookie flags: `HttpOnly` (not readable from JavaScript), `Secure` (HTTPS only), `SameSite` (cross-site request protection).',
            'Everything coming from the client — headers, parameters, body — can be forged. Validate on the server.',
            'HTTPS encrypts the whole exchange; over plain HTTP a password is visible in the traffic.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'This is the raw exchange (request, blank line, response):' },
        { t: 'code', code: RAW, lang: 'http' },
        { t: 'p', text: 'See it yourself with curl:' },
        { t: 'code', code: CURL, lang: 'bash' },
      ],
      takeaways: [
        'Request = method + path + headers + (body). Response = status + headers + body.',
        'The session lives in a cookie or token — protect it.',
        'HttpOnly, Secure, SameSite are basic cookie hygiene.',
        'Never trust client data without server-side validation.',
      ],
    },
    zh: {
      title: '图解 HTTP 请求与响应',
      intro: '几乎整个 Web 都是“请求 → 响应”的对话。弄懂它的组成，调试网站和发现安全问题都会容易得多。',
      body: [
        { t: 'h', text: '请求的组成' },
        {
          t: 'list',
          items: [
            '请求行：方法、路径、版本——`GET /docs/ HTTP/1.1`。',
            '请求头：`Host`、`User-Agent`、`Cookie`、`Authorization`……',
            '请求体（可选）：表单数据或 JSON，通常用于 POST/PUT。',
          ],
        },
        { t: 'h', text: '请求方法' },
        {
          t: 'table',
          head: ['方法', '含义'],
          rows: [
            ['GET', '获取资源，没有请求体'],
            ['POST', '提交数据、创建资源'],
            ['PUT / PATCH', '整体替换 / 部分更新'],
            ['DELETE', '删除'],
          ],
        },
        { t: 'h', text: '响应的组成' },
        {
          t: 'p',
          text: '状态码（`200 OK`、`404 Not Found`……）、响应头（`Content-Type`、`Set-Cookie`、`Cache-Control`）和响应体——HTML、JSON、图片等。',
        },
        { t: 'h', text: '与安全相关的要点' },
        {
          t: 'list',
          items: [
            'HTTP 本身是无状态的——“登录状态”依赖 Cookie 或令牌。谁偷到会话 Cookie，谁就能登录。',
            'Cookie 属性：`HttpOnly`（JavaScript 无法读取）、`Secure`（仅通过 HTTPS 传输）、`SameSite`（防御跨站请求）。',
            '来自客户端的一切——请求头、参数、请求体——都可以被伪造，必须在服务器端校验。',
            'HTTPS 会加密整个通信过程；使用明文 HTTP 时，密码在流量中清晰可见。',
          ],
        },
      ],
      example: [
        { t: 'p', text: '原始的通信内容（请求、空行、响应）：' },
        { t: 'code', code: RAW, lang: 'http' },
        { t: 'p', text: '用 curl 亲自查看：' },
        { t: 'code', code: CURL, lang: 'bash' },
      ],
      takeaways: [
        '请求 = 方法 + 路径 + 请求头 +（请求体）；响应 = 状态码 + 响应头 + 响应体。',
        '会话保存在 Cookie 或令牌中——务必保护好。',
        'HttpOnly、Secure、SameSite 是 Cookie 的基本安全设置。',
        '未经服务器端校验，永远不要信任客户端数据。',
      ],
    },
  },
};
