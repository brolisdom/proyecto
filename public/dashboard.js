const url = 'https://guerraderobots.herokuapp.com/api'

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
	document.getElementById('input-select').setAttribute('id', 'input-select-11')
	document.getElementById('input-select').setAttribute('id', 'input-select-12')
	document.getElementById('input-select').setAttribute('id', 'input-select-13')
}

async function checkCompleted(){ 
    const usuario = await User()
	return usuario._completed
}

document.getElementById('registro').onclick = async(e) =>{
	completed = await checkCompleted()
	if(!completed) alert('Aun no has completado tus datos personales')
}

document.addEventListener('DOMContentLoaded', () =>{
	checkUser()
	renderUser()
	renderMembers()
	renderRobots()
	addOptions(false)
})

async function checkUser(){ 
    const res = await fetch(url+'/users')
    const JSON = await res.json()
	if(JSON.status === 401){
		window.location.replace('/index.html')
	} else if(JSON.status == 201){
		document.getElementById('admin').hidden = false
	}
}

document.getElementById('admin').onclick = function(){  
    window.location.replace('/administrador.html')
}

document.getElementById('logout').onclick = async(e) =>{
    await fetch(url+'/users/logout')    
    window.location.replace('/index.html')
}

// **Funciones de usuario** //

document.getElementById('save').onclick = async(e) =>{ 
	const res = document.getElementById('form-user').checkValidity()
	if(res){
		e.preventDefault()
		var team, gender, occupation, country, scholarship, institution, provisional, error = false
		const genders = document.getElementsByName('genero')

		genders.forEach(i => { if(i.checked) gender = i.value })
		if(!gender) error = true

		if(!document.getElementById('ocupacion').value) error = true
		else occupation = document.getElementById('ocupacion').value

		if(!document.getElementById('pais').value) error = true
		else country = document.getElementById('pais').value

		if(!document.getElementById('escolaridad').value) error = true
		else scholarship = document.getElementById('escolaridad').value

		if(!document.getElementById('institucion').value) error = true
		else institution = document.getElementById('institucion').value

		if(!document.getElementById('provisional').value) provisional = ''
		else provisional = document.getElementById('provisional').value

		if(!document.getElementById('equipo').value) error = true
		else team = document.getElementById('equipo').value.toLowerCase()

		if(error) alert('Porfavor verifica que todas las opciones esten seleccionadas')
		else{
			const data = new FormData()
			data.append('name', document.getElementById('nombre').value)
			data.append('surname', document.getElementById('apellido').value)
			data.append('tel', document.getElementById('telefono').value)
			data.append('date', document.getElementById('fecha').value)
			data.append('occupation', occupation)
			data.append('country', country)
			data.append('scholarship', scholarship)
			data.append('institution', institution)
			data.append('provisional', provisional)
			data.append('gender', gender)
			data.append('team', team)

			const res = await fetch(url+'/users/update', {
				method: 'PUT',
				body: data
			})

			const JSON = await res.json()
			if(JSON.status === 200) alert('Datos actualizados con exito')
			else if(JSON.status === 400) alert('El nombre de elegiste ya esta ocupado')
			else alert('Los datos no fueron actualizados')
		}
	}
}

async function User(){ 
    const res = await fetch(url+'/users/data')    
	const JSON = await res.json()
	
    if(JSON.status === 404) return false 
    else return JSON
}

async function renderUser(){
	const usuario = await User()
	setAttributes()

	if(usuario){
		document.getElementById('equipo').value = usuario._team
		document.getElementById('nombre').value = usuario._name
		document.getElementById('apellido').value = usuario._surname
		document.getElementById('telefono').value = usuario._tel
		document.getElementById('fecha').value = usuario._date
		document.getElementById('ocupacion').value = usuario._occupation
		document.getElementById('pais').value = usuario._country
		document.getElementById('escolaridad').value = usuario._scholarship
		document.getElementById('institucion').value = usuario._institution
		if(usuario._provisional) document.getElementById('provisional').value = usuario._provisional

		if(usuario._country) document.getElementById('input-select-1').value = usuario._country
		if(usuario._occupation) document.getElementById('input-select-2').value = usuario._occupation
		if(usuario._scholarship) document.getElementById('input-select-3').value = usuario._scholarship
		if(usuario._institution) document.getElementById('input-select-4').value = usuario._institution

		if(usuario._gender == 'Hombre') document.getElementById('man').checked = true
		else if(usuario._gender == 'Mujer') document.getElementById('woman').checked = true
		else if(usuario._gender == 'Otro') document.getElementById('other').checked = true
	}
}

