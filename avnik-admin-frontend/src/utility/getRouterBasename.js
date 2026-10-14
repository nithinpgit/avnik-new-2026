// Vite sets BASE_URL from the `base` option (e.g. "/admin/").
export const getRouterBasename = () => {
  const base = import.meta.env.BASE_URL || '/'

  if (base === '/') {
    return ''
  }

  return base.endsWith('/') ? base.slice(0, -1) : base
}
