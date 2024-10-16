document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];

    // Handle form submission
    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Stop page from refreshing

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        const newExpense = {
            id: Date.now(), // Create unique ID using current time
            name: name,
            amount: amount,
            category: category,
            date: date
        };

        expenses.push(newExpense); // Add new expense to the list
        displayExpenses(); // Update the list on the screen
        updateTotalAmount(); // Update total amount
        expenseForm.reset(); // Clear the form fields
    });

    // Handle clicks for Edit and Delete buttons
    expenseList.addEventListener("click", (event) => {
        const clickedButton = event.target;

        if (clickedButton.classList.contains("delete-btn")) {
            const expenseId = parseInt(clickedButton.dataset.id);
            expenses = expenses.filter(expense => expense.id !== expenseId); // Remove the expense
            displayExpenses();
            updateTotalAmount();
        }

        if (clickedButton.classList.contains("edit-btn")) {
            const expenseId = parseInt(clickedButton.dataset.id);
            const expenseToEdit = expenses.find(expense => expense.id === expenseId);

            // Fill the form with the existing expense details for editing
            document.getElementById("expense-name").value = expenseToEdit.name;
            document.getElementById("expense-amount").value = expenseToEdit.amount;
            document.getElementById("expense-category").value = expenseToEdit.category;
            document.getElementById("expense-date").value = expenseToEdit.date;

            // Remove the original expense so it can be updated when resubmitted
            expenses = expenses.filter(expense => expense.id !== expenseId);
            displayExpenses();
            updateTotalAmount();
        }
    });

    // Filter expenses by category
    filterCategory.addEventListener("change", () => {
        displayExpenses(); // Re-display expenses based on the selected category
    });

    // Display expenses on the screen
    function displayExpenses() {
        expenseList.innerHTML = ""; // Clear the current list

        const filteredExpenses = filterCategory.value === "All" ? expenses :
            expenses.filter(expense => expense.category === filterCategory.value);

        filteredExpenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row); // Add the new row to the table
        });
    }

    // Update the total expense amount
    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2); // Display the total
    }
});