// **Funciones de miembros** //

document.getElementById('save-member').onclick = async(e) =>{
	const aux = document.getElementById('form-member').checkValidity()
	if(aux){
		e.preventDefault()
		completed = await checkCompleted()

		if(!completed) alert('Aun no has completado tus datos personales')
		else{
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
	
				if(document.getElementById('save-member').value === "G u a r d a r _"){
					const res = await fetch(url+'/members/create', {
						method: 'POST',
						body: data
					})
					const JSON = await res.json()
					if(JSON.status === 200){
						alert('Nuevo integrante agregado con exito')
						document.getElementById('add-member').click()
						addOptions(true)
						renderMembers()
						cancelMember()
					} else alert('No se pudo agregar tu integrante')
				} else{
					const id = document.getElementById('id-member').value
					const res = await fetch(url+'/members/update/'+id, {
						method: 'PUT',
						body: data
					})
					const JSON = await res.json()
					if(JSON.status === 200){
						alert('Datos actualizados con exito')
						document.getElementById('add-member').click()
						addOptions(true)
						renderMembers()
						renderRobots()
						cancelMember()
					} else{
						console.log(JSON.status);
						alert('No se pudo actualizar la informacion')
					}
				}
			}
		}
	}
}

document.getElementById('cancel-member').onclick = async(e) =>{
	document.getElementById('add-member').click()
	e.preventDefault()
	cancelMember()
}

async function Members(){
    const res = await fetch(url+'/members/data')    
    const JSON = await res.json()
    if(JSON.status === 404) return false 
    else return JSON
}

async function cancelMember(){
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

	document.getElementById('input-select-5').value = "Selecciona una opción"
	document.getElementById('input-select-6').value = "Selecciona una opción"
	document.getElementById('input-select-7').value = "Selecciona una opción"
	document.getElementById('input-select-8').value = "Selecciona una opción"

	document.getElementById('man-member').checked = false
	document.getElementById('woman-member').checked = false
	document.getElementById('other-member').checked = false

	document.getElementById('save-member').value = 'G u a r d a r _'
}

async function renderMembers(){
    document.querySelectorAll('.member-li').forEach(function(a){ a.remove() })
    const miembros = await Members()
	const membersContainer = document.getElementById('members-container')

	if(miembros){
		miembros.forEach(miembro => {
			var buttons, institution
			const li = document.createElement('li')
			if(!miembro._robots){
				buttons = `<p class="btn-block">
					<input type="submit" onclick="updateMember(event, '${miembro._id}')" value="E D I T A R _">
					<input type="submit" onclick="deleteMember(event, '${miembro._id}')" value="E L I M I N A R _">
				</p>`
			} else buttons = `<input type="submit" onclick="updateMember(event, '${miembro._id}')" value="E D I T A R _">`
			if(miembro._status != 'Espectador') buttons = ''

			if(miembro._provisional != '') institution = miembro._provisional
			else institution = miembro._institution

			li.className = 'member-li'
			li.innerHTML = `
			<div class="collapsible-header"><i class="icon icon-ghost-"></i>${miembro._name} ${miembro._surname}</div>
			<div class="collapsible-body">
				<form>
					<p>
						<input type="text" autocomplete="off" value="${miembro._status}" disabled>
						<label class="label">
							<span class="content">estatus_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._tel}" disabled>
						<label class="label">
							<span class="content">telefono_</span>
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
						<input type="text" autocomplete="off" value="${miembro._occupation}" disabled>
						<label class="label">
							<span class="content">ocupacion_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._scholarship}" disabled>
						<label class="label">
							<span class="content">escolaridad_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${institution}" disabled>
						<label class="label">
							<span class="content">instituci&oacute;n/escuela_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._gender}" disabled>
						<label class="label">
							<span class="content">genero_</span>
						</label>
					</p>
					
					</form>
					${buttons}
			</div>
			`
			membersContainer.appendChild(li)
		})
	}
}

