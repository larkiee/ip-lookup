export function ipToInt(ip: string): number {
    const octets = ip.split('.').map((p) => Number.parseInt(p));
    return octets[0] * 256 ** 3 + octets[1] * 256 ** 2 + octets[2] * 256 + octets[3];
  }