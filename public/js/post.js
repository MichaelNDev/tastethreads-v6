const update = document.querySelector("#edit")
const editField = document.querySelector(".hidden")

update.addEventListener("click", _ => {
    editField.classList.toggle("hidden")
})