async function updateMember(e, id){
	e.preventDefault()

	const res = await fetch(url+'/members/data/'+id)
	const JSON = await res.json()

	if(JSON.status === 404) alert('No se pudo conectar con el servidor')
    else if(JSON.status === 401) console.log('No tiene autorizacion necesaria')
    else{
		var member = JSON
		document.getElementById('add-member').click()
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

		if(member._country) document.getElementById('input-select-5').value = member._country
		if(member._occupation) document.getElementById('input-select-6').value = member._occupation
		if(member._scholarship) document.getElementById('input-select-7').value = member._scholarship
		if(member._institution) document.getElementById('input-select-8').value = member._institution

		if(member._gender == 'Hombre') document.getElementById('man-member').checked = true
		else if(member._gender == 'Mujer') document.getElementById('woman-member').checked = true
		else if(member._gender == 'Otro') document.getElementById('other-member').checked = true

		document.getElementById('save-member').value = 'A c t u a l i z a r _'
	}
}

async function deleteMember(e, id){
	e.preventDefault()
	var opc = confirm('Estas seguro de querer borrar a tu integrante?')
	if(opc == true){
		const res = await fetch(url+'/members/delete/'+id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE'
		})	
		const JSON = await res.json()
		if(JSON.status == 200){
			alert('Tu integrante ha sido borrado')
			addOptions(true)
			renderMembers()
			cancelMember()
		} else alert('El integrante no pudo ser borrado')
	}
}

// **Funciones de robots** 

document.getElementById('save-robot').onclick = async(e) =>{
	const aux = document.getElementById('form-robot').checkValidity()
	if(aux){
		e.preventDefault()
		completed = await checkCompleted()
		if(!completed) alert('Aun no has completado tus datos personales')
		else{
			var categoria = true, capitan = true, yo = 0, price = 0
			const image = document.getElementById('imagen-robot').files
			const name = document.getElementById('nombre-robot').value.toLowerCase()
			const category = document.getElementById('input-select-9').value
			const captain = document.getElementById('input-select-10')
			const member1 = document.getElementById('input-select-11')
			const member2 = document.getElementById('input-select-12')
			const member3 = document.getElementById('input-select-13')

			if(!document.getElementById('categoria').value) categoria = false
			if(captain.value == 'Selecciona una opción') capitan = false

			if(categoria && capitan){
				const array = []
				if(captain.value != 'Líder' && captain.value != 'Selecciona una opción'){
					array.push(captain.name)
				} else if(captain.value == 'Líder') yo += 1
				if(member1.value != 'Líder' && member1.value != 'Selecciona una opción'){
					array.push(member1.name)
				} else if(member1.value == 'Líder') yo += 1
				if(member2.value != 'Líder' && member2.value != 'Selecciona una opción'){
					array.push(member2.name)
				} else if(member2.value == 'Líder') yo += 1
				if(member3.value != 'Líder' && member3.value != 'Selecciona una opción'){
					array.push(member3.name)
				} else if(member3.value == 'Líder') yo += 1

				const set = new Set(array)
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

					var m1 = '', m2 = '', m3 = '', id1 = '', id2 = '', id3 = ''
					if(captain.value == 'Líder') captain.name = ''
					if(member1.value != 'Selecciona una opción' && member1.value != 'Líder'){
						m1 = member1.value
						id1 = member1.name
					} else if(member1.value == 'Líder') m1 = member1.value
					if(member2.value != 'Selecciona una opción' && member2.value != 'Líder'){
						m2 = member2.value
						id2 = member2.name
					} else if(member2.value == 'Líder') m2 = member2.value
					if(member3.value != 'Selecciona una opción' && member3.value != 'Líder'){
						m3 = member3.value
						id3 = member3.name
					} else if(member3.value == 'Líder') m3 = member3.value
				
					const data = new FormData()
					data.append('name', name)
					data.append('price', price)
					data.append('category', category)
					data.append('prototype', image[0])
					data.append('captain', captain.value)
					data.append('idc', captain.name)
					data.append('id1', id1)
					data.append('id2', id2)
					data.append('id3', id3)
					data.append('m1', m1)
					data.append('m2', m2)
					data.append('m3', m3)
		
					if(document.getElementById('save-robot').value === "C r e a r _"){
						const res = await fetch(url+'/robots/create', {
							method: 'POST',
							body: data
						})
						
						const JSON = await res.json()
						if(JSON.status === 200){
							alert('Nuevo robot creado con exito')
							document.getElementById('add-robot').click()
							cancelRobot()
							renderRobots()
							renderMembers()
						} else if(JSON.status === 403) alert('El nombre del robot ya esta en uso')
						else alert('No se pudo crear un nuevo robot')

					} else{
						const id = document.getElementById('id-robot').value
						const res = await fetch(url+'/robots/update/'+id, {
							method: 'PUT',
							body: data
						})

						const JSON = await res.json()
						if(JSON.status === 200){
							alert('Datos actualizados con exito')
							cancelRobot()
							renderRobots()
							renderMembers()
							document.getElementById('add-robot').click()
						} else if(JSON.status === 403) alert('El nombre del robot ya esta en uso')
						else{
							console.log(JSON.status);
							alert('No se pudo actualizar la informacion')
						}
					}
				} else alert('No puede haber intengrantes repetidos')
			} else if(categoria && !capitan) alert('Es necesario escoger a un capitan')
			else if(!categoria &&capitan) alert('Es necesario escoger a una categoria')
			else alert('Es necesario escoger una categoria y un capitan')
		}
	}
}

