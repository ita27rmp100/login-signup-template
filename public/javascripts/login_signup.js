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
    document.title = `NoFap | ${moods[indexMode].toUpperCase()}`
}
htmlForm()
// Verify Login/signup 
function VerifyLogIn(){
    $.ajax({
        url: `/logsign/login`,
        method: "POST",
        data: $("form").serialize(),
        success: function(res) {
            if (res.message === "wrong-password") $("form").append(`<span class="badge badge-danger">Wrong password!</span>`) ;
            else $("form").append(`<span class="badge badge-danger">This username doesn't exist</span>`);
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
            if (res.message === "taken") $("form").append(`<span class="badge badge-danger">This username is taken</span>`) 
            else if(res.message==="pw-cpw")  $("form").append(`<span class="badge badge-danger">Please confrim your password</span>`)
        },
        error: function() {
            alert("An error occurred.");
        }
    });
}



// edit on navbar according to title
$(document).ready(
    function(){
        $("label").addClass("btn p-3 col-6")
    }
)
