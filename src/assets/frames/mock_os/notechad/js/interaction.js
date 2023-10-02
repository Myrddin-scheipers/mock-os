let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
});
let submit = document.querySelector(".addtask button");
submit.addEventListener("click", function () {
    let input = form.querySelector("#todo");
    document.querySelector("#tasks").innerHTML += `<li><label><input type="checkbox"><div class="checkbox"></div>${input.value}</label><hr></li>`;
    form.reset();
    document.querySelector("#counter span").innerHTML = document.querySelectorAll("#tasks li").length;
})
document.querySelector("#btnComplete").addEventListener("click", function () {
    let completed = document.querySelectorAll("#tasks li label input:checked");
    for (i = 0; completed.length > i; i++) {
        completed[i].parentElement.parentElement.outerHTML = "";
        let done = document.querySelector("#done").innerHTML += completed[i].parentNode.innerText + "<br>";
    }
    document.querySelector("#counter span").innerHTML = document.querySelectorAll("#tasks li").length;
})
document.querySelector(".btn-more").addEventListener("click", function () {
    document.querySelector(".addtask").classList.toggle("hidden");
})
document.querySelector("#todo").addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector(".addtask button").click();
    }
});
document.querySelector(".btn-close").addEventListener("click", function(){
    document.querySelector(".addtask").classList.add("hidden");
})