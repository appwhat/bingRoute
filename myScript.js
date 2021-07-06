var caixaText = document.getElementById('caixaText')


var campos = document.getElementsByTagName('input')


var shif = document.getElementById('shif')

onkeydown = (e) => {
    if (e.ctrlKey && e.shiftKey) {
        if (caixaText.style.display == "none") {
            caixaText.style.display = "block"
        } else {
            caixaText.style.display = "none"
        }
    }
    if (e.ctrlKey && e.code == 'Delete') {
        for (let i = 0; i < 30; i++) {
            campos[i + 20].value = ""
        }
    }
}



shif.onclick = () => {
    document.getElementsByTagName('input')[19].value = 'Avenida Professor Francisco Morato 2585, São Paulo, 05513-300, Brasil' /* Depois irei usar o Select */

    for (let i = 0; i < 30; i++) {

        let valor = `${caixaText.value.split('\n')[i]}`

        campos[i + 20].value = valor.trim()


    }



}
