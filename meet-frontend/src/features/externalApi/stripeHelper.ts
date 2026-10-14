import { EXTERNAL_STRIPE_PUBLISHABLE_KEY } from './config'

type StripeElements = {
  create: (
    type: 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc',
    options?: Record<string, unknown>,
  ) => StripeElement
}

type StripeElement = {
  mount: (el: HTMLElement) => void
  destroy: () => void
  on: (event: 'change', handler: (event: { complete?: boolean; error?: { message?: string } }) => void) => void
}

type StripeInstance = {
  elements: () => StripeElements
  createPaymentMethod: (opts: {
    type: 'card'
    card: unknown
    billing_details?: { name?: string }
  }) => Promise<{ paymentMethod?: { id: string }; error?: { message?: string } }>
}

declare global {
  interface Window {
    Stripe?: (key: string) => StripeInstance
  }
}

let stripeLoadPromise: Promise<void> | null = null
let stripeInstance: StripeInstance | null = null
let stripeElements: StripeElements | null = null

const STRIPE_ELEMENT_STYLE = {
  base: {
    fontSize: '16px',
    color: '#334155',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    '::placeholder': {
      color: '#94a3b8',
    },
  },
  invalid: {
    color: '#dc2626',
  },
}

export function loadStripeJs(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.Stripe) return Promise.resolve()
  if (stripeLoadPromise) return stripeLoadPromise

  stripeLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://js.stripe.com/v3/"]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Stripe.js')), { once: true })
      if (window.Stripe) resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Stripe.js'))
    document.head.appendChild(script)
  })
  return stripeLoadPromise
}

function getStripe(): StripeInstance {
  if (!window.Stripe) {
    throw new Error('Stripe is unavailable')
  }
  if (!stripeInstance) {
    stripeInstance = window.Stripe(EXTERNAL_STRIPE_PUBLISHABLE_KEY)
  }
  return stripeInstance
}

function getStripeElements(): StripeElements {
  if (!stripeElements) {
    stripeElements = getStripe().elements()
  }
  return stripeElements
}

export type StripeSplitCardElements = {
  cardNumber: StripeElement
  cardExpiry: StripeElement
  cardCvc: StripeElement
  destroy: () => void
}

export function createStripeSplitCardElements(mounts: {
  number: HTMLElement
  expiry: HTMLElement
  cvc: HTMLElement
}): StripeSplitCardElements {
  const elements = getStripeElements()
  const cardNumber = elements.create('cardNumber', { style: STRIPE_ELEMENT_STYLE })
  const cardExpiry = elements.create('cardExpiry', { style: STRIPE_ELEMENT_STYLE })
  const cardCvc = elements.create('cardCvc', { style: STRIPE_ELEMENT_STYLE })
  cardNumber.mount(mounts.number)
  cardExpiry.mount(mounts.expiry)
  cardCvc.mount(mounts.cvc)
  return {
    cardNumber,
    cardExpiry,
    cardCvc,
    destroy: () => {
      cardNumber.destroy()
      cardExpiry.destroy()
      cardCvc.destroy()
    },
  }
}

export function createStripeCardElement(container: HTMLElement): StripeElement {
  const elements = getStripeElements()
  const card = elements.create('card', { style: STRIPE_ELEMENT_STYLE })
  card.mount(container)
  return card
}

export async function createStripePaymentMethod(cardElement: unknown, billingName?: string): Promise<string> {
  await loadStripeJs()
  const stripe = getStripe()
  const result = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: billingName ? { name: billingName } : undefined,
  })
  if (result.error || !result.paymentMethod?.id) {
    throw new Error(result.error?.message ?? 'Could not create payment method')
  }
  return result.paymentMethod.id
}

export async function mountStripeSplitCardElements(
  mounts: {
    number: HTMLElement
    expiry: HTMLElement
    cvc: HTMLElement
  },
  onValidityChange: (valid: boolean) => void,
): Promise<StripeSplitCardElements> {
  await loadStripeJs()
  const split = createStripeSplitCardElements(mounts)
  const validity = { number: false, expiry: false, cvc: false }
  const update = () => onValidityChange(validity.number && validity.expiry && validity.cvc)

  split.cardNumber.on('change', (event) => {
    validity.number = Boolean(event.complete && !event.error)
    update()
  })
  split.cardExpiry.on('change', (event) => {
    validity.expiry = Boolean(event.complete && !event.error)
    update()
  })
  split.cardCvc.on('change', (event) => {
    validity.cvc = Boolean(event.complete && !event.error)
    update()
  })

  return split
}

export function resetStripeElements(): void {
  stripeElements = null
}
