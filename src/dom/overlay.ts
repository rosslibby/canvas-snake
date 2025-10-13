import { ActionButton } from '../types'
import { dom, overlay, getOverlay, getDom } from '../state'

export function createOverlay() {
  const { container } = dom.state()
  const overlayEl = document.createElement('div')
  overlayEl.classList.add('overlay')

  const actionsEl = document.createElement('div')
  actionsEl.classList.add('actions')

  makeActionButtons()
    .forEach((action) => actionsEl.appendChild(action))

  overlayEl.appendChild(overlayTitle())
  overlayEl.appendChild(actionsEl)

  container.appendChild(overlayEl)
  dom.update({ overlay: overlayEl })
}

export const toggleOverlay = () => {
  const { overlay } = getDom();
  const { update } = getOverlay();

  update(({ visible }: {
    visible: boolean
  }) => ({ visible: !visible }))
  console.log('Toggling overlay to visible:', getOverlay().visible)
  overlay.classList.toggle('overlay--hidden', !getOverlay().visible)
}

function overlayTitle(): HTMLDivElement {
  const { title, subtitle } = overlay.state()
  const container = document.createElement('div')
  container.classList.add('title-container')

  const titleEl = document.createElement('h1')
  titleEl.classList.add('title')
  titleEl.textContent = title
  container.appendChild(titleEl)

  if (subtitle) {
    const subtitleEl = document.createElement('h4')
    subtitleEl.classList.add('subtitle')
    subtitleEl.textContent = subtitle
    container.appendChild(subtitle)
  }
  return container
}

function makeActionButtons(): HTMLButtonElement[] {
  const { actions } = overlay.state() as { actions: ActionButton[] }

  return actions.map(({ label, action, styles, className }) => {
    const el = document.createElement('button')
    el.textContent = label
    el.addEventListener('click', action)
    el.classList.add('action-button')

    if (className) {
      el.className = className
    }

    if (styles) {
      Object.entries(styles)
        .forEach(([key, value]: [string, CSSStyleValue]) => {
          el.style[key as any] = value as any
        })
    }
    return el
  })
}