document.getElementById('cancel-robot').onclick = async(e) =>{
	document.getElementById('add-robot').click()
	e.preventDefault()
	cancelRobot()
}

async function Robots(){
    const res = await fetch(url+'/robots/data')    
    const JSON = await res.json()
    if(JSON.status === 404) return false 
    else return JSON 
}

async function addOptions(aux){
	var selector = document.getElementsByClassName("select-opt")

	if(aux){
		for(var i = 9; i < 13; i++){
			var opciones = selector[i].getElementsByTagName("li")
			const top = opciones.length - 1
			for(var j = top; j > 1; j--)
			opciones[j].remove()
		}
	}

	const miembros = await Members()  
	miembros.forEach(miembro => {
		for(var i = 9; i < 13; i++){
			var opcion = miembro._name + ' ' + miembro._surname
			var li = document.createElement('li')
			li.innerHTML = `<span onclick="putValue(${i+1}, '${opcion}', '${miembro._id}')"> ${opcion} </span>`
			selector[i].append(li)
		} 
	})
}

function putValue(val, opt, id){
	document.getElementById('input-select-'+ val).value = opt
	document.getElementById('input-select-'+ val).name = id
}

function cancelRobot(){
	document.getElementById('nombre-robot').value = ""
	document.getElementById('save-robot').value = 'C r e a r _'
	document.getElementById('categoria').value = ""

	document.getElementById('input-select-9').value = "Selecciona una opción"
	document.getElementById('input-select-10').value = "Selecciona una opción"
	document.getElementById('input-select-11').value = "Selecciona una opción"
	document.getElementById('input-select-12').value = "Selecciona una opción"
	document.getElementById('input-select-13').value = "Selecciona una opción"
	document.getElementById('file_span').innerHTML = "No has elegido archivos."

	document.getElementById('input-select-10').name = ""
	document.getElementById('input-select-11').name = ""
	document.getElementById('input-select-12').name = ""
	document.getElementById('input-select-13').name = ""

	document.getElementById('captain').value = ""
	document.getElementById('member1').value = ""
	document.getElementById('member2').value = ""
	document.getElementById('member3').value = ""
	document.getElementById('imagen-robot').value = ""
}

async function generateVoucher(id, name, category, price){
	res = await fetch(url+'/robots/voucher/' + id)
	JSON = await res.json()
	if(JSON.status == 200){
		opc = confirm('Confirme que desea abrir el comprobante de inscripcion')
		if(opc == true) setTimeout(() => {  window.open('/vouchers/' + id + '.pdf') }, 2222);
	} else alert('No se pudo crear el comprobante')
}

