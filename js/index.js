const adviceId = document.getElementById("advice-id")
const adviceQuote = document.getElementById("advice-quote")
const generateAdviceButton = document.getElementById("generate-advice-button")

let clickBlocked = false

/*
* According to api.adviceslip.com:
* "Advice is cached for 2 seconds.
* Any repeat-request within 2 seconds will return the same piece of advice."

* Then the recommended time is 2000ms or more.

*/
const clickBlockedTime = 2100 // time in milliseconds

const fetchStatuses = {
  idle: "idle",
  inProgress: "inProgress",
  finished: "finished",
}
const fetching = {
  status: fetchStatuses.idle,
}

async function generateAdvice() {
  // Reset fetching status
  fetching.status = fetchStatuses.inProgress

  try {
    const response = await fetch("https://api.adviceslip.com/advice")
    if (response.ok) {
      const data = await response.json()
      if (!data) return

      return showAdvice(data.slip)
    }
  } catch (err) {
    console.error(err)
  } finally {
    return (fetching.status = fetchStatuses.finished)
  }
}

function showAdvice(advice) {
  adviceId.innerHTML = advice.id
  adviceQuote.innerHTML = `“${advice.advice}”`
}

function blockClick() {
  clickBlocked = true
  setTimeout(() => {
    clickBlocked = false
  }, clickBlockedTime)
}

window.addEventListener("DOMContentLoaded", () => {
  generateAdvice()

  generateAdviceButton.addEventListener("click", () => {
    if (clickBlocked) return
    blockClick()
    if (fetching.status === fetchStatuses.finished) {
      generateAdvice()
    }
  })
})
