import type { Article } from '../types';

const DEMO = `# Encoding: anyone can reverse it
echo -n "hello" | base64          # aGVsbG8=
echo "aGVsbG8=" | base64 -d       # hello

# Hashing: one-way fingerprint, same input -> same output
echo -n "hello" | sha256sum
# 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  -

# Encryption: reversible only with the key (OpenSSL, AES-256)
openssl enc -aes-256-cbc -pbkdf2 -salt -in notes.txt -out notes.enc
openssl enc -d -aes-256-cbc -pbkdf2 -in notes.enc -out notes.txt`;

export const hashEncryptEncode: Article = {
  slug: 'hash-encrypt-encode',
  category: 'fundamentals',
  minutes: 6,
  tags: ['hash', 'sha256', 'base64', 'aes', 'crypto', 'хеш', 'шифрование', '哈希', '加密', '编码'],
  related: ['linux-permissions', 'http-explained', 'red-vs-blue'],
  docs: [
    {
      label: 'OWASP Password Storage Cheat Sheet',
      url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
    },
    { label: 'OpenSSL enc', url: 'https://docs.openssl.org/master/man1/openssl-enc/' },
  ],
  i18n: {
    ru: {
      title: 'Хеширование, шифрование и кодирование',
      intro:
        'Три слова, которые новички постоянно путают. Разница простая: можно ли получить исходные данные обратно — и если да, то кому.',
      body: [
        {
          t: 'table',
          head: ['', 'Обратимо?', 'Нужен ключ?', 'Зачем'],
          rows: [
            ['Кодирование', 'да, всем', 'нет', 'передать данные в нужном формате'],
            ['Хеширование', 'нет', 'нет', 'проверить целостность, хранить пароли'],
            ['Шифрование', 'да, с ключом', 'да', 'скрыть данные от посторонних'],
          ],
        },
        { t: 'h', text: 'Кодирование — это не защита' },
        {
          t: 'p',
          text: 'Base64, URL-encoding, hex просто меняют представление данных. Декодировать их может кто угодно. Если в коде «спрятан» пароль в Base64 — он не спрятан.',
        },
        { t: 'h', text: 'Хеширование — отпечаток' },
        {
          t: 'p',
          text: 'Хеш-функция (SHA-256 и т. д.) превращает любые данные в отпечаток фиксированной длины. Одинаковый вход даёт одинаковый хеш, а малейшее изменение — совершенно другой. Восстановить исходник из хеша нельзя.',
        },
        {
          t: 'note',
          text: 'Пароли хранят не просто SHA-256, а специальными медленными алгоритмами с солью: Argon2id, scrypt или bcrypt. Быстрый хеш слишком легко перебрать.',
        },
        { t: 'h', text: 'Шифрование — замок с ключом' },
        {
          t: 'list',
          items: [
            'Симметричное (AES): один ключ шифрует и расшифровывает.',
            'Асимметричное (RSA, ECC): открытый ключ шифрует, закрытый расшифровывает. На этом построены HTTPS и SSH.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'Все три операции в терминале Linux:' },
        { t: 'code', code: DEMO, lang: 'bash' },
        {
          t: 'p',
          text: 'Попробуй поменять одну букву в `hello` — хеш изменится полностью. Это называется лавинным эффектом.',
        },
      ],
      takeaways: [
        'Кодирование меняет формат, а не защищает.',
        'Хеш — односторонний отпечаток для проверки целостности.',
        'Пароли — только через Argon2id, scrypt или bcrypt.',
        'Шифрование обратимо, но только с ключом.',
      ],
    },
    en: {
      title: 'Hashing vs Encryption vs Encoding',
      intro:
        'Three words beginners mix up constantly. The difference is simple: can you get the original data back — and if so, who can?',
      body: [
        {
          t: 'table',
          head: ['', 'Reversible?', 'Needs a key?', 'Used for'],
          rows: [
            ['Encoding', 'yes, by anyone', 'no', 'moving data in the right format'],
            ['Hashing', 'no', 'no', 'integrity checks, password storage'],
            ['Encryption', 'yes, with the key', 'yes', 'hiding data from others'],
          ],
        },
        { t: 'h', text: 'Encoding is not protection' },
        {
          t: 'p',
          text: 'Base64, URL encoding and hex only change how data is represented. Anyone can decode them. A password "hidden" in Base64 inside code is not hidden.',
        },
        { t: 'h', text: 'Hashing is a fingerprint' },
        {
          t: 'p',
          text: 'A hash function (SHA-256 and others) turns any input into a fixed-length fingerprint. The same input always gives the same hash, and the slightest change gives a completely different one. You cannot recover the input from the hash.',
        },
        {
          t: 'note',
          text: 'Passwords are not stored as plain SHA-256 but with dedicated slow, salted algorithms: Argon2id, scrypt or bcrypt. A fast hash is too easy to brute-force.',
        },
        { t: 'h', text: 'Encryption is a lock and key' },
        {
          t: 'list',
          items: [
            'Symmetric (AES): one key both encrypts and decrypts.',
            'Asymmetric (RSA, ECC): the public key encrypts, the private key decrypts. HTTPS and SSH are built on this.',
          ],
        },
      ],
      example: [
        { t: 'p', text: 'All three operations in a Linux terminal:' },
        { t: 'code', code: DEMO, lang: 'bash' },
        {
          t: 'p',
          text: 'Change a single letter in `hello` and the hash changes completely. This is called the avalanche effect.',
        },
      ],
      takeaways: [
        'Encoding changes the format; it does not protect anything.',
        'A hash is a one-way fingerprint for integrity checks.',
        'Passwords: Argon2id, scrypt or bcrypt only.',
        'Encryption is reversible — but only with the key.',
      ],
    },
    zh: {
      title: '哈希、加密与编码的区别',
      intro: '新手经常混淆这三个词。区别其实很简单：能不能还原出原始数据——如果能，谁能还原？',
      body: [
        {
          t: 'table',
          head: ['', '可逆？', '需要密钥？', '用途'],
          rows: [
            ['编码', '可以，任何人', '不需要', '以合适的格式传输数据'],
            ['哈希', '不可逆', '不需要', '校验完整性、存储密码'],
            ['加密', '可以，需持有密钥', '需要', '防止他人读取数据'],
          ],
        },
        { t: 'h', text: '编码不等于保护' },
        {
          t: 'p',
          text: 'Base64、URL 编码、十六进制只是改变数据的表示形式，任何人都能解码。代码里用 Base64“藏起来”的密码，其实并没有被藏住。',
        },
        { t: 'h', text: '哈希是指纹' },
        {
          t: 'p',
          text: '哈希函数（如 SHA-256）把任意输入变成固定长度的“指纹”。相同输入永远得到相同哈希，输入稍有改动，哈希就完全不同。无法从哈希还原出原始输入。',
        },
        {
          t: 'note',
          text: '密码不能只用 SHA-256 存储，而应使用专门的慢速加盐算法：Argon2id、scrypt 或 bcrypt。快速哈希太容易被暴力破解。',
        },
        { t: 'h', text: '加密是锁和钥匙' },
        {
          t: 'list',
          items: [
            '对称加密（AES）：同一个密钥负责加密和解密。',
            '非对称加密（RSA、ECC）：公钥加密，私钥解密。HTTPS 和 SSH 都建立在此之上。',
          ],
        },
      ],
      example: [
        { t: 'p', text: '在 Linux 终端中体验这三种操作：' },
        { t: 'code', code: DEMO, lang: 'bash' },
        { t: 'p', text: '把 `hello` 改动一个字母，哈希值就会完全改变。这被称为雪崩效应。' },
      ],
      takeaways: [
        '编码只改变格式，不提供任何保护。',
        '哈希是用于校验完整性的单向指纹。',
        '存储密码只用 Argon2id、scrypt 或 bcrypt。',
        '加密可逆——但必须持有密钥。',
      ],
    },
  },
};
