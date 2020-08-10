const url = 'http://localhost:3000/api'

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
	document.getElementById('input-select').setAttribute('id', 'input-select-14')
	document.getElementById('input-select').setAttribute('id', 'input-select-15')
	document.getElementById('input-select').setAttribute('id', 'input-select-16')
	document.getElementById('input-select').setAttribute('id', 'input-select-17')
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
	renderUser()
	renderMembers()
	renderRobots()
	addOptions(false)
})

// **Funciones de usuario** //
document.getElementById('save').onclick = async(e) =>{ 
	const res = document.getElementById('form-user').checkValidity()
	if(res){
		e.preventDefault()
		var gender, occupation, country, scholarship, institution, school, error = false
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

		if(!document.getElementById('escuela').value) error = true
		else school = document.getElementById('escuela').value

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
			data.append('school', school)
			data.append('gender', gender)

			const res = await fetch(url+'/users/update', {
				method: 'PUT',
				body: data
			})

			const JSON = await res.json()
			if(JSON.status === 200) alert('Datos actualizados con exito')
			else alert('Los datos no fueron actualizados')
		}
	}
}

document.getElementById('logout').onclick = async(e) =>{
    await fetch(url+'/users/logout')    
    window.location.replace('/index.html')
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
		document.getElementById('nombre').value = usuario._name
		document.getElementById('apellido').value = usuario._surname
		document.getElementById('telefono').value = usuario._tel
		document.getElementById('fecha').value = usuario._date
		document.getElementById('ocupacion').value = usuario._occupation
		document.getElementById('pais').value = usuario._country
		document.getElementById('escolaridad').value = usuario._scholarship
		document.getElementById('institucion').value = usuario._institution
		document.getElementById('escuela').value = usuario._school
		
		if(usuario._occupation) document.getElementById('input-select-1').value = usuario._occupation
		if(usuario._country) document.getElementById('input-select-2').value = usuario._country
		if(usuario._scholarship) document.getElementById('input-select-3').value = usuario._scholarship
		if(usuario._institution) document.getElementById('input-select-4').value = usuario._institution
		if(usuario._school) document.getElementById('input-select-5').value = usuario._school

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
			var gender, country, scholarship, institution, school, occupation, error = false
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
	
			if(!document.getElementById('escuela-member').value) error = true
			else school = document.getElementById('escuela-member').value
			
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
				data.append('school', school)
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
						alert('Datos actualizados agregado con exito')
						document.getElementById('add-member').click()
						addOptions(true)
						renderMembers()
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
	document.getElementById('escuela-member').value = ""
	document.getElementById('id-member').value = ""

	document.getElementById('input-select-6').value = "Selecciona una opción"
	document.getElementById('input-select-7').value = "Selecciona una opción"
	document.getElementById('input-select-8').value = "Selecciona una opción"
	document.getElementById('input-select-9').value = "Selecciona una opción"
	document.getElementById('input-select-10').value = "Selecciona una opción"

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
			const li = document.createElement('li')
			li.className = 'member-li'
			li.innerHTML = `
			<div class="collapsible-header"><i class="icon icon-ghost-"></i>${miembro._name} ${miembro._surname}</div>
			<div class="collapsible-body">
				<form>
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
							<span class="content">pa&iacute;s de procedencia_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._occupation}" disabled>
						<label class="label">
							<span class="content">ocupacion__</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._scholarship}" disabled>
						<label class="label">
							<span class="content">escolaridad_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._institution}" disabled>
						<label class="label">
							<span class="content">instituci&oacute;n_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._school}" disabled>
						<label class="label">
							<span class="content">escuela_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._gender}" disabled>
						<label class="label">
							<span class="content">genero_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._status}" disabled>
						<label class="label">
							<span class="content">status_</span>
						</label>
					</p>
					</form>
					<p class="btn-block">
						<input type="submit" onclick="updateMember(event, '${miembro._id}')" value="E D I T A R _">
						<input type="submit" onclick="deleteMember(event, '${miembro._id}')" value="E L I M I N A R _">
					</p>
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
		document.getElementById('escuela-member').value = member._school
		document.getElementById('id-member').value = member._id

		if(member._country) document.getElementById('input-select-6').value = member._country
		if(member._occupation) document.getElementById('input-select-7').value = member._occupation
		if(member._scholarship) document.getElementById('input-select-8').value = member._scholarship
		if(member._institution) document.getElementById('input-select-9').value = member._institution
		if(member._school) document.getElementById('input-select-10').value = member._school

		if(member._gender == 'Hombre') document.getElementById('man-member').checked = true
		else if(member._gender == 'Mujer') document.getElementById('woman-member').checked = true
		else if(member._gender == 'Otro') document.getElementById('other-member').checked = true

		document.getElementById('save-member').value = 'A c t u a l i z a r _'
	}
}

async function deleteMember(e, id){
	e.preventDefault()
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
	} else{
		alert('El integrante no pudo ser borrado')
	}
}

// **Funciones de robots** 
document.getElementById('save-robot').onclick = async(e) =>{
	const res = document.getElementById('form-robot').checkValidity()
	if(res){
		e.preventDefault()
		completed = await checkCompleted()

		if(!completed) alert('Aun no has completado tus datos personales')
		else{
			const data = new FormData()
			data.append('name', document.getElementById('nombre-robot').value.toLowerCase())
			data.append('category', document.getElementById('categoria').value)
			data.append('captain', document.getElementById('captain').value)
			data.append('member1', document.getElementById('member1').value)
			data.append('member2', document.getElementById('member2').value)
			data.append('member3', document.getElementById('member3').value)
			data.append('member4', document.getElementById('member4').value)
			data.append('member5', document.getElementById('member5').value)

			const res = await fetch(url+'/robots/create', {
				method: 'POST',
				body: data
			})
			
			const JSON = await res.json()
			if(JSON.status === 200){
				alert('Nuevo robot creado con exito')
				document.getElementById('add-robot').click()
				renderRobots()
				cancelRobot()
			} else if(JSON.status === 400) alert('El nombre del robot ya esta en uso')
			else alert('No se pudo crear un nuevo robot')
		}
	}
}

async function Robots(){
    const res = await fetch(url+'/robots/data')    
    const JSON = await res.json()
    if(JSON.status === 404) return false 
    else return JSON 
}

async function addOptions(aux){
	var captain, member1, member2, member3, member4, member5
	var selector = document.getElementsByClassName("select-opt")

	if(aux){
		for(var i = 11; i < 17; i++){
			var opciones = selector[i].getElementsByTagName("li")
			const top = opciones.length - 1
			for(var j = top; j > 1; j--)
			opciones[j].remove()
		}
	}
	
	captain = document.getElementById('captain')
	member1 = document.getElementById('member1')
	member2 = document.getElementById('member2')
	member3 = document.getElementById('member3')
	member4 = document.getElementById('member4')
	member5 = document.getElementById('member5')

	const miembros = await Members()  
	miembros.forEach(miembro => {
		option = document.createElement('option')
		option.text = miembro._name + ' ' + miembro._surname
		option.value = miembro._id
		captain.add(option)
		member1.add(option)
		member2.add(option)
		member3.add(option)
		member4.add(option)
		member5.add(option)
		
		for(var i = 11; i < 17; i++){
			var opcion = option.text
			var li = document.createElement('li')
			li.innerHTML = "<span>" + opcion + "</span>"
			selector[i].append(li)
		} 
	})
}

async function cancelRobot(){
	// document.getElementById('nombre-robot').value = ""
	// document.getElementById('categoria').value = ""
	// document.getElementById('captain').value = ""
	// document.getElementById('member1').value = ""
	// document.getElementById('member2').value = ""
	// document.getElementById('member3').value = ""
	// document.getElementById('member4').value = ""
	// document.getElementById('member5').value = ""
}

async function renderRobots(){
    document.querySelectorAll('.robot-li').forEach(function(a){ a.remove() })
    const robots = await Robots()
	const robotsContainer = document.getElementById('robots-container')
	if(robots){
		var boton1, boton2
		robots.forEach(robot => {
			const li = document.createElement('li')
			if(robot._status == 'Sin registrar'){
				boton1 = `<input type="submit" onclick="deleteRobot('${robot._id}')" value="E l i m i n a r _">`
				boton2 = `<input type="submit" onclick="registRobot('${robot._id}')" value="R e g i s t r a r _">`
			} else{
				boton1 = `<input type="submit" value="A P L I C A R  D E S C U E N T O _">`
				boton2 = `<input type="button" value="P A G A R  E N  L &Iacute; N E A _" onclick="location.href='https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.mercadopago.com.mx%2Fcheckout%2Fv1%2Fredirect%3Fpref_id%3D249524119-7ff4d878-f607-41ef-8201-be6634c9d25f%26fbclid%3DIwAR109_K4yWn-aHhlXTv73HXp-oXH2_JMs6HYUehD-TQgufG6zuS1Tfwg9qk&h=AT2nPT58dlAqgGjM47fmr81LmsM7siGExsg4fDIiZZSnetX9IShqinH90DMc-65LHnC6-R_DbW-HDDFD-rMEZCSFBYJLA5CJhmeh4ilxEQbrkU6ew_Q12D2MRU33AnVUqRptdnK8G8rNe50GTa2y3w'">`
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
					<p>
						<input type="text" name="captain" autocomplete="off" value="${robot._captain}" disabled>
						<label for="captain" class="label">
							<span class="content">capitan_</span>
						</label>
					</p>
					<p>
					<input type="text" name="members" autocomplete="off" value="${robot._members}" disabled>
						<label class="label" for="members">
							<span class="content">integrantes_</span>
						</label>
					</p>
				</form>
				<p class="btn-block">
				${boton1}
				${boton2}
				</p>
			</div>
			`
			robotsContainer.appendChild(li)
		})
	}
}

async function registRobot(id){
	var opc = confirm('Al registrarte no podras modificar los datos de tu equipo participante')
	if(opc == true){
		const res = await fetch(url+'/robots/regist/'+id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'PUT'
		})	
		const JSON = await res.json()
		if(JSON.status == 200){
			// alert('')
			renderRobots()
		} else{
			alert('El robot no pudo ser pre-registrado')
		}
	} 
}

async function deleteRobot(id){
	const res = await fetch(url+'/robots/delete/'+id, {
		headers: { 'Content-Type': 'application/json' },
		method: 'DELETE'
	})	
	const JSON = await res.json()
	if(JSON.status == 200){
		alert('Tu robot ha sido eliminado')
		renderRobots()
	} else{
		alert('El robot no pudo ser eliminado')
	}
}