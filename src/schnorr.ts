import { schnorr } from '@noble/curves/secp256k1'

const fromHex = (hexString: string): Uint8Array => {
  const aux = hexString.match(/.{1,2}/g)
  if (aux) return new Uint8Array(aux.map((byte) => parseInt(byte, 16)))
  throw new Error('Error decoding hex string')
}

const toHex = (arr: Uint8Array): string =>
  Array.from(arr, (i) => i.toString(16).padStart(2, '0')).join('')

export const getPubKey = (privKey: string) =>
  toHex(schnorr.getPublicKey(fromHex(privKey)))

export const sign = (data: any, privKey: string): string => {
  const prv = fromHex(privKey)
  const pub = schnorr.getPublicKey(prv)
  const msg = new TextEncoder().encode(JSON.stringify(data))
  const sig = schnorr.sign(msg, prv)
  if (schnorr.verify(sig, msg, pub)) return toHex(sig)
  throw new Error('Error signing')
}
