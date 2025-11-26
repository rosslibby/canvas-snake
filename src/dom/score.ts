import { getDom, getPlayer } from '../state'

export function renderScore() {
  const { container } = getDom()
  const { score } = getPlayer()
  const scoreEl = document.createElement('div')
  scoreEl.classList.add('score')
  const label = document.createElement('h2')
  label.textContent = `Score: ${score}`
  scoreEl.appendChild(label)
  container.appendChild(scoreEl)
  setTimeout(() => {
    scoreEl.remove()
  }, 2000)
}