async function renderRobots(){
    document.querySelectorAll('.robot-li').forEach(function(a){ a.remove() })
    const robots = await Robots()
	const robotsContainer = document.getElementById('robots-container')
	if(robots){
		var boton1 = '', boton2 = '', boton3 = ''
		robots.forEach(robot => {
			var members = '', prototypo = ''
			const li = document.createElement('li')
			if(robot._status == 'Sin registrar'){
				boton1 = `<p class="btn-block"><input type="submit" onclick="updateRobot('${robot._id}')" value="E d i t a r _">`
				boton2 = `<input type="submit" onclick="deleteRobot('${robot._id}')" value="E l i m i n a r _"></p>`
				boton3 = `<input type="submit" onclick="registRobot('${robot._id}')" value="R e g i s t r a r _"><br><br><br>`
			} else{
				boton1 = `<p class="btn-block"><input type="button" onclick="alert('Opcion deshabilitada temporalmente')" value="Proceder al pago_" >`
				boton2 = `<input type="submit" onclick="alert('Opcion deshabilitada temporalmente')" value="Subir evidencia _"></p>`
				boton3 = `<input type="submit" onclick="generateVoucher('${robot._id}')" value="Descargar comprobante_"><br><br><br>`
			}

			if(robot._member1.value) members += `<input type="text" autocomplete="off" value="${robot._member1.value}" disabled>`
			if(robot._member2.value) members += `<input type="text" autocomplete="off" value="${robot._member2.value}" disabled>`
			if(robot._member3.value) members += `<input type="text" autocomplete="off" value="${robot._member3.value}" disabled>`
			if(members == '') members = `<input type="text" autocomplete="off" value="Sin integrantes" disabled>`

			if(robot._prototype != ''){
				prototypo = `
					<p>
						<a href="${robot._prototype}" target="_blank"><input type="text" name="prototype" autocomplete="off" value="Haz click aqui" disabled>
						<label for="prototype" class="label">
							<span class="content">imagen de prototypo_</span>
						</label></a>
					</p>
				`
			} else{
				prototypo = `
					<p>
						<input type="text" name="prototype" autocomplete="off" value="Sin asignar" disabled>
						<label for="prototype" class="label">
							<span class="content">imagen de prototypo_</span>
						</label>
					</p>
				`
			}

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
						<input type="text" name="precio" autocomplete="off" value="${robot._price} MXN" disabled>
						<label for="precio" class="label">
							<span class="content">costo de inscripci&oacute;n_</span>
						</label>
					</p>
					${prototypo}
					<p>
						<input type="text" name="captain" autocomplete="off" value="${robot._captain.value}" disabled>
						<label for="captain" class="label">
							<span class="content">capitan_</span>
						</label>
					</p>
					<p>
					${members}
						<label class="label">
							<span class="content">integrantes_</span>
						</label>
					</p>
				</form>
				${boton3}
				${boton1}
				${boton2}
			</div>
			`
			robotsContainer.appendChild(li)
		})
	}
}

async function registRobot(id){
	var opc = confirm('Un vez pre registrado ya no podras modificar los datos de los integrantes participantes ni de tu robot. ¿Estas seguro de continuar?')
	if(opc == true){
		const res = await fetch(url+'/robots/regist/'+id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'PUT'
		})	
		const JSON = await res.json()
		if(JSON.status == 200){
			cancelRobot()
			renderRobots()
			renderMembers()
			alert('Robot pre registrado con exito')
		} else alert('El robot no pudo ser pre registrado')
	} 
}

async function deleteRobot(id){
	var opc = confirm('Estas seguro de querer eliminar a tu robot?')
	if(opc == true){
		const ans = await fetch(url+'/robots/delete/'+id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE'
		})	

		const JSON = await ans.json()
		if(JSON.status == 200){
			alert('Tu robot ha sido eliminado')
			cancelRobot()
			renderRobots()
			renderMembers()
		} else alert('El robot no pudo ser eliminado')
	} else alert('Hubo un error en el servidor')
}

async function updateRobot(id){
	cancelRobot()
	const res = await fetch(url+'/robots/data/'+id)
	const robot = await res.json()

	if(robot.status === 404) alert('No se pudo conectar con el servidor')
    else if(robot.status === 401) console.log('No tiene autorizacion necesaria')
    else{
		document.getElementById('add-robot').click()
		document.getElementById('id-robot').value = robot._id
		document.getElementById('nombre-robot').value = robot._name
		document.getElementById('save-robot').value = 'A c t u a l i z a r _'
		if(robot._prototype != '') document.getElementById('file_span').innerHTML = "Sobreescribir archivo existente."

		document.getElementById('categoria').value = robot._category
		document.getElementById('input-select-9').value = robot._category

		document.getElementById('input-select-10').value = robot._captain.value
		document.getElementById('input-select-10').name = robot._captain.key

		if(robot._member1.value != '')
		document.getElementById('input-select-11').value = robot._member1.value
		document.getElementById('input-select-11').name = robot._member1.key
		if(robot._member2.value != '')
		document.getElementById('input-select-12').value = robot._member2.value
		document.getElementById('input-select-12').name = robot._member2.key
		if(robot._member3.value != '')
		document.getElementById('input-select-13').value = robot._member3.value
		document.getElementById('input-select-13').name = robot._member3.key
	}
}