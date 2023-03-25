function clearData() {
    document.getElementById("sexo").value = "masculino";
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
        if(input.type === "radio") {
            input.checked = false;
        }
    })
}