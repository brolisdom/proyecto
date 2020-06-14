const url = 'http://localhost:3000/api'

document.addEventListener('DOMContentLoaded', () =>{
    renderUser()
    renderRobots()
    renderMembers()
})

async function users(){
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
    const usuario = await users()
        document.getElementById('nombre').value = usuario._name
        document.getElementById('telefono').value = usuario._tel
        document.getElementById('date-user').value = usuario._date
        document.getElementById('pais').value = usuario._country
        document.getElementById('escolaridad').value = usuario._degree
        document.getElementById('institucion').value = usuario._scholar
}

async function renderMembers(){
    document.querySelectorAll('.member-li').forEach(function(a){ a.remove() })
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

async function renderRobots(){
    document.querySelectorAll('.robot-li').forEach(function(a){ a.remove() })
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

// no funciona al dar click al enlace
document.getElementById('logout').onclick = async(e) =>{
    const res = await fetch(url+'/users/logout')    
    window.location.replace('/index.html')
}

document.getElementById('save').onclick = async(e) =>{
    e.preventDefault()
    const data = new FormData()
    data.append('name', document.getElementById('nombre').value)
    data.append('tel', document.getElementById('telefono').value)
    data.append('date', document.getElementById('date-user').value)
    data.append('country', document.getElementById('pais').value)
    data.append('scholar', document.getElementById('escolaridad').value)
    data.append('degree', document.getElementById('institucion').value)
    // es probable que no sea necesario poner el genero en esta epoca
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
    const data = new FormData()
    data.append('name', document.getElementById('nombre-robot').value)
    data.append('category', document.getElementById('categoria').value)
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
    const data = new FormData()
    data.append('name', document.getElementById('nombre-member').value)
    data.append('tel', document.getElementById('telefono-member').value)
    data.append('date', document.getElementById('date-input').value)
    data.append('country', document.getElementById('pais-member').value)
    data.append('scholar', document.getElementById('escolaridad-member').value)
    data.append('degree', document.getElementById('institucion-member').value)
    // tal vez no sea necesario poner el genero
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