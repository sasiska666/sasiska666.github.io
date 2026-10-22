import type { Article } from '../types';
import { tcpIp } from './tcp-ip';
import { nmapBasics } from './nmap-basics';
import { wiresharkFirstPcap } from './wireshark-first-pcap';
import { linuxPermissions } from './linux-permissions';
import { hashEncryptEncode } from './hash-encrypt-encode';
import { redVsBlue } from './red-vs-blue';
import { httpExplained } from './http-explained';
import { gitBasics } from './git-basics';

/** Library order. To add an article: create a file next to these and append it here. */
export const ARTICLES: Article[] = [
  tcpIp,
  nmapBasics,
  wiresharkFirstPcap,
  linuxPermissions,
  hashEncryptEncode,
  redVsBlue,
  httpExplained,
  gitBasics,
];

export const ARTICLE_MAP: Record<string, Article> = Object.fromEntries(ARTICLES.map((a) => [a.slug, a]));
