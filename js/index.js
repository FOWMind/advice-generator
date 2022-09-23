const adviceId = document.getElementById("advice-id")
const adviceQuote = document.getElementById("advice-quote")
const generateAdviceButton = document.getElementById("generate-advice-button")

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

window.addEventListener("DOMContentLoaded", () => {
  generateAdvice()

  generateAdviceButton.addEventListener("click", () => {
    if (fetching.status === fetchStatuses.finished) {
      console.log("generando")
      generateAdvice()
    }
  })
})
