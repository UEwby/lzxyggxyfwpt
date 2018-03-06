gotPage();
function gotPage() {
    var user = getUserInfo();
    if(user){
        window.location.href = './creditDynamics/creditDynamics.html';
    }else{
        window.location.href = './login/login.html';
    }
}