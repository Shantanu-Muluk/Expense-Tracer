document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // Load expenses from local storage
    const loadExpenses = () => {
        expenseList.innerHTML = '';
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.forEach((expense, index) => addExpenseToDOM(expense, index));
    };

    // Save expenses to local storage
    const saveExpenses = (expenses) => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Add expense to DOM
    const addExpenseToDOM = (expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
        ${expense.amount} - ${expense.description} - ${expense.category}
        <div>
          <button class="btn btn-sm btn-warning me-2 edit-btn" data-index="${index}">Edit</button>
          <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
        expenseList.appendChild(li);
    };

    // Add expense
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('expense-amount').value;
        const description = document.getElementById('expense-description').value;
        const category = document.getElementById('expense-category').value;

        const newExpense = { amount, description, category };
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push(newExpense);
        saveExpenses(expenses);
        loadExpenses();
        expenseForm.reset();
    });

    // Delete or edit expense
    expenseList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        if (e.target.classList.contains('delete-btn')) {
            // Delete expense
            expenses.splice(index, 1);
            saveExpenses(expenses);
            loadExpenses();
        } else if (e.target.classList.contains('edit-btn')) {
            // Edit expense
            const expense = expenses[index];
            document.getElementById('expense-amount').value = expense.amount;
            document.getElementById('expense-description').value = expense.description;
            document.getElementById('expense-category').value = expense.category;

            // Remove the old entry
            expenses.splice(index, 1);
            saveExpenses(expenses);
            loadExpenses();
        }
    });

    // Initialize
    loadExpenses();
});
