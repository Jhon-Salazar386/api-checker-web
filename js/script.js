const form = document.getElementById("apiForm")
const urlInput = document.getElementById("apiUrl")
const result = document.getElementById("result")
const status = document.getElementById("status")
const response = document.getElementById("response")

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = urlInput.value.trim()

    result.classList.add("show")

    status.textContent = "Comprobando..."
    status.className = "status"

    response.textContent = "Esperando respuesta..."

    try {
        const apiResponse = await fetch(url)
        const text = await apiResponse.text()

        status.textContent = `${apiResponse.status} ${apiResponse.statusText}`

        status.className = apiResponse.ok ? "status" : "status error"

        try {
            const json = JSON.parse(text);

            response.textContent = JSON.stringify(json, null, 4)

        } catch {
            response.textContent = text || "(La API no devolvió contenido)"
        }

    } catch (error) {

        status.textContent = "ERROR"
        status.className = "status error"

        response.textContent =
            "No se ha podido conectar con la API." +
            error.message
    }
});