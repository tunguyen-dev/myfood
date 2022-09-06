$(document).ready(function () {
    login()
});

function login() {
    const phoneNumberInput = document.querySelector(".phonenumber-input")
    const passwordInput = document.querySelector(".password-input")
    $(".post-btn").click(function (e) {
        e.preventDefault();
        const phoneNumber = phoneNumberInput.value
        const password = passwordInput.value
        $.ajax({
            type: "POST",
            url: "http://localhost:3333/api/users/login",
            data: {
                phonenumber: phoneNumber,
                password: password
            },
            dataType: "json",
            success: function (data) {
                successFunction(data)
                localStorage.setItem('accessToken', data.accesstoken);
            },
            error: function (data) {
                for (var errs of data.responseJSON.errors) {
                    errorFunction(errs.msg)
                }
            }
        });
    });

}

// ------toast---------------
import toast from "../../toastResource/toast.js"
function successFunction(data) {
    if (data.status) {
        toast({
            title: 'Success',
            message: `${data.msg}`,
            type: 'Success'
        })
        setTimeout(function () {
            window.close()
            window.open('/client/index.html')
        }, 1500)
    }
}
function errorFunction(message) {
    toast({
        title: 'Error',
        message: `${message}`,
        type: 'Error'
    })
}