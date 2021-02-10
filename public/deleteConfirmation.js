let formDelete = document.querySelector('#form-delete')
console.log(formDelete)
formDelete.addEventListener('submit', (event) => {
    const confir = confirm("Deseja excluir esse membro?")
    if (!confir) {
        event.preventDefault()
    }
})

