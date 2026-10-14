export function getAppOrigin() {
  return window.location.origin
}

export function getLegacyLocalOrigin() {
  return 'http://localhost/avnikreact'
}

export function assetUrl(path = '', base = getFileManagerBase()) {
  if (path == null || path === '') {
    return String(base).replace(/\/+$/, '')
  }

  if (/^https?:\/\//i.test(String(path))) {
    return String(path)
  }

  const normalizedBase = String(base).replace(/\/+$/, '')
  const normalizedPath = String(path).replace(/^\/+/, '')

  return `${normalizedBase}/${normalizedPath}`
}

export function getFileManagerBase() {
  if (window.location.origin === 'http://localhost:8000') {
    return getLegacyLocalOrigin()
  }

  return getAppOrigin()
}

export function getApiBase() {
  return `${getAppOrigin()}/`
}
