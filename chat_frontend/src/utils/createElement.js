

export function createMessageElement(data) {
    const chats = document.querySelector('.chats')

    const elementArray = Array.from(chats.children)
    elementArray.forEach((element)=> {
        if (element.getAttribute('data-id') === data.id) {
            element.remove()
        }
    })

    const div = document.createElement('div')
    const p = document.createElement('p')

    p.innerHTML = data.message 
    div.appendChild(p)
    div.setAttribute('data-id', data.id)
    chats.appendChild(div)

    Array.from(chats.children).slice(-1)[0]
    .scrollIntoView({behavior:'smooth', block:'end'})
}