export function getKoreanVocative(name) {
  const lastCharacter = [...name].at(-1)
  const code = lastCharacter?.charCodeAt(0)
  const isHangulSyllable = code >= 0xac00 && code <= 0xd7a3
  const hasBatchim = isHangulSyllable && (code - 0xac00) % 28 !== 0

  return `${name}${hasBatchim ? '아' : '야'}`
}
