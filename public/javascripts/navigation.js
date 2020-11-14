let toggleButton = document.querySelector('.toggle-button')
let navbarLinks = document.querySelector('.navbar-links')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})