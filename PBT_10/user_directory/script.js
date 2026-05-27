const usersContainer =
    document.getElementById("usersContainer");

const loading =
    document.getElementById("loading");

const toast =
    document.getElementById("toast");

const searchInput =
    document.getElementById("searchInput");

const userForm =
    document.getElementById("userForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

let users = [];

let editingId = null;


// ======================================
// API LAYER
// ======================================

const api = {

    baseURL:
        "https://jsonplaceholder.typicode.com",

    async getUsers(){

        const response = await fetch(
            `${this.baseURL}/users`
        );

        if(!response.ok){
            throw new Error("Failed to fetch users");
        }

        return await response.json();

    },

    async getUser(id){

        const response = await fetch(
            `${this.baseURL}/users/${id}`
        );

        if(!response.ok){
            throw new Error("Failed to fetch user");
        }

        return await response.json();

    },

    async createUser(data){

        const response = await fetch(
            `${this.baseURL}/users`,
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)
            }
        );

        if(!response.ok){
            throw new Error("Create failed");
        }

        return await response.json();

    },

    async updateUser(id,data){

        const response = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)
            }
        );

        if(!response.ok){
            throw new Error("Update failed");
        }

        return await response.json();

    },

    async deleteUser(id){

        const response = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"DELETE"
            }
        );

        if(!response.ok){
            throw new Error("Delete failed");
        }

        return true;

    }

};


// ======================================
// UI LAYER
// ======================================

const ui = {

    renderUsers(usersData){

        usersContainer.innerHTML = "";

        usersData.forEach(user => {

            const card =
                document.createElement("div");

            card.className = "user-card";

            card.innerHTML = `
                <h3>${user.name}</h3>

                <p>${user.email}</p>

                <div class="actions">

                    <button
                        class="edit-btn"
                        onclick="editUser(${user.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteUser(${user.id})"
                    >
                        Delete
                    </button>

                </div>
            `;

            usersContainer.appendChild(card);

        });

    },

    showLoading(){

        loading.classList.remove("hidden");

    },

    hideLoading(){

        loading.classList.add("hidden");

    },

    showError(message){

        toast.className = "error";

        toast.innerText = message;

        toast.style.display = "block";

        setTimeout(() => {

            toast.style.display = "none";

        },3000);

    },

    showSuccess(message){

        toast.className = "success";

        toast.innerText = message;

        toast.style.display = "block";

        setTimeout(() => {

            toast.style.display = "none";

        },3000);

    }

};


// ======================================
// LOAD USERS
// ======================================

async function loadUsers(){

    ui.showLoading();

    try{

        users = await api.getUsers();

        ui.renderUsers(users);

    }
    catch(error){

        ui.showError(error.message);

    }
    finally{

        ui.hideLoading();

    }

}

loadUsers();


// ======================================
// CREATE + UPDATE
// ======================================

userForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userData = {

        name:nameInput.value,

        email:emailInput.value

    };

    try{

        // UPDATE
        if(editingId){

            const updatedUser =
                await api.updateUser(
                    editingId,
                    userData
                );

            users = users.map(user =>

                user.id === editingId
                    ? updatedUser
                    : user

            );

            ui.showSuccess("User updated");

            editingId = null;

        }

        // CREATE
        else{

            const newUser =
                await api.createUser(userData);

            users.unshift({
                ...newUser,
                id:Date.now()
            });

            ui.showSuccess("User created");

        }

        ui.renderUsers(users);

        userForm.reset();

    }
    catch(error){

        ui.showError(error.message);

    }

});


// ======================================
// EDIT USER
// ======================================

async function editUser(id){

    try{

        const user = await api.getUser(id);

        nameInput.value = user.name;

        emailInput.value = user.email;

        editingId = id;

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }
    catch(error){

        ui.showError(error.message);

    }

}


// ======================================
// DELETE USER
// ======================================

async function deleteUser(id){

    const confirmDelete =
        confirm("Bạn có chắc muốn xóa?");

    if(!confirmDelete) return;

    try{

        await api.deleteUser(id);

        users = users.filter(user =>
            user.id !== id
        );

        ui.renderUsers(users);

        ui.showSuccess("User deleted");

    }
    catch(error){

        ui.showError(error.message);

    }

}


// ======================================
// SEARCH
// ======================================

searchInput.addEventListener("input", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const filteredUsers =
        users.filter(user =>

            user.name
                .toLowerCase()
                .includes(keyword)

            ||

            user.email
                .toLowerCase()
                .includes(keyword)

        );

    ui.renderUsers(filteredUsers);

});