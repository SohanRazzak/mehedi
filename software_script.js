let yearEl = document.getElementById("year"),
    themeBtn = document.querySelector("#themeButton");
const body = document.body,
    numRegex = /[^\d.-]/g;
let totalAmount = document.querySelector("#total-amount"),
    userAmount = document.querySelector("#user-amount");
const checkAmountBtn = document.querySelector("#check-amount"),
    totalAmountBtn = document.querySelector("#total-amount-btn"),
    productTitle = document.querySelector("#product-title"),
    errorMessage = document.querySelector("#budget-error"),
    inputEl = document.querySelectorAll(".input"),
    productTitleError = document.querySelector("#product-title-error");
let amount = document.querySelector("#amount");
const expenditureValue = document.querySelector("#expenditure-value"),
    balanceValue = document.querySelector("#balance-amount"),
    increaseBudget = document.querySelector("#add-budget"),
    list = document.querySelector("#list"),
    listDisplay = document.querySelector(".list");
let tempBalance, tempIncrease, calBalance, calExpense, tempAmount = 0,
    savedExpenseListArr = [],
    currencySym = "₦";
const sayHelloId = document.getElementById("say-hello");
let themeText = document.querySelector("#theme-text"),
    pill = document.querySelector(".pill.pill-it"),
    savedTheme = localStorage.getItem("saveTheme"),
    savedName = localStorage.getItem("gameName");
var savedExpenses = getSavedItem("savedExpense");
let checkSavedAmount = getSavedItem("savedAmount");
var savedExpenseList = getSavedItem("myarr");
let year = (new Date).getFullYear();

function addSwitchIcon() {
    themeBtn.classList.add("switch-border"), setTimeout((() => {
        themeBtn.classList.remove("switch-border")
    }), 1500)
}

function sayHello() {
    let e, t = new Date,
        a = t.getHours(),
        n = t.getMinutes(),
        r = t.getSeconds();
    return n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), e = a < 12 ? "Good Morning" : a < 16 ? "Good Afternoon" : "Good Evening", e
}




function addComma(e) {
    var t = e.toString().split(".");
    const a = t[0],
        n = t[1];
    return a.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (n ? "." + n : "")
}
yearEl.textContent = year, savedTheme && (body.className = savedTheme), savedName && void 0 !== savedName ? (sayHelloId.textContent = `Welcome ${savedName}`, setTimeout((() => {
    sayHelloId.textContent = `${sayHello()} ${savedName}`
}), 1e4)) : sayHelloId.textContent = `${sayHello()}`, addSwitchIcon(), themeBtn.addEventListener("click", (function() {
    let e;
    window.innerWidth < 637 && (sayHelloId.style.display = "none"), !0 == !this.disabled ? ("light" === body.getAttribute("class") ? (e = "dark", addSwitchIcon(), this.classList.add("right"), body.classList.remove("light")) : "dark" === body.getAttribute("class") && (e = "light", addSwitchIcon(), this.classList.remove("right"), body.classList.remove("dark")), pill.style.display = "none", localStorage.setItem("saveTheme", e), disableBtn(themeBtn, !0), themeText.textContent = e, body.classList.toggle(e), setTimeout((() => {
        pill.style.display = "none", disableBtn(this, !1), sayHelloId.style.display = "none"
    }), 3050)) : customMsg("Switch disabled", 1300)
})), disableBtn(checkAmountBtn, !0), disableBtn(productTitle, !0), disableBtn(userAmount, !0), null != checkSavedAmount && updateValues(), totalAmountBtn.addEventListener("click", (() => {
    if (tempAmount = totalAmount.value, "" === tempAmount || tempAmount < 1) errorMessage.textContent = tempAmount < 1 && "" !== tempAmount ? `Budget can't be "${tempAmount}"` : "Budget cannot be empty", errorMessage.classList.remove("hide");
    else {
        errorMessage.classList.add("hide"), totalAmountBtn.textContent = "New Budget", amount.textContent = currencySym + addComma(tempAmount), saveArrOnly("savedAmount", tempAmount), disableBtn(checkAmountBtn, !1), disableBtn(productTitle, !1), disableBtn(userAmount, !1), tempBalance = tempAmount - parseInt(expenditureValue.textContent.replace(numRegex, "")), balanceValue.textContent = currencySym + addComma(tempBalance), totalAmount.value = "", amount.textContent.replace(/[^0-9]/g, "") > 0 && increaseBudget.classList.remove("hide")
    }
})), inputEl.forEach((e => {
    e.onfocus = () => {
        errorMessage.classList.add("hide"), productTitleError.classList.add("hide")
    }, e.value && productTitleError.classList.add("hide")
}));


var parentDiv;
const modifyElement = (e, t = !1) => {
    parentDiv = e.parentElement;
    let a = balanceValue.textContent.replace(numRegex, ""),
        n = expenditureValue.textContent.replace(numRegex, ""),
        r = parentDiv.querySelector(".amount").textContent.replace(numRegex, "");
    if (t) {
        let e = parentDiv.querySelector(".product").textContent;
        productTitle.value = e, userAmount.value = r, setTimeout(disableBtns(!0), 500)
    }
    let l = parseInt(a) + parseInt(r);
    balanceValue.textContent = currencySym + addComma(l), calExpense = parseInt(n) - parseInt(r), expenditureValue.textContent = currencySym + addComma(calExpense), saveArrOnly("savedBalance", l), saveArrOnly("savedExpense", calExpense), parentDiv.remove()
};
let listCreator = function(e, t, a) {
    let n = document.createElement("div");
    n.id = a, n.classList.add("sublist-content", "flex-space"), list.appendChild(n);
    let r = t;
    n.innerHTML = `\n    <p class="product">${e}</p>\n    <p class="amount"><b>${currencySym}</b>${addComma(r)}</p>\n    `;
    let l = document.createElement("button");
    l.title = "Edit List", l.classList.add("fa-solid", "fa-pen-to-square", "edit"), l.style.fontSize = "24px";
    let s = document.createElement("a");
    s.title = "Delete List", s.classList.add("fa-solid", "fa-trash-can", "delete"), s.style.fontSize = "24px", n.appendChild(l), n.appendChild(s), list.appendChild(n), s.addEventListener("click", (function(e) {
        modifyElement(s);
        let t = e.target.parentElement.id;
        savedExpenseListArr = savedExpenseListArr.filter((function(e) {
            return e.id !== t
        })), saveArrOnly("myarr", savedExpenseListArr)
    })), l.addEventListener("click", (function(e) {
        productTitleError.classList.add("hide");
        let t = e.target.parentElement.id;
        savedExpenseListArr = savedExpenseListArr.filter((function(e) {
            return e.id !== t
        })), saveArrOnly("myarr", savedExpenseListArr), modifyElement(l, !0)
    }))
};
const generateID = () => {
    let e = "",
        t = "[@678^#(ABC,F3qr.sIJKN_+}{:OPQRghi)jDEklm:~noGH=2pL*$Mtuvwx<STU1>5VW`XYZa4bcd&efyz09]";
    for (var a = 0; a < 12; a++) e += t.charAt(Math.floor(Math.random() * t.length));
    return e
};
var loadList = !0;

function disableBtn(e, t = !1) {
    return t ? (e.title = e === themeBtn ? "" : "Add Budget Amount first", e.disabled = !0, void e.classList.add("edit-true")) : t ? void 0 : (e.title = "", e.disabled = !1, void e.classList.remove("edit-true"))
}

function loadFilteredArr() {
    savedExpenseList && savedExpenseList.length > 0 && (savedExpenseListArr = savedExpenseList, filterArr(savedExpenseListArr).forEach((e => {
        listCreator(e.title, e.cost, e.id)
    })), listDisplay.classList.remove("hide"))
}

function filterArr(e) {
    return e.filter((({
        title: t
    }, a) => !e.includes(t, a + 1)))
}

function saveArrOnly(e, t) {
    localStorage.setItem(e, JSON.stringify(t))
}

function getSavedItem(e) {
    return JSON.parse(localStorage.getItem(e))
}
checkAmountBtn.addEventListener("click", (() => {
    if (!userAmount.value || !productTitle.value) return productTitleError.classList.remove("hide"), !1;
    let e = document.querySelectorAll(".product");
    if (Array.from(e).forEach((e => {
            productTitle.value.toLowerCase() === e.textContent.toLowerCase() ? (customMsg("Item Already Exist", 1e3), loadList = !1) : loadList = !0
        })), setTimeout(productTitle.focus(), 1e3), loadList) {
        var t = generateID();
        let e = parseInt(userAmount.value),
            a = parseInt(expenditureValue.textContent.replace(numRegex, "")) + e;
        expenditureValue.textContent = currencySym + addComma(a), calBalance = tempAmount - a, balanceValue.textContent = currencySym + addComma(calBalance), saveArrOnly("savedExpense", a), saveArrOnly("savedBalance", calBalance), disableBtns(!1), listDisplay.classList.remove("hide"), listCreator(productTitle.value.toUpperCase(), userAmount.value, t), savedExpenseListArr.push({
            title: productTitle.value.toUpperCase(),
            cost: parseInt(userAmount.value),
            id: t
        }), saveArrOnly("myarr", filterArr(savedExpenseListArr)), productTitle.value = "", userAmount.value = ""
    }
})), loadFilteredArr();