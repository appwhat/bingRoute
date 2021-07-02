var caixaText = document.getElementById('caixaText')

var shif = document.getElementById('shif')

onkeydown = (e) => {
    if (e.ctrlKey && e.shiftKey) {
        if (caixaText.style.display == "none") {
            caixaText.style.display = "block"
        } else {
            caixaText.style.display = "none"
        }
    }
}

shif.onclick = () => {
    if (caixaText.style.display == "none") {
        caixaText.style.display = "block"
    } else {
        caixaText.style.display = "none"
    }
}
