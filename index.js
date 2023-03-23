const form = document.getElementById('main_form');
const formCount = document.getElementById('count');
const level = document.getElementById('level');
let countDay = document.getElementById('count-day').value;
const popka = document.getElementById('popka');
let po = document.querySelector('.table');
let reset = document.getElementById("reset");
let inputCalc = document.getElementById('input-calc');
let day = 0;
let depcount = 0;
let depositIndex = '';
let depositLevel = '';
let dayRes = 0;
let mesRes = 0;
let result = 0;
let depNum = 2;
inputCalc.addEventListener('click', (e) => {
    e.preventDefault();
    depcount = formCount.value;
    checker(formCount);
    inputCalc.setAttribute("disabled", "disabled");
    reset.style.display = 'inline-block';
});
form.addEventListener('change', (e) => {
    depcount = formCount.value;
})

reset.addEventListener('click', (e) => {
    closeBtn();
});

formCount.addEventListener('input',
    function (e) {
        this.value = this.value.replace(/[^\d.]/g, '');
    }
)

function checker(count) {
    if (count.value < 500) count.value = 500;
    else if (count.value >= 500 && count.value <= 2999) {
        depositIndex = 1;
    } else if (count.value >= 3000 && count.value <= 9999) {
        depositIndex = 2;
    } else if (count.value >= 10000 && count.value <= 29999) {
        depositIndex = 3;
    } else if (count.value >= 30000 && count.value <= 59999) {
        depositIndex = 4;
    } else if (count.value >= 60000 && count.value <= 99999) {
        depositIndex = 5;
    } else if (count.value >= 100000) {
        depositIndex = 6;
    }
    calc(+count.value, +depositIndex, +depositLevel);
}


function calc(invest, count) {
    return DepositCalc(invest, count);
}

function DepositCalc(invest, depIndex) {
    switch (depIndex) {
        case 1:
            calcProfit(invest, 0.8, depIndex);
            break;
        case 2:
            calcProfit(invest, 0.95, depIndex);
            break;
        case 3:
            calcProfit(invest, 1.15, depIndex);
            break;
        case 4:
            calcProfit(invest, 1.5, depIndex);
            break;
        case 5:
            calcProfit(invest, 1.85, depIndex);
            break;
        case 6:
            calcProfit(invest, 2.25, depIndex);
            break;
        default:
            break;
    }
}
let depIndexObj = {
    1: "0.8",
    2: "0.95",
    3: "1.15",
    4: "1.50",
    5: "1.85",
    6: "2.25",
};
let precentTotal = 0;
function calcProfit(invest, percent) {
    precentTotal = percent;
    po.style.display = 'block';
    day = +document.getElementById('count-day').value;
    let deposito = +invest;
    for (let i = 0; i < +day; i++) {
        if (deposito >= 3000) {
            precentTotal = depIndexObj[2];
            if (deposito >= 10000) {
                precentTotal = depIndexObj[3];
                if (deposito >= 30000) {
                    precentTotal = depIndexObj[4];
                    if (deposito >= 60000) {
                        precentTotal = depIndexObj[5];
                        if (deposito >= 100000) {
                            precentTotal = depIndexObj[6];
                        }
                    }
                }
            }
        }

        dayRes = (deposito * ((precentTotal * 1) / 100));
        deposito = (deposito + dayRes);
        Otris(i + 1, +precentTotal, dayRes.toFixed(2), deposito.toFixed(2));
    }
    formCount.value = deposito.toFixed(2);
}

function Otris(day, prec, prof, total) {
    popka.innerHTML +=
        `
        <tr>
            <td>${day}</td>
                <td>${prec}<span>%</span></td>
                <td><span>$</span>${prof}</td>
                <td><span>$</span>${total}</td>
            </tr>
        `
        ;
}

function closeBtn() {
    inputCalc.removeAttribute("disabled");
    reset.style.display = 'none';
    formCount.value = 500;
    popka.innerHTML = '';
    po.style.display = 'none';
    countDay = 150;
};
