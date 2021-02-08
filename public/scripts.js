const url = window.location.pathname;
const menuLinks = document.querySelectorAll('header .links a')

for (let link of menuLinks) {
    if (url.includes(link.getAttribute('href'))) {
        link.classList.add('active')
    }
}
console.log(url)

