let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let currentFilter = "All";

function saveJobs() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function addJob() {
  const company = document.getElementById("company").value.trim();
  const role = document.getElementById("role").value.trim();
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;

  if (!company || !role || !date) {
    alert("Please fill all fields");
    return;
  }

  jobs.push({
    id: Date.now(),
    company,
    role,
    date,
    status
  });

  saveJobs();
  renderJobs();
  clearForm();
}

function clearForm() {
  document.getElementById("company").value = "";
  document.getElementById("role").value = "";
  document.getElementById("date").value = "";
}

function deleteJob(id) {
  jobs = jobs.filter(job => job.id !== id);
  saveJobs();
  renderJobs();
}

function filterJobs(status) {
  currentFilter = status;
  renderJobs();
}

function renderJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  let filteredJobs = currentFilter === "All"
    ? jobs
    : jobs.filter(job => job.status === currentFilter);

  filteredJobs.forEach(job => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${job.company}</td>
      <td>${job.role}</td>
      <td>${job.date}</td>
      <td><span class="status ${job.status}">${job.status}</span></td>
      <td><button class="delete" onclick="deleteJob(${job.id})">Delete</button></td>
    `;

    jobList.appendChild(row);
  });
}

renderJobs();
