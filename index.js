async function getContent(){
    try {
        const response = await fetch('http://localhost:3002/')
        const data = await response.json()
        show(data)
    } catch (error) {
        console.error(error);
    }

}


async function returnData(user, password){
    var login = false
    try {
        const response = await fetch('http://localhost:3002/');
        const data = await response.json().then((res) => {
            for(i = 0; i < res.length; i++){
                if (user == res[i].username){
                    if(returnNumber(password) == returnNumber(res[i].address.geo.lat)){
                        console.log('login work');
                        return login = true
                    }
                    
                }
            }
        });
        
    } catch (error) {
        console.error(error)
    }
    return login
}



function returnNumber(password){
    let compare = password.split('');
    var passNumber = ''
    for(n = 0; n < compare.length; n++){
        if(Number.isInteger(Number(compare[n]))){
            passNumber += compare[n]
        }
    }
    
    return passNumber
}



function show(users){
    let output = '';
    for(let user of users){
        output += `<li> The name of user is ${user.name}</li>`
    }
    document.getElementById('text').innerHTML = output;
}

const loginInput = document.getElementById('input-user');
const passInput = document.getElementById('input-pass');



const buttonLogin = document.getElementById('button-login')
buttonLogin.addEventListener('click', () => {
    returnData(loginInput.value, passInput.value).then(login => {
        if(login == true){
            alert('Acesso concedido')
        } else{
            alert('Acesso negado')
        }
    })
    
})