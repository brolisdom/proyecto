const url = 'http://localhost:3000/api'

document.addEventListener('DOMContentLoaded', () =>{
    renderMembers()
	renderRobots()
	renderUser()
})

// **Funciones de usuario** //
document.getElementById('save').onclick = async(e) =>{ 
	const res = document.getElementById('form-user').checkValidity()
	if(res){
		e.preventDefault()
		var gender, country, scholar, institution, school
		const genders = document.getElementsByName('genero')
		genders.forEach(i => { if(i.checked) gender = i.value })
		if(!gender) gender = 'Sin definir'
		if(!document.getElementById('pais').value) country = 'Sin definir'
		else country = document.getElementById('pais').value
		if(!document.getElementById('escolaridad').value) scholar = 'Sin definir'
		else scholar = document.getElementById('escolaridad').value
		if(!document.getElementById('institucion').value) institution = 'Sin definir'
		else institution = document.getElementById('institucion').value
		if(!document.getElementById('escuela').value) school = 'Sin definir'
		else school = document.getElementById('escuela').value
		const data = new FormData()
		data.append('name', document.getElementById('nombre').value)
		data.append('tel', document.getElementById('telefono').value)
		data.append('date', document.getElementById('fecha').value)
		data.append('country', country)
		data.append('scholar', scholar)
		data.append('institution', institution)
		data.append('school', school)
		data.append('gender', gender)
		const res = await fetch(url+'/users/update', {
			method: 'PUT',
			body: data
		})
		const JSON = await res.json()
		if(JSON.status === 200){
			alert('Datos actualizados con exito')
		} else{
			alert('Los datos no fueron actualizados')
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
    if(JSON.status === 404){
        return false 
    } else{
        return JSON
    } 
}

async function renderUser(){
	const usuario = await User()
	if(usuario){
			document.getElementById('nombre').value = usuario._name
			document.getElementById('telefono').value = usuario._tel
			document.getElementById('fecha').value = usuario._date
			document.getElementById('pais').value = usuario._country
			document.getElementById('escolaridad').value = usuario._scholar
			document.getElementById('institucion').value = usuario._institution
			document.getElementById('escuela').value = usuario._school
			
			this.input = document.getElementById('input-select')
			this.input.setAttribute('id', 'input-select-1');
			document.getElementById('input-select-1').value = usuario._country

			this.input = document.getElementById('input-select')
			this.input.setAttribute('id', 'input-select-2');
			document.getElementById('input-select-2').value = usuario._scholar

			this.input = document.getElementById('input-select')
			this.input.setAttribute('id', 'input-select-3');
			document.getElementById('input-select-3').value = usuario._institution

			this.input = document.getElementById('input-select')
			this.input.setAttribute('id', 'input-select-4');
			document.getElementById('input-select-4').value = usuario._school		
	}
}

// **Funciones de miembros** //
document.getElementById('save-member').onclick = async(e) =>{
	const aux = document.getElementById('form-member').checkValidity()
		
	if(aux){
		e.preventDefault()
		var gender, country, scholar, institution, school
		const genders = document.getElementsByName('genero-member')
		genders.forEach(i => { if(i.checked) gender = i.value })
		if(!gender) gender = 'Sin definir'
		if(!document.getElementById('pais-member').value) country = 'Sin definir'
		else country = document.getElementById('pais-member').value
		if(!document.getElementById('escolaridad-member').value) scholar = 'Sin definir'
		else scholar = document.getElementById('escolaridad-member').value
		if(!document.getElementById('institucion-member').value) institution = 'Sin definir'
		else institution = document.getElementById('institucion-member').value
		if(!document.getElementById('escuela-member').value) school = 'Sin definir'
		else school = document.getElementById('escuela-member').value
		const data = new FormData()
		data.append('name', document.getElementById('nombre-member').value)
		data.append('tel', document.getElementById('tel-member').value)
		data.append('date', document.getElementById('fecha-member').value)
		data.append('country', country)
		data.append('scholar', scholar)
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
				renderMembers()
				cancelMember()
			} else{
				alert('No se pudo agregar tu integrante')
			}
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
				renderMembers()
				cancelMember()
			} else{
				console.log(JSON.status);
				
				alert('No se pudo actualizar la informacion')
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
    if(JSON.status === 404){
        return false 
    } else{
        return JSON
    }
}

async function cancelMember(){
	document.getElementById('nombre-member').value = ""
	document.getElementById('tel-member').value = ""
	document.getElementById('fecha-member').value = ""
	document.getElementById('pais-member').value = ""
	document.getElementById('escolaridad-member').value = ""
	document.getElementById('institucion-member').value = ""
	document.getElementById('escuela-member').value = ""
	document.getElementById('id-member').value = ""
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
			<div class="collapsible-header"><i class="icon icon-ghost-"></i>${miembro._name}</div>
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
							<span class="content">pa&iacute;s_</span>
						</label>
					</p>
					<p>
						<input type="text" autocomplete="off" value="${miembro._scholar}" disabled>
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
					<p class="btn-block">
						<input type="submit" onclick="deleteMember('${miembro._id}')" value="E L I M I N A R _">
						<input type="submit" onclick="updateMember('${miembro._id}')" value="E D I T A R _">
					</p>
					</form>

				
			</div>
			`
			membersContainer.appendChild(li)
		})
	}
}

async function updateMember(id){
	const res = await fetch(url+'/members/data/'+id)
	const JSON = await res.json()
	if(JSON.status === 404){
        alert('No se pudo conectar con el servidor')
    } else if(JSON.status === 401){
        console.log('No tiene autorizacion necesaria')
    } else{
		document.getElementById('add-member').click()
		document.getElementById('nombre-member').value = JSON._name
		document.getElementById('tel-member').value = JSON._tel
		document.getElementById('fecha-member').value = JSON._date
		document.getElementById('pais-member').value = JSON._country
		document.getElementById('escolaridad-member').value = JSON._scholar
		document.getElementById('institucion-member').value = JSON._institution
		document.getElementById('escuela-member').value = JSON._school
		document.getElementById('id-member').value = JSON._id
		document.getElementById('save-member').value = 'A c t u a l i z a r _'
	}
}

async function deleteMember(id){
	const res = await fetch(url+'/members/delete/'+id, {
		headers: { 'Content-Type': 'application/json' },
		method: 'DELETE'
	})	
	const JSON = await res.json()
	if(JSON.status == 200){
		alert('Tu integrante ha sido borrado')
		renderMembers()
		cancelMember()
	} else{
		alert('El integrante no pudo ser borrado')
	}
}

// **Funciones de robots** //
document.getElementById('save-robot').onclick = async(e) =>{
	const res = document.getElementById('form-robot').checkValidity()
	if(res){
		e.preventDefault()
		const data = new FormData()
		data.append('name', document.getElementById('nombre-robot').value.toLowerCase())
		data.append('category', document.getElementById('categoria').value)
		const res = await fetch(url+'/robots/create', {
			method: 'POST',
			body: data
		})
		const JSON = await res.json()
		if(JSON.status === 200){
			alert('Nuevo robot creado con exito')
			document.getElementById('add-robot').click()
			renderRobots()
			// cancelRobot()
		} else if(JSON.status === 400){
			alert('El nombre del robot ya esta en uso')
		} else{
			alert('No se pudo crear un nuevo robot')
		} 
	}
}

async function Robots(){
    const res = await fetch(url+'/robots/data')    
    const JSON = await res.json()
    if(JSON.status === 404){
        return false 
    } else{
        return JSON 
    }
}

// document.getElementById('select1').click = async(e) =>{ 
// 	const selector = document.getElementById('select1')
// 	const miembros = await Members()
// 	miembros.forEach(miembro => {
// 		const opcion = document.createElement("option")
// 		opcion.text = miembro._name
// 		opcion.value = miembro._id
// 		selector.add(opcion);
// 	})
// }

async function cancelRobot(){
	document.getElementById('nombre-robot').value = ""
	document.getElementById('categoria').value = ""
	document.getElementById('member1').value = ""
	document.getElementById('member2').value = ""
	document.getElementById('member3').value = ""
	document.getElementById('member4').value = ""
	document.getElementById('member5').value = ""
	document.getElementById('member6').value = ""
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
				<form action="">
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
					<input type="text" name="members" autocomplete="off" value="" disabled>
						<label class="label" for="members">
							<span class="content">integrantes_</span>
						</label>
					</p>
					<p class="btn-block">
						${boton1}
						${boton2}
					</p>
					</form>

				
			</div>
			`
			robotsContainer.appendChild(li)
		})
	}
}

async function registRobot(id){
	var opc = confirm('Una vez registrado ya no podras modificar tus datos ni los de tu equipo participante. ¿Desea continuar?')
	if(opc == true){
		const res = await fetch(url+'/robots/regist/'+id, {
			headers: { 'Content-Type': 'application/json' },
			method: 'PUT'
		})	
		const JSON = await res.json()
		if(JSON.status == 200){
			alert('Tu robot ha sido pre-registrado, ahora puedes aplicar descuentos y pagar en linea, o si lo prefieres presencialmente el dia del torneo')
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