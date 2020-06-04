const url = 'http://localhost:3000/api'

async function usuario(){
    const res = await fetch(url+'/users/data')    
    const JSON = await res.json()
    if(JSON.status === 404){
        alert('El usuario no existe')
    } else{
        return JSON
    }
}

async function members(){
    const res = await fetch(url+'/members/data')    
    const JSON = await res.json()
    if(JSON.status === 404){
        alert('No hay registro de ningun miembro')
    } else{
        return JSON
    }
}

async function robotos(){
    const res = await fetch(url+'/robots/data')    
    const JSON = await res.json()
    if(JSON.status === 404){
        alert('No hay registro de ningun robot')
    } else{
        return JSON 
    }
}

async function renderUser(){
    const user = await usuario()
        document.getElementById('nombre').value = user._name
        document.getElementById('telefono').value = user._tel
        document.getElementById('date-user').value = user._date
        document.getElementById('pais').value = user._country
        document.getElementById('escolaridad').value = user._degree
        document.getElementById('institucion').value = user._scholar
}

async function renderMembers(){
    document.querySelectorAll('.member-li').forEach(function(a){
        a.remove()
    })
    const miembros = await members()
    const membersContainer = document.getElementById('members-container')

    miembros.forEach(miembro => {
        const li = document.createElement('li')
        li.className = 'member-li'
        li.innerHTML = `
        <div class="collapsible-header"><i class="icon icon-ghost-"></i>${miembro._name}</div>
        <div class="collapsible-body">
            <form>
                <p>
                    <input type="text" autocomplete="off" value="${miembro._status}" disabled>
                    <label class="label">
                        <span class="content">status_</span>
                    </label>
                </p>
                <p>
                    <input type="text" autocomplete="off" value="${miembro._tel}" disabled>
                    <label class="label">
                        <span class="content">tel&eacute;fono_</span>
                    </label>
                </p>
                <p>
                    <input type="text" autocomplete="off" value="${miembro._date}" disabled>
                    <label class="label">
                        <span class="content">fecha de nacimiento_</span>
                    </label>
                </p>
                <p>
                    <input type="text" autocomplete="off" value="${miembro._country}" disabled>
                    <label class="label">
                        <span class="content">pa&iacute;s_</span>
                    </label>
                </p>
                <p>
                    <input type="text" autocomplete="off" value="${miembro._degree}" disabled>
                    <label class="label">
                        <span class="content">escolaridad_</span>
                    </label>
                </p>
                <p>
                    <input type="text" autocomplete="off" value="Neutral" disabled>
                    <label class="label">
                        <span class="content">g&eacute;nero_</span>
                    </label>
                </p>
                <p>
                    <input type="text" autocomplete="off" value="${miembro._scholar}" disabled>
                    <label class="label">
                        <span class="content">instituci&oacute;n_</span>
                    </label>
                </p>
            </form>
        </div>
        `
        membersContainer.appendChild(li)
    })
}

async function robotos(){
    var res = await fetch(url+'/robots/data')    
    var JSON = await res.json()
    if(JSON.status === 404){
        alert('No hay registro de ningun robot')
    } else{
        return JSON 
    }
}

async function renderRobots(){
    document.querySelectorAll('.robot-li').forEach(function(a){
        a.remove()
    })
    const robots = await robotos()
    const robotsContainer = document.getElementById('robots-container')

    robots.forEach(robot => {
        const li = document.createElement('li')
        li.className = 'robot-li'
        li.innerHTML = `
        <div class="collapsible-header"><i class="icon icon-pac-man-"></i>${robot._name}</div>
        <div class="collapsible-body">
            <form>
                <p>
                    <input type="text" name="estatus" autocomplete="off" value="${robot._status}" disabled>
                    <label for="estatus" class="label">
                        <span class="content">estatus_</span>
                    </label>
                </p>
                <p>
                    <input type="text" name="categoria" autocomplete="off" value="${robot._category}" disabled>
                    <label for="categoria" class="label">
                        <span class="content">categor&iacute;a_</span>
                    </label>
                </p>
                <p>
                    <input type="text" name="precio" autocomplete="off" value="${robot._price}" disabled>
                    <label for="precio" class="label">
                        <span class="content">costo de inscripci&oacute;n_</span>
                    </label>
                </p>
            </form>
        </div>
        `
        robotsContainer.appendChild(li)
    })
}

document.addEventListener('DOMContentLoaded', () =>{
    renderUser()
    renderRobots()
    renderMembers()
})

document.getElementById('logout').onclick = async(e) =>{
    const res = await fetch(url+'/users/logout')    
    window.location.replace('/index.html')
}

document.getElementById('save').onclick = async(e) =>{
    e.preventDefault()
    const name = document.getElementById('nombre').value
    const tel = document.getElementById('telefono').value
    const date = document.getElementById('date-user').value
    const country = document.getElementById('pais').value
    const scholar = document.getElementById('escolaridad').value
    const degree = document.getElementById('institucion').value
    // const man = document.getElementById('man').value
    // const woman = document.getElementById('woman').value

    const data = new FormData()
    data.append('name', name)
    data.append('tel', tel)
    data.append('date', date)
    data.append('country', country)
    data.append('scholar', scholar)
    data.append('degree', degree)

    const res = await fetch(url+'/users/update', {
        method: 'PUT',
        body: data
    })

    const JSON = await res.json()
    
    if(JSON.status === 200){
        alert('Datos actualizados con exito')
    } else if(JSON.status === 400){
        alert('Los datos no fueron actualizados')
    } else if(JSON.status === 401){
        alert('No esta autorizado para hacer cambios')
        window.location.replace('/index.html')
    } else{
        console.log('Hubo un problema en el servidor')
    } 
    
}

document.getElementById('save-robot').onclick = async(e) =>{
    e.preventDefault()
    const name = document.getElementById('nombre-robot').value
    const category = document.getElementById('categoria').value

    const data = new FormData()
    data.append('name', name)
    data.append('category', category)

    const res = await fetch(url+'/robots/create', {
        method: 'POST',
        body: data
    })

    const JSON = await res.json()
    if(JSON.status === 200){
        alert('Robot guardado con exito')
        renderRobots()
    } else if(JSON.status === 401){
        alert('No esta autorizado para hacer cambios')
        window.location.replace('/index.html')
    } else{
        console.log('Hubo un problema en el servidor')
    } 
}

document.getElementById('save-member').onclick = async(e) =>{
    e.preventDefault()
    const name = document.getElementById('nombre-member').value
    const tel = document.getElementById('telefono-member').value
    const date = document.getElementById('date-input').value
    const country = document.getElementById('pais-member').value
    const scholar = document.getElementById('escolaridad-member').value
    const degree = document.getElementById('institucion-member').value
    // const man = document.getElementById('man').value
    // const woman = document.getElementById('woman').value

    const data = new FormData()
    data.append('name', name)
    data.append('tel', tel)
    data.append('date', date)
    data.append('country', country)
    data.append('scholar', scholar)
    data.append('degree', degree)

    const res = await fetch(url+'/members/create', {
        method: 'POST',
        body: data
    })

    const JSON = await res.json()
    
    if(JSON.status === 200){
        alert('Miembro creado con exito')
        renderMembers()
    } else if(JSON.status === 401){
        alert('No esta autorizado para hacer cambios')
        window.location.replace('/index.html')
    } else{
        console.log('Hubo un problema en el servidor')
    } 
    
}