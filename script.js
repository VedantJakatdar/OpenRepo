//Auto-Populating data into table after adding, updating & deleting
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:8080/employees');
      const employees = await response.json();
      const tableBody = document.getElementById('employee-table-body');
      tableBody.innerHTML = ''; // Clear previous data
      employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.empId}</td>
          <td>${employee.firstName}</td>
          <td>${employee.lastName}</td>
          <td>${employee.emailId}</td>
          <td>
            <button onclick="editEmployee(${employee.empId})">Update</button>
            <button onclick="deleteEmployee(${employee.empId})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  });
  
  // Function to handle editing an employee
  function editEmployee(empId) {
    // Redirect to the employee edit form page with the employee ID
    window.location.href = 'employeeForm1.html?id=' + empId; 
  }


  // Function to handle deleting an employee
  async function deleteEmployee(empId) {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:8080/employees/${empId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Employee deleted successfully');
          location.reload();
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee. Please try again.');
      }
    }
  }