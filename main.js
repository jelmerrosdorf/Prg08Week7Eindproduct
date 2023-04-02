const modelInfo = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
}

const button = document.getElementById("submit")
const result = document.getElementById("result")

let nn = ml5.neuralNetwork({ task: 'regression', debug: true })

function modelLoaded() {
    console.log('Model loaded!')
}

nn.load(modelInfo, modelLoaded)

button.addEventListener("click", async function() {
    const weight = Number(document.getElementById("weight").value)
    const resolution = Number(document.getElementById("resolution").value)
    const memory = Number(document.getElementById("memory").value)
    const storage = Number(document.getElementById("storage").value)
    const rearcam = Number(document.getElementById("rearcam").value)
    const frontcam = Number(document.getElementById("frontcam").value)

    const inputs = { weight: weight, resoloution: resolution, memory: memory, storage: storage, rearcam: rearcam, frontcam: frontcam }

    const pred = await nn.predict(inputs)

    const predictionValue = pred[0].value
    const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
    const predictionValueToPrice = fmt.format(predictionValue)

    result.innerHTML = `De prijs van deze telefoon is ${predictionValueToPrice}`
})   
    