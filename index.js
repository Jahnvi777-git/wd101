
let userEntries = [];

window.onload = function () {
    userEntries = [];  
    displayEntries(); 
}

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.getElementById('user-form').addEventListener('submit', function(event) {
    const dob = document.getElementById('dob').value;
    const errorMessage = document.getElementById('error-message');
    
    if (!dob) {
        errorMessage.textContent = "Please enter your date of birth.";
        event.preventDefault();
        return;
    }

    const age = calculateAge(dob);

    if (age < 18 || age > 55) {
        errorMessage.textContent = "Your age must be between 18 and 55 to register.";
        event.preventDefault();
    } else {
        errorMessage.textContent = "";
    }
});

const displayEntries = () => {
    const tableEntries = userEntries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions ? 'Yes' : 'No'}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `
    <table class="table-auto w-full">
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">Date of Birth</th>
            <th class="px-4 py-2">Accepted Terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
    
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };
    
    userEntries.push(entry); 
    displayEntries();       

    document.getElementById('user-form').reset();
}

document.getElementById('user-form').addEventListener('submit', saveUserForm);
