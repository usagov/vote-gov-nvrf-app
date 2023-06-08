import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div
        class="usa-step-indicator usa-step-indicator--counters-sm"
        aria-label="progress"
      >
        <ol class="usa-step-indicator__segments">
          <li
            class="usa-step-indicator__segment usa-step-indicator__segment--complete"
          >
            <span class="usa-step-indicator__segment-label"
              >Check eligibility <span class="usa-sr-only">completed</span></span
            >
          </li>
          <li
            class="usa-step-indicator__segment usa-step-indicator__segment--complete"
          >
            <span class="usa-step-indicator__segment-label"
              >Fill out NVRF <span class="usa-sr-only">completed</span></span
            >
          </li>
          <li
            class="usa-step-indicator__segment usa-step-indicator__segment--current"
            aria-current="true"
          >
            <span class="usa-step-indicator__segment-label"
              >Confirm info </span
            >
          </li>
          <li class="usa-step-indicator__segment">
            <span class="usa-step-indicator__segment-label"
              >Print, sign, and e-mail <span class="usa-sr-only">not completed</span></span
            >
          </li>
        </ol>
        </div>
    </>
  )
}

export default App
