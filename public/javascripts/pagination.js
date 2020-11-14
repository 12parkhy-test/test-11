paginationButtons.forEach((paginationButton) => {
    paginationButton.addEventListener('click', () => {
        location.href = `/users/${selection.value}/album?page=${paginationButton.innerHTML}&limit=5`
    })
})
