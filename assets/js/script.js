const cep = document.querySelector('#cep');

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