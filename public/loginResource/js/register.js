$(document).ready(function () {
    register()
});

function register() {
    const phoneNumberInputDiv = document.querySelector(".phonenumber-input-container")
    const phoneNumberInput = document.querySelector(".phonenumber-input")
    const passwordInput = document.querySelector(".password-input")
    const emailInput = document.querySelector(".email-input")
    const nameInput = document.querySelector(".name-input")
    const genderInput = document.querySelector(".gender-input")
    const dateOfBirthInput = document.querySelector(".dateOfBirth-input")




    $(".post-btn").click(function (e) {
        e.preventDefault();
        const phoneNumber = phoneNumberInput.value
        const password = passwordInput.value
        const email = emailInput.value
        const name = nameInput.value
        const gender = genderInput.value
        const dateOfBirth = dateOfBirthInput.value
        console.log(phoneNumber)
        $.ajax({
            type: "POST",
            url: "http://localhost:3333/api/users/register",
            data: {
                phonenumber: phoneNumber,
                password: password,
                email: email,
                name: name,
                gender: gender,
                dateOfBirth: dateOfBirth
            },
            dataType: "json",
            success: function (data) {
                successFunction(data)
            },
            error: function (data) {
                for (var errs of data.responseJSON.errors) {
                    console.log(phoneNumberInputDiv.setAttribute("data-validate", "số điện thoại không hợp lệ"))
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
            window.open('/client/login.html')
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