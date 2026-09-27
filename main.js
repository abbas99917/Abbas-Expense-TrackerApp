const title = document.querySelector("#title");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const transactionForm = document.querySelector("#transactionForm");
const addBTN = document.querySelector("#add-btn")
const transactionList = document.querySelector("#transactionList");



const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const balance = document.querySelector("#balance");
const savings = document.querySelector("#savings");


let array = []

// localStorage
const saveDataLocalStorage = () =>{
    localStorage.setItem("Expense",JSON.stringify(array))
}

const getDataLocalStorage  =()=>{
    const data = JSON.parse(localStorage.getItem("Expense")) || [];
    array = data;
    DisplayRecordOnScreen();
    calculateSummary();
}

transactionForm.addEventListener("submit",(e)=>{

      e.preventDefault();

     const titleInput = title.value
     const amountInput = amount.value
     const typeInput = type.value
     const categoryInput = category.value;
     const dateInput = date.value
     // Form Validations
       if (titleInput === "" || amountInput === "" || dateInput === ""){
            alert("Please fill all required fields");
            return;
         }

       if (Number(amountInput) <= 0){
           alert("Amount must be greater than 0");
           return;
        }

       let obj = {
        id: Date.now(),
        title: titleInput,
        amount: amountInput,
        type: typeInput,
        category: categoryInput,
        date: dateInput,
    
  }
        array.push(obj)
        console.log(array)

        saveDataLocalStorage();
        DisplayRecordOnScreen();
        calculateSummary();
        transactionForm.reset();
})


// display record on secreen
const DisplayRecordOnScreen = () =>{

    transactionList.innerHTML = ""

    array.forEach((curVal)=>{
    transactionList.innerHTML += `     
    <div class="transaction">
        <div class="transaction-left">
          <div class="transaction-icon"><i class="fa-solid fa-sack-dollar"></i></div>

          <div>
            <h4>${curVal.title}</h4>
            <p>${curVal.category} · ${curVal.date}</p>
          </div>
        </div>

        <div class="transaction-right">
            <strong>${curVal.type === "expense" ? "-" : "+"}$${curVal.amount}</strong>
            <button class="delete" onclick="deleteNode(${curVal.id})"><i class="fa-solid fa-square-xmark"></i></button>
        </div>
      </div>`

    })

}


// deleteNode
const deleteNode = (id)=>{
     array = array.filter((curVal)=>{
        return curVal.id !== id;
    })
    saveDataLocalStorage();
    DisplayRecordOnScreen();
    calculateSummary();
}


// calculateSummary

const calculateSummary = () =>{

    let totalIncome = 0
    let totalExpence = 0;

    array.forEach((item)=>{
        if(item.type === "income"){
            totalIncome += Number(item.amount)
        }else{
            totalExpence  += Number(item.amount)
        }
    })

    const totalBalance  = totalIncome - totalExpence; 

    income.textContent  = `$${totalIncome.toFixed(2)}`
    expense.textContent = `$${totalExpence.toFixed(2)}`
    balance.textContent = `$${totalBalance.toFixed(2)}`
    savings.textContent =  `$${totalBalance.toFixed(2)}`

}
getDataLocalStorage();
