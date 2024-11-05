document.getElementById("maintenance-request-form").addEventListener("submit", submitRequest);
document.getElementById("add-tenant-form").addEventListener("submit", addTenant);

let requests = [];
let tenants = [];

// Function to submit a maintenance request
function submitRequest(event) {
    event.preventDefault();

    const request = {
        id: Date.now(),
        apartment: document.getElementById("tenant-apartment-number").value,
        area: document.getElementById("tenant-area").value,
        description: document.getElementById("tenant-description").value,
        photo: document.getElementById("tenant-photo").files[0] ? URL.createObjectURL(document.getElementById("tenant-photo").files[0]) : "",
        status: "pending",
        date: new Date().toLocaleString()
    };

    requests.push(request);
    displayRequests();

    // Clear the form inputs after submission
    document.getElementById("maintenance-request-form").reset();
}

// Function to display requests in the maintenance staff section
function displayRequests() {
    const list = document.getElementById("maintenance-requests-list");
    list.innerHTML = "";

    requests.forEach(request => {
        const requestDiv = document.createElement("div");
        requestDiv.innerHTML = `
            <p>Apartment: ${request.apartment}</p>
            <p>Area: ${request.area}</p>
            <p>Description: ${request.description}</p>
            <p>Status: ${request.status}</p>
            <button onclick="markCompleted(${request.id})">Mark as Completed</button>
        `;
        list.appendChild(requestDiv);
    });
}

// Function to mark a request as completed
function markCompleted(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) request.status = "completed";
    displayRequests();
}

// Function to filter requests (basic filtering example)
function filterRequests() {
    const apartmentNumber = document.getElementById("filter-apartment-number").value.trim();
    const area = document.getElementById("filter-area").value.trim().toLowerCase();
    const status = document.getElementById("filter-status").value;

    const filteredRequests = requests.filter(request => {
        const matchesApartment = apartmentNumber === "" || request.apartment === apartmentNumber;
        const matchesArea = area === "" || request.area.toLowerCase() === area;
        const matchesStatus = status === "" || request.status === status;

        return matchesApartment && matchesArea && matchesStatus;
    });

    displayFilteredRequests(filteredRequests);
}

// Function to display filtered requests
function displayFilteredRequests(filteredRequests) {
    const list = document.getElementById("maintenance-requests-list");
    list.innerHTML = "";

    if (filteredRequests.length === 0) {
        list.innerHTML = '<p>No matching requests found</p>';
        return;
    }

    filteredRequests.forEach(request => {
        const requestDiv = document.createElement("div");
        requestDiv.innerHTML = `
            <p>Apartment: ${request.apartment}</p>
            <p>Area: ${request.area}</p>
            <p>Description: ${request.description}</p>
            <p>Status: ${request.status}</p>
            <button onclick="markCompleted(${request.id})">Mark as Completed</button>
        `;
        list.appendChild(requestDiv);
    });
}

// Function to add a tenant
function addTenant(event) {
    event.preventDefault();

    const tenant = {
        id: Date.now(),
        name: document.getElementById("tenant-name").value,
        phone: document.getElementById("tenant-phone").value,
        email: document.getElementById("tenant-email").value,
        apartment: document.getElementById("tenant-apartment").value
    };

    tenants.push(tenant);
    displayTenants();

    // Clear the form inputs after adding a tenant
    document.getElementById("add-tenant-form").reset();
}

// Function to display tenants in the manager section
function displayTenants() {
    const list = document.getElementById("tenants-list");
    list.innerHTML = "";

    tenants.forEach(tenant => {
        const tenantDiv = document.createElement("div");
        tenantDiv.innerHTML = `
            <p>Name: ${tenant.name}</p>
            <p>Phone: ${tenant.phone}</p>
            <p>Email: ${tenant.email}</p>
            <p>Apartment: ${tenant.apartment}</p>
            <button onclick="removeTenant(${tenant.id})">Delete Tenant</button>
        `;
        list.appendChild(tenantDiv);
    });
}

// Function to remove a tenant
function removeTenant(tenantId) {
    tenants = tenants.filter(tenant => tenant.id !== tenantId);
    displayTenants();
}
