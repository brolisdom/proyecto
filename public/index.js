const url = 'http://localhost:3000/api'

document.getElementById('register').onclick = async(e) =>{
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
    } else{
        alert('Hubo un problema en el servidor')
    } 
}

document.getElementById('login').onclick = async(e) =>{
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const data = new FormData()
    data.append('email', email)
    data.append('password', password)
    const res = await fetch(url+'/users/signin', {
        method: 'POST',
        body: data
    })
    const JSON = await res.json()
    if(JSON.status === 200){
        window.location.replace('/dashboard.html')
    }
    else if(JSON.status === 400){
        alert('Los datos ingresados son incorrectos')
    } 
    else{
        console.log('Hubo un problema en el servidor')
    } 
}

// login con facebook y google