const { default: filters } = require("nunjucks/src/filters");

const url = window.location.pathname;
const menuLinks = document.querySelectorAll('header .links a')

for (let link of menuLinks) {
    if (url.includes(link.getAttribute('href'))) {
        link.classList.add('active')
    }
}
console.log(url)

//Paginação
// [1,...,13, 14, 15, 16, 17, ..., 20]
function paginate(selectedPage, totalPages) {
    let pages = [],
        previousPage


    for( let currentPage = 1; currentPage <= totalPages; currentPage++ ) {
        
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        
        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if(previousPage && currentPage - previousPage > 2) {
                pages.push("...")
            }

            if(previousPage && currentPage - previousPage == 2) {
                pages.push(currentPage - 1)
            }

            pages.push(currentPage)
            
            previousPage = currentPage
        }


    }

    return pages
}

const pagination = document.querySelector(".pagination")
const filter = pagination.dataset.filter
const page = +pagination.dataset.page
const total = +pagination.dataset.total

const pages = paginate(page, total)

console.log(pages)

let elements = ''

for (let page of pages) {
    if (String(page).includes("...")) {
        elements += `<span>${page}</span>`
        
    } else {
        if (filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`

        }

    }
}

pagination.innerHTML = elements