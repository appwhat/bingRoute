/* Não é Mapa */

var caixaText = document.getElementById('caixaText')


var campos = document.getElementsByTagName('input')

var btnDeletar = document.getElementById('btnDeletar')
var btnOk = document.getElementById('btnOk')
var btnMostrar = document.getElementById('btnMostrar')

function mostarOcultar() {
    if (caixaText.style.display == "none") {
        caixaText.style.display = "block"
    } else {
        caixaText.style.display = "none"
    }
}

function limparCampos() {
    for (let i = 0; i < 30; i++) { campos[i + 20].value = "" }

    map.entities.clear();
}


onkeydown = (e) => {
    if (e.ctrlKey && e.shiftKey) { mostarOcultar() }
    if (e.ctrlKey && e.code == 'Delete') { limparCampos() }
}



btnMostrar.onclick = () => { mostarOcultar() }
btnDeletar.onclick = () => { limparCampos() }

btnOk.onclick = () => {
    document.getElementsByTagName('input')[19].value = 'Avenida Professor Francisco Morato 2585, São Paulo, 05513-300, Brasil' /* Depois irei usar o Select */

    for (let i = 0; i < 30; i++) {
        let valor = `${caixaText.value.split('\n')[i]}`
        campos[i + 20].value = valor.trim()
    }
}
