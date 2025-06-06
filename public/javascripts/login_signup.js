// selection bar 
let moods = ['login','signup'] , display = ['none','block'] , indexMode = 0

function htmlForm(){
    $(".sign").css('display',display[indexMode])
    $(".sign :input").prop("disabled",indexMode==0)

    $(".log").css('display',display[1-indexMode])
    $(".log :input").prop("disabled",indexMode==1)

    $("form").attr("action",`/logsign/${moods[indexMode]}`)
}
function toogleMood(){
    indexMode = 1-indexMode
    htmlForm()
    // chosen
    $(`#${moods[1-indexMode]}`).addClass('btn-light').removeClass('btn-dark')
    // replaced one
    $(`#${moods[indexMode]}`).addClass('btn-dark').removeClass('btn-light')
    document.title = `Template | ${moods[indexMode].toUpperCase()}`
}
htmlForm()
// Verify Login/signup 
    // function to add and remove the badge
function AddRemove(text){
    $("form").append(`<span class="badge badge-danger" id="notification" style="display:none;">${text}</span>`);
    $("#notification").fadeIn(500);
    setTimeout(() => {
        $("#notification").fadeOut(1500)
    },1500);
    
}
function VerifyLogIn(){
    $.ajax({
        url: `/logsign/login`,
        method: "POST",
        data: $("form").serialize(),
        success: function(res) {
            if (res.message === "wrong-password") AddRemove("Wrong password!") // $("form").append(`<span class="badge badge-danger">Wrong password!</span>`) ;
            else AddRemove("This username doesn't exist")  //$("form").append(`<span class="badge badge-danger">This username doesn't exist</span>`);
        },
        error: function() {
            alert("An error occurred.");
        }
    });
}
function VerifySignUp() {
    $.ajax({
        url: `/logsign/signup`,
        method: "POST",
        data: $("form").serialize(),
        success: function(res) {
            if (res.message === "taken") AddRemove("This username is taken") //$("form").append(`<span class="badge badge-danger">This username is taken</span>`) 
            else if(res.message==="pw-cpw") AddRemove("Please confrim your password")  //$("form").append(`<span class="badge badge-danger">Please confrim your password</span>`)
        },
        error: function() {
            alert("An error occurred.");
        }
    });
}
// prevent refreshing the page
document.getElementById("form").addEventListener("submit",function(e){
    e.preventDefault()
})

// edit on navbar according to title
$(document).ready(
    function(){
        $("label").addClass("btn p-3 col-6")
    }
)
