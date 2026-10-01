export const consentStorageKey = 'easylux-consent-v1'
export const consentMaxAge = 180 * 24 * 60 * 60 * 1000
export type StoredConsent = { version: 1; maps: boolean; savedAt: number }

/** Invalid or expired browser data must never enable an optional service. */
export function readStoredConsent(storage: Pick<Storage, 'getItem'>, now = Date.now()): StoredConsent | null {
  try {
    const data = JSON.parse(storage.getItem(consentStorageKey) ?? 'null')
    return data?.version === 1 && typeof data.maps === 'boolean' && typeof data.savedAt === 'number' && data.savedAt <= now && now - data.savedAt < consentMaxAge ? data : null
  } catch { return null }
}
