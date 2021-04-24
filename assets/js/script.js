const cep = document.querySelector('#cep');
let cepMask = "";
// AO EVENTO SER ACIONADO COLOCA A MASCARA NO CEP
cep.addEventListener("keyup", () => {
    cepMask = cep.value;
    if (cepMask) {
        if (cepMask.length === 8) {
            cep.value = `${cepMask.substr(0,5)}-${cepMask.substr(5,9)}`;
        }
    }
})

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem('cep'))
    },

    set(cep) {
        localStorage.setItem('cep', JSON.stringify(cep));
    }
}
const showData = (result) => {

    for (const campo in result) {
        if (document.querySelector('#' + campo)) {
            document.querySelector('#' + campo).value = result[campo];
            Storage.set(result);
        }
    }
}

cep.addEventListener('blur', (e) => {
    let search = cep.value.replace("-", "")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch(`https://viacep.com.br/ws/${search}/json`, options)
        .then(response => {
            response.json()
                .then(data => {
                    showData(data)
                })
        }).catch(e => console.log(e))

})