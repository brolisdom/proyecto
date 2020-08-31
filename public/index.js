const url = '/api'

async function checkUser(){ 
    const res = await fetch(url+'/users')
    const JSON = await res.json()
    if(JSON.status === 201 || JSON.status === 200) window.location.replace('/dashboard.html')
}

document.addEventListener('DOMContentLoaded', () =>{
	checkUser()
})

document.getElementById('register').onclick = async(e) =>{
    const res = document.getElementById('form').checkValidity()
    if(res){
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const data = new FormData()
        data.append('email', email)
        data.append('password', password)
        const res = await fetch(url+'/users/signup', {
            method: 'POST',
            body: data
        })
        const JSON = await res.json()
        if(JSON.status === 200){
            alert('Registro exitoso, confirme su correo porfavor')
        } else if(JSON.status === 400){
            alert('El correo ya esta asociado con otra cuenta')
        } else alert('Hubo un problema en el servidor')
    }
}

document.getElementById('login').onclick = async(e) =>{
    const res = document.getElementById('form').checkValidity()
    if(res){
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const data = new FormData()

        data.append('email', email)
        
        const pre = await fetch(url+'/users/login', {
            method: 'POST',
            body: data
        })
        
        const PRE = await pre.json()

        if(PRE.status == 200){
            data.append('password', password)
            const res = await fetch(url+'/users/signin', {
                method: 'POST',
                body: data
            })
            
            const JSON = await res.json()

            if(JSON.status === 200){
                window.location.replace('/dashboard.html')
            } else if(JSON.status === 400){
                alert('La contraseña ingresado es incorrecta')
            } else{
                alert('No se pudo conectar con el servidor')
            }
        } else if(PRE.status == 401){
            alert('Tu usuario ha sido inhabilitado temporalmente') 
        } else if(PRE.status == 403){
            alert('Tu usuario aun no ha sido verificado')
        } else if(PRE.status == 404){
            alert('El correo ingresado no esta registrado')
        } else alert('No se pudo conectar con el servidor')

    }
}

// login con facebook y google