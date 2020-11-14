selection.addEventListener('change', (event) => {
    selection.value = event.target.value
    location.href = `/users/${selection.value}/album`
})