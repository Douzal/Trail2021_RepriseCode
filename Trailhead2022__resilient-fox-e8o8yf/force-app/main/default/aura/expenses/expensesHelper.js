({
    createExpense: function(component, expense) {
        let theExpenses = component.get("v.expenses");
        // Copy the expense to a new object
        // THIS IS A DISGUSTING, TEMPORARY HACK
        let newExpense = JSON.parse(JSON.stringify(expense));

        // console.log("---Expenses before 'create':\n" + JSON.stringify(newExpense));
        console.log("Expenses before 'create':\n" + JSON.stringify(theExpenses));
        theExpenses.push(newExpense);
        component.set("v.expenses", theExpenses);
        console.log("Expenses after 'create':\n" + JSON.stringify(theExpenses));
    }
})