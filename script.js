const apiURL = 'http://localhost:3000/api/customers';
const userList = document.getElementById('user-list');
const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const userIdInput = document.getElementById('user-id');
const submitButton = document.getElementById('submit-button');

async function fetchUsers() {
  try {
    const response = await fetch(apiURL);
    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function renderUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'user-item';
    li.innerHTML = `
      <span><i class="fas fa-user"></i> ${user.name}</span>
      <div>
        <button class="edit-btn" onclick="editUser('${user._id}', '${user.name}')">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="delete-btn" onclick="deleteUser('${user._id}')">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `;
    userList.appendChild(li);
  });
}


async function addUser(user) {
  try {
    await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    fetchUsers();
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

async function updateUser(id, user) {
  try {
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    fetchUsers();
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function deleteUser(id) {
  try {
    await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
    fetchUsers();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

function editUser(id, name) {
  userIdInput.value = id;
  usernameInput.value = name;
  submitButton.textContent = 'Update User';
}

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = usernameInput.value.trim();
  const id = userIdInput.value;

  if (!name) return alert('Name is required');

  if (id) {
    updateUser(id, { name });
    submitButton.textContent = 'Add User';
  } else {
    addUser({ name });
  }

  userForm.reset();
  userIdInput.value = '';
});

document.addEventListener('DOMContentLoaded', fetchUsers);
