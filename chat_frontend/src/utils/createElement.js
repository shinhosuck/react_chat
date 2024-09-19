import {formatDate} from './formatDate'

export function createMessageElement(data) {
    const user = JSON.parse(localStorage.getItem('user'))
    const chats = document.querySelector('.chats')

    if (data) {
        const div = document.createElement('div')
        const p = document.createElement('p')
    
        const attr = user.user === data.author ? 
        'my-message chat-message ':
        'user-message chat-message'

        div.setAttribute('class', attr)
        p.setAttribute('class', 'chat')

        if (data.author !== user.user) {
            const span = document.createElement('span')
            const span1 = document.createElement('span')
            const span2 = document.createElement('span')

            span.innerHTML = data.author
            span1.innerHTML = data.message
            span2.innerHTML = formatDate(data.created)
            p.append(span, span1, span2)

        }
        else {
            const span = document.createElement('span')
            span.innerHTML = data.message 
            p.appendChild(span)
        }

        div.appendChild(p)
        chats.appendChild(div)
    }

    Array.from(chats.children).slice(-1)[0]
    .scrollIntoView({behavior:'smooth', block:'end'})
}