export type QRCodeType = 'url' | 'text' | 'wifi' | 'contact' | 'email' | 'phone';

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'None';
  hidden: boolean;
}

export interface ContactData {
  name: string;
  phone: string;
  email: string;
  org: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export function formatWiFiString(config: WiFiConfig): string {
  const parts: string[] = [];
  parts.push(`WIFI:S:${config.ssid}`);
  parts.push(`T:${config.encryption === 'None' ? 'nopass' : config.encryption}`);
  if (config.encryption !== 'None' && config.password) {
    parts.push(`P:${config.password}`);
  }
  if (config.hidden) {
    parts.push('H:true');
  }
  parts.push(';');
  return parts.join(';');
}

export function generateVCard(contact: ContactData): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];
  if (contact.name) lines.push(`FN:${contact.name}`);
  if (contact.phone) lines.push(`TEL:${contact.phone}`);
  if (contact.email) lines.push(`EMAIL:${contact.email}`);
  if (contact.org) lines.push(`ORG:${contact.org}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

export function formatQRData(type: QRCodeType, data: Record<string, string>): string {
  switch (type) {
    case 'url':
      return data.url || '';
    case 'text':
      return data.text || '';
    case 'wifi':
      return formatWiFiString({
        ssid: data.ssid || '',
        password: data.password || '',
        encryption: (data.encryption as WiFiConfig['encryption']) || 'WPA',
        hidden: data.hidden === 'true',
      });
    case 'contact':
      return generateVCard({
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        org: data.org || '',
      });
    case 'email': {
      const params = new URLSearchParams();
      if (data.subject) params.set('subject', data.subject);
      if (data.body) params.set('body', data.body);
      const qs = params.toString();
      return `mailto:${data.to || ''}${qs ? '?' + qs : ''}`;
    }
    case 'phone':
      return `tel:${data.number || ''}`;
  }
}

export function parseQRContent(text: string): { type: string; data?: Record<string, string> } {
  if (text.startsWith('http://') || text.startsWith('https://')) {
    return { type: 'url' };
  }
  if (text.startsWith('mailto:')) {
    return { type: 'email' };
  }
  if (text.startsWith('tel:')) {
    return { type: 'phone', data: { number: text.replace('tel:', '') } };
  }
  if (text.startsWith('WIFI:')) {
    return { type: 'wifi' };
  }
  if (text.startsWith('BEGIN:VCARD')) {
    return { type: 'vcard' };
  }
  return { type: 'text' };
}
