const BACKEND_ROOT_URL = 'http://localhost:3001'

import {Task} from "./class/Task.js"     
import {Todos} from "./class/Todos.js"
const todos = new Todos(BACKEND_ROOT_URL)

const list = <HTMLUListElement>document.querySelector('#todolist');
const input = <HTMLInputElement>document.querySelector('#newtodo');

input.disabled = true
todos.getTasks().then((tasks: Array<Task>) => {
    tasks.forEach(task => {
        renderTask(task)
        })
    input.disabled = false
    }, (error) => {
        alert(error)
});

input.addEventListener('keypress',event => {
    if (event.key === "Enter") {

        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            todos.addTask(text).then((task: Task) => {
                input.value = ''
                input.focus()
                renderTask(<Task>task)
            })
        }
        event.preventDefault()
    }
});

const renderTask = (task: Task) => {
    const list_item: HTMLLIElement = document.createElement('li')
    list_item.setAttribute('class', 'list-group-item')
    list_item.setAttribute('data-key', task.id.toString())
    renderSpan(list_item,task.text)
    renderLink(list_item,task.id)
    list.append(list_item)
}

const renderSpan = (list_item: HTMLLIElement,text: string) => {
    const span = list_item.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (list_item: HTMLLIElement, id: number) => {
    const link = list_item.appendChild(document.createElement('a'))
    link.innerHTML = '<i class="bi bi-trash"></i>'
    link.setAttribute('style','float: right')
      // Add mouseover and mouseout event listeners
      link.addEventListener('mouseover', () => {
        link.style.color = 'red'; 
        link.style.cursor = 'pointer'; 
    });

    link.addEventListener('mouseout', () => {
        link.style.color = '';
        link.style.cursor = ''; 
    });
    link.addEventListener('click',event => {
        todos.removeTask(id).then((id) => {
            const elementToRemove: HTMLLIElement = document.querySelector(`[data-key='${id}']`)
            if (elementToRemove) {
                list.removeChild(elementToRemove)
            }
        }).catch(error => {
            alert(error)
        })
    })
}