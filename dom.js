document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("student_Form");
    const tableBody = document.querySelector("#studentTable tbody");
    let students = JSON.parse(localStorage.getItem("students")) || [];//local storage create

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));//storing values as strings in local storage
    }
    //looping through each student and creating a row for each
    function renderTable() {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Reset</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>`;
            tableBody.appendChild(row);
        });
    }
    //Validation of each field and showing alerts for invalid input.
    function validateInput(name, id, email, contact) {
        const name_valid = /^[a-zA-Z ]+$/;
        const id_valid = /^\d+$/;
        const contact_valid= /^\d{10}$/;
        const email_valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name_valid.test(name)) return alert("Name must contain only letters.");
        if (!id_valid.test(id)) return alert("ID must be numeric.");
        if (!contact_valid.test(contact)) return alert("Contact must be 10 digits.");
        if (!email_valid.test(email)) return alert("Invalid email address.");
        return true;
    }
    //getting values and ensuring no field is empty
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();

        if (!name || !studentId || !email || !contact) {
            alert("All fields are required.");
            return;
        }

        if (!validateInput(name, studentId, email, contact)) return;

        students.push({ name, studentId, email, contact });
        saveToLocalStorage();
        renderTable();
        form.reset();
    });
    //resetting the student data
    window.editStudent = function (index) {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        renderTable();
        saveToLocalStorage();
    };
    //deleting the student data
    window.deleteStudent = function (index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    };

    renderTable();// showing the saved data after page reload
});
