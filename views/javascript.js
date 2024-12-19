const editBTN = document.getElementById("edit");
const updateForm = document.getElementById("updateForm");
editBTN.addEventListener("click", () => {
  if (updateForm.style.display === "none" || updateForm.style.display === "") {
    // Show the form
    updateForm.style.display = "block";
  } else {
    // Hide the form
    updateForm.style.display = "none";
  }
});
