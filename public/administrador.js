const url = 'http://localhost:3000/api'
var edit_robot = false, edit_member = false

document.addEventListener('DOMContentLoaded', () =>{ checkAdmin() })

document.getElementById('add-member').onclick = function(){
    if(edit_member == true) edit_member = false
    else edit_member = true
}

document.getElementById('add-robot').onclick = function(){
    if(edit_robot == true) edit_robot = false
    else edit_robot = true
}

document.getElementById('all-users').onclick = async() =>{
    const res = await fetch(url + '/admin/all/1')
    const JSON = await res.json()
    if(JSON.length == 0) alert('No se encontro ninguna coincidencia')
    renderUsers(JSON)
}

document.getElementById('all-members').onclick = async() =>{
    const res = await fetch(url + '/admin/all/2')
    const JSON = await res.json()
    if(JSON.length == 0) alert('No se encontro ninguna coincidencia')
    renderMembers(JSON)
}

document.getElementById('all-robots').onclick = async() =>{
    const res = await fetch(url + '/admin/all/3')
    const JSON = await res.json()
    if(JSON.length == 0) alert('No se encontro ninguna coincidencia')
    renderRobots(JSON)
}

document.getElementById('list-members').onclick = async(e) =>{
    e.preventDefault()
    const leader = document.getElementById('id-user').value

    if(leader == ''){
        alert('Aun no has seleccionado algun resultado')
    } else{
        const res = await fetch(url + '/admin/user-member/' + leader)
        const JSON = await res.json()
        if(JSON.length == 0) alert('No se encontro ninguna coincidencia')
        renderMembers(JSON)
    }
}

document.getElementById('list-robots').onclick = async(e) =>{
    e.preventDefault()
    const leader = document.getElementById('id-user').value

    if(leader == ''){
        alert('Aun no has seleccionado algun resultado')
    } else{
        const res = await fetch(url + '/admin/user-robot/' + leader)
        const JSON = await res.json()
        if(JSON.length == 0) alert('No se encontro ninguna coincidencia')
        renderRobots(JSON)
    }
}

function cleanSearch(){
    document.querySelectorAll('.nametag').forEach(function(a){ a.remove() })
}

function setAttributes(){
    document.getElementById('input-select').setAttribute('id', 'input-select-1')
    document.getElementById('input-select').setAttribute('id', 'input-select-2')
    document.getElementById('input-select').setAttribute('id', 'input-select-3')
    document.getElementById('input-select').setAttribute('id', 'input-select-4')
    document.getElementById('input-select').setAttribute('id', 'input-select-5')
    document.getElementById('input-select').setAttribute('id', 'input-select-6')
    document.getElementById('input-select').setAttribute('id', 'input-select-7')
    document.getElementById('input-select').setAttribute('id', 'input-select-8')
    document.getElementById('input-select').setAttribute('id', 'input-select-9')
    document.getElementById('input-select').setAttribute('id', 'input-select-10')
}

async function addOptions(leader){
    var selector = document.getElementsByClassName("select-opt")
    const res = await fetch(url + '/admin/user-member/' + leader)
    const miembros = await res.json()

    for(var i = 2; i < 6; i++){
        var opciones = selector[i].getElementsByTagName("li")
        const top = opciones.length - 1
        for(var j = top; j > 1; j--) opciones[j].remove()
    }

	miembros.forEach(miembro => {
		for(var i = 2; i < 6; i++){
			var opcion = miembro._name + ' ' + miembro._surname
			var li = document.createElement('li')
			li.innerHTML = `<span onclick="putValue(${i+1}, '${opcion}', '${miembro._id}')"> ${opcion} </span>`
			selector[i].append(li)
		} 
	})
}

async function putValue(index, opt, id){
	document.getElementById('input-select-'+ index).value = opt
	document.getElementById('input-select-'+ index).name = id
}

async function checkAdmin(){
    const res = await fetch(url+'/admin/check')
    const JSON = res.json()
    if(JSON.status == 200)
    setAttributes()
    else setAttributes()
}

// procedimientos de usuario

async function renderUsers(users){
    cleanSearch()
    const container = document.getElementById('result-container')
    users.forEach(user => {
        const div = document.createElement('div')
        div.onclick = async() =>{ 
            setLeader(user._id) 
            cancelMember()
            cancelRobot()
            if(edit_member == true){
                document.getElementById('add-member').click()
                edit_member = false
            }
            if(edit_robot == true){
                document.getElementById('add-robot').click()
                edit_robot = false
            }
        }
        div.className = 'nametag'
        div.innerHTML = `
        <h4>${user._email}</h4>
        <p class="tag-icons">
            <i class="icon icon-center_object_round-"></i>
        </p>
        `
        container.appendChild(div)
    })
}

async function setLeader(id){
    const res = await fetch(url + '/admin/user/' + id)
    const user = await res.json()
    
    document.getElementById("tag_form").style.opacity = "1"
    document.getElementById("tag_form_1").style.opacity = "1"
    document.getElementById("tag_form_2").style.opacity = "1"
    document.getElementById("tag_form_3").style.opacity = "1"
    document.getElementById("tag_form_4").style.opacity = "1"
    document.getElementById("tag_form_5").style.opacity = "1"
    document.getElementById("tag_form_6").style.opacity = "1"
    document.getElementById("tag_form_7").style.opacity = "1"
    document.getElementById("tag_form_8").style.opacity = "1"
    document.getElementById("tag_form_9").style.opacity = "1"
    document.getElementById("tag_form_10").style.opacity = "1"

    if(user._email) document.getElementById('email').value = user._email
    else document.getElementById('email').value = "Sin definir"
    if(user._name && user._surname) document.getElementById('name').value = user._name + ' ' + user._surname
    else document.getElementById('name').value = "Sin definir"
    if(user._team) document.getElementById('team').value = user._team
    else document.getElementById('team').value = "Sin definir"
    if(user._status) document.getElementById('status').value = user._status
    else document.getElementById('status').value = "Sin definir"
    if(user._tel) document.getElementById('tel').value = user._tel
    else document.getElementById('tel').value = "Sin definir"
    if(user._date) document.getElementById('date').value = user._date
    else document.getElementById('date').value = "Sin definir"
    if(user._country) document.getElementById('country').value = user._country
    else document.getElementById('country').value = "Sin definir"
    if(user._occupation) document.getElementById('occupation').value = user._occupation
    else document.getElementById('occupation').value = "Sin definir"
    if(user._scholarship) document.getElementById('scholarship').value = user._scholarship
    else document.getElementById('scholarship').value = "Sin definir"
    if(user._institution) document.getElementById('institution').value = user._institution
    else document.getElementById('institution').value = "Sin definir"
    if(user._gender) document.getElementById('gender').value = user._gender
    else document.getElementById('gender').value = "Sin definir"
    document.getElementById('id-user').value = user._id
}

// procedimientos de miembro

async function setMember(id){
    cancelRobot()
    if(edit_robot == true){
        document.getElementById('add-robot').click()
        edit_robot = false
    }
    const res = await fetch(url + '/admin/member/' + id)
    const member = await res.json()
    if(member){
        setLeader(member._leader)
        if(edit_member == false){
            document.getElementById('add-member').click()
            edit_member = true
        }
		document.getElementById('nombre-member').value = member._name
		document.getElementById('apellido-member').value = member._surname
		document.getElementById('tel-member').value = member._tel
		document.getElementById('fecha-member').value = member._date
		document.getElementById('pais-member').value = member._country
		document.getElementById('ocupacion-member').value = member._occupation
		document.getElementById('escolaridad-member').value = member._scholarship
		document.getElementById('institucion-member').value = member._institution
		document.getElementById('provisional-member').value = member._provisional
		document.getElementById('id-member').value = member._id

		if(member._gender == 'Hombre') document.getElementById('man-member').checked = true
		else if(member._gender == 'Mujer') document.getElementById('woman-member').checked = true
        else if(member._gender == 'Otro') document.getElementById('other-member').checked = true

		if(member._country) document.getElementById('input-select-7').value = member._country
		if(member._occupation) document.getElementById('input-select-8').value = member._occupation
		if(member._scholarship) document.getElementById('input-select-9').value = member._scholarship
		if(member._institution) document.getElementById('input-select-10').value = member._institution
    } else alert('No fue posible establecer conexion con el servidor')
}

async function renderMembers(members){
    cleanSearch()
    const container = document.getElementById('result-container')
    members.forEach(member => {
        const div = document.createElement('div')
        div.onclick = async(e) =>{ 
            cancelMember()
            setMember(member._id) 
        }
        div.className = 'nametag'
        div.innerHTML = `
        <h4>${member._name} ${member._surname}</h4>
        <p class="tag-icons">
            <i class="icon icon-center_object_round-"></i>
        </p>
        `
        container.appendChild(div)
    })
}

function clearMember(){
    document.getElementById('nombre-member').value = ""
	document.getElementById('apellido-member').value = ""
	document.getElementById('tel-member').value = ""
	document.getElementById('fecha-member').value = ""
	document.getElementById('pais-member').value = ""
	document.getElementById('ocupacion-member').value = ""
	document.getElementById('escolaridad-member').value = ""
	document.getElementById('institucion-member').value = ""
	document.getElementById('provisional-member').value = ""
	document.getElementById('id-member').value = ""

	document.getElementById('man-member').checked = false
	document.getElementById('woman-member').checked = false
    document.getElementById('other-member').checked = false
}

function cancelMember(){
    clearMember()
	document.getElementById('input-select-7').value = "Selecciona una opción"
	document.getElementById('input-select-8').value = "Selecciona una opción"
	document.getElementById('input-select-9').value = "Selecciona una opción"
	document.getElementById('input-select-10').value = "Selecciona una opción"
}

document.getElementById('cancel-member').onclick = (e) =>{
    document.getElementById('add-member').click()
    edit_member = false
	e.preventDefault()
	cancelMember()
}

document.getElementById('save-member').onclick = async(e) =>{
	const aux = document.getElementById('form-member').checkValidity()
	if(aux){
		e.preventDefault()
        var gender, country, scholarship, institution, occupation, provisional = '', error = false
        const genders = document.getElementsByName('genero-member')
        genders.forEach(i => { if(i.checked) gender = i.value })
        if(!gender) error = true

        if(!document.getElementById('pais-member').value) error = true
        else country = document.getElementById('pais-member').value

        if(!document.getElementById('ocupacion-member').value) error = true
        else occupation = document.getElementById('ocupacion-member').value

        if(!document.getElementById('escolaridad-member').value) error = true
        else scholarship = document.getElementById('escolaridad-member').value

        if(!document.getElementById('institucion-member').value) error = true
        else institution = document.getElementById('institucion-member').value

        if(document.getElementById('provisional-member').value)
        provisional = document.getElementById('provisional-member').value
        
        if(error) alert('Porfavor verifica que todas las opciones esten seleccionadas')
        else{
            const data = new FormData()
            data.append('name', document.getElementById('nombre-member').value)
            data.append('surname', document.getElementById('apellido-member').value)
            data.append('tel', document.getElementById('tel-member').value)
            data.append('date', document.getElementById('fecha-member').value)
            data.append('country', country)
            data.append('occupation', occupation)
            data.append('scholarship', scholarship)
            data.append('institution', institution)
            data.append('provisional', provisional)
            data.append('gender', gender)

            const id = document.getElementById('id-member').value
            const res = await fetch(url+'/admin/member-update/'+id, {
                method: 'PUT',
                body: data
            })
            const JSON = await res.json()
            if(JSON.status === 200){
                alert('Datos actualizados con exito')
                document.getElementById('add-member').click()
                edit_member = false
                cancelMember()
                cleanSearch()
            } else{
                // console.log(JSON.status);
                alert('No se pudo actualizar la informacion')
            }
        }
    }
}

// procedimientos de robot

async function setRobot(id){
    cancelMember()
    if(edit_member == true){
        document.getElementById('add-member').click()
        edit_member = false
    }
    const res = await fetch(url + '/admin/robot/' + id)
    const robot = await res.json()
    if(robot){
        setLeader(robot._leader)
        var flag = false
        if(edit_robot == false){
            document.getElementById('add-robot').click()
            edit_robot = true
        }

		document.getElementById('id-robot').value = robot._id
		document.getElementById('nombre-robot').value = robot._name
        document.getElementById('categoria').value = robot._category
        document.getElementById('input-select-2').value = robot._category

        if(robot._captain){
            if(robot._captain != 'Yo'){
                document.getElementById('input-select-3').value = robot._captain
                document.getElementById('input-select-3').name = robot._idMember[0]
            } else{
                flag = true
                document.getElementById('input-select-3').value = 'Lider'
            }
        }

        if(robot._members){
			var aux
			if(flag){ 
				for(var i = 0; i < robot._members.length; i++){
					aux = 4 + i
					document.getElementById('input-select-' + aux).value = robot._members[i]
					document.getElementById('input-select-' + aux).name = robot._idMember[i]
				}
			} else{
				if(robot._idMember.length == robot._members.length){ 
					var array = []
					robot._members.forEach(member => {
						if(member != 'Yo') array.push(member)
					})
					for(var i = 1; i < array.length+ 1; i++){
						aux = 3 + i
						document.getElementById('input-select-' + aux).value = array[i-1]
						document.getElementById('input-select-' + aux).name = robot._idMember[i]
					}
					document.getElementById('input-select-6').value = 'Lider'
				} else{
					for(var i = 1; i < robot._idMember.length; i++){
						aux = 3 + i
						document.getElementById('input-select-' + aux).value = robot._members[i-1]
						document.getElementById('input-select-' + aux).name = robot._idMember[i]
					}
				}
			}
		}
    } else alert('No fue posible establecer conexion con el servidor')
}

async function renderRobots(robots){
    cleanSearch()
    const container = document.getElementById('result-container')
    robots.forEach(robot => {
        const div = document.createElement('div')
        div.onclick = async(e) =>{ 
            cancelRobot()
            setRobot(robot._id)
            addOptions(robot._leader)
        }
        div.className = 'nametag'
        div.innerHTML = `
        <h4>${robot._name}</h4>
        <p class="tag-icons">
            <i class="icon icon-center_object_round-"></i>
        </p>
        `
        container.appendChild(div)
    })
}

function clearRobot(){
    document.getElementById('nombre-robot').value = ""
	document.getElementById('categoria').value = ""

	document.getElementById('input-select-3').name = ""
	document.getElementById('input-select-4').name = ""
	document.getElementById('input-select-5').name = ""
	document.getElementById('input-select-6').name = ""
    
	document.getElementById('captain').value = ""
	document.getElementById('member1').value = ""
	document.getElementById('member2').value = ""
    document.getElementById('member3').value = ""
}

function cancelRobot(){    
    clearRobot()
	document.getElementById('input-select-2').value = "Selecciona una opción"
	document.getElementById('input-select-3').value = "Selecciona una opción"
	document.getElementById('input-select-4').value = "Selecciona una opción"
	document.getElementById('input-select-5').value = "Selecciona una opción"
	document.getElementById('input-select-6').value = "Selecciona una opción"
}

document.getElementById('cancel-robot').onclick = (e) =>{
    document.getElementById('add-robot').click()
    edit_robot = false
	e.preventDefault()
	cancelRobot()
}

document.getElementById('save-robot').onclick = async(e) =>{
	const aux = document.getElementById('form-robot').checkValidity()
	if(aux){
		e.preventDefault()
        var categoria = true, capitan = true, yo = 0, price = 0
        var captain, member1, member2, member3, category, name
        name = document.getElementById('nombre-robot').value.toUpperCase()
        category = document.getElementById('input-select-2').value
        captain = document.getElementById('input-select-3')
        member1 = document.getElementById('input-select-4')
        member2 = document.getElementById('input-select-5')
        member3 = document.getElementById('input-select-6')

        if(!document.getElementById('categoria').value) categoria = false
        if(captain.value == 'Selecciona una opción') capitan = false

        if(categoria && capitan){
            var array = []
            if(captain.value != 'Lider' && captain.value != 'Selecciona una opción'){
                array.push(captain.name)
            } else if(captain.value == 'Lider') yo += 1

            if(member1.value != 'Lider' && member1.value != 'Selecciona una opción'){
                array.push(member1.name)
            } else if(member1.value == 'Lider') yo += 1

            if(member2.value != 'Lider' && member2.value != 'Selecciona una opción'){
                array.push(member2.name)
            } else if(member2.value == 'Lider') yo += 1

            if(member3.value != 'Lider' && member3.value != 'Selecciona una opción'){
                array.push(member3.name)
            } else if(member3.value == 'Lider') yo += 1

            var set = new Set(array)
            if(set.size == array.length && yo <= 1){
                if(category == "220 Libras") price = 1155.00
                if(category == "120 Libras") price = 1045.00
                if(category == "60 Libras") price = 935.00
                if(category == "30 Libras") price = 825.00
                if(category == "12 Libras") price = 715.00
                if(category == "3 Libras") price = 605.00
                if(category == "1 Libra") price = 539.00
                if(category == "Sumo R.C.") price = 990.00
                if(category == "Minisumo") price = 638.00
                if(category == "Microsumo") price = 638.00
                if(category == "Sumo autonomo") price = 990.00
                if(category == "Seguidor de linea") price = 638.00
                if(category == "Lego sumo") price = 540.00
                if(category == "Lego seguidor de linea") price = 540.00
                if(category == "Carrera de drones") price = 1000.00

                const data = new FormData()
                data.append('name', name)
                data.append('category', category)
                data.append('price', price)

                if(captain.value == 'Lider') data.append('captain', 'Yo')
                else data.append('captain', captain.value)
                data.append('idc', captain.name)

                if(member1.value == 'Lider') data.append('m1', 'Yo')
                else data.append('m1', member1.value)
                data.append('id1', member1.name)

                if(member2.value == 'Lider') data.append('m2', 'Yo')
                else data.append('m2', member2.value)
                data.append('id2', member2.name)

                if(member3.value == 'Lider') data.append('m3', 'Yo')
                else data.append('m3', member3.value)
                data.append('id3', member3.name)
    
                const id = document.getElementById('id-robot').value
                const res = await fetch(url+'/admin/robot-update/'+id, {
                    method: 'PUT',
                    body: data
                })

                const JSON = await res.json()
                if(JSON.status === 200){
                    alert('Datos actualizados con exito')
                    document.getElementById('add-robot').click()
                    edit_robot = false
                    cancelRobot()
                    cleanSearch()

                } else if(JSON.status === 400) alert('El nombre del robot ya esta en uso')
                else alert('No se pudo actualizar la informacion')
            } else alert('No se pueden repetir integrantes en el equipo')
        } else if(categoria && !capitan) alert('Es necesario escoger a un capitan')
        else if(!categoria &&capitan) alert('Es necesario escoger a una categoria')
        else alert('Es necesario escoger una categoria y un capitan')
    }
}

// document.getElementById('buscar').onclick = async(e) =>{
//     const filtro = document.getElementById('filtro').value
//     if(filtro){
//         const search = document.getElementById('busqueda').value
//         const res = await fetch('http://localhost:3000/api/admin/' + filtro +  '/' + search)  
//         const JSON = await res.json()
//         if(JSON.length == 0){
//             console.log('No se han encontrado datos');
//         } else{
//             JSON.forEach(json => {
//                 console.log(json._id);
//             })
//         }
//     } else alert('Elige una opcion para buscar')
// }