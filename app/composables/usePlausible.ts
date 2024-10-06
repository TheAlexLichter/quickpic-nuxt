export function usePlausible() {
  const domain = useRuntimeConfig().public.plausibleDomain
  const { proxy } = useScriptPlausibleAnalytics({
    scriptInput: {
      src: '/v/js/script.js',
      'data-api': '/v/api/event',
      'data-domain': domain
    }
  })
  return {
    proxy,
    plausible: (name: string) => proxy.plausible('event', { name })
  }
}