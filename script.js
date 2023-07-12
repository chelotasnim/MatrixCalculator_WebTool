// Fitur Keamanan Source Inspection
document.onkeydown = function(e) {
    // Mengunci semua key combination untuk melihat source code
    if(event.keyCode == 123) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
       return false;
    }
}
// document.addEventListener(
//     'contextmenu', e => {
//         e.preventDefault();
//     }
// )

// Fitur UX Kalkulator
const selectedOp = document.querySelector('.operator-get');
const ghostOp = document.querySelector('.ghost-circle');
const opBox = document.querySelectorAll('.operator-box');
const usedOperator = document.querySelector('.used-operator p');
const verticalLine = document.querySelector('.line');
const pageBgr = document.querySelector('.page');
const indicator = document.querySelectorAll('.big-header');
let allHeight = parseInt(opBox[0].offsetHeight);
verticalLine.style.height = allHeight * 3 - 15 + 'px';
verticalLine.style.top = allHeight / 2 + 'px';

// Menentukan Operasi - UX Feature
opBox.forEach(selected => {
    selected.addEventListener(
        'mouseover', function() {
            const usedIndicator = document.querySelector('.big-header.used');
            let pos = selected.offsetTop + selected.offsetHeight / 2;
            ghostOp.style.top = pos - ghostOp.offsetHeight / 2 + 'px';   

            indicator.forEach(title => {
                if(title.id == selected.querySelector('p').textContent) {
                    usedIndicator.classList.remove('used');
                    title.classList.add('used');
                }
            });
        }
    )
    selected.addEventListener(
        'click', function() {
            const inputBaris = document.getElementById('baris');
            const ordoX = document.querySelector('.ordo-operator');
            const inUse = document.querySelector('.selected');
            inUse.classList.remove("selected");
            selected.classList.add("selected");
            usedOperator.textContent = selected.querySelector('p').textContent;
            let pos = selected.offsetTop + selected.offsetHeight / 2;
            selectedOp.style.top = pos - selectedOp.offsetHeight / 2 + 'px';

            if(usedOperator.textContent == '+' || usedOperator.textContent == '-') {
                inputBaris.previousElementSibling.textContent = 'Baris';
                document.getElementById('kolom').parentElement.style.display = 'flex';
                ordoX.style.display = 'block';
            } else {
                inputBaris.previousElementSibling.textContent = 'Ordo';
                document.getElementById('kolom').parentElement.style.display = 'none';
                ordoX.style.display = 'none';
                setGrid();
            };

            function backView() {
                document.querySelector('.content').classList.remove('det');
                document.getElementById('kolom').parentElement.classList.remove('hide');
                document.querySelector('.matrix-B').classList.remove('hide');
                usedOperator.parentElement.classList.remove('hide');
                document.querySelector('.matrix-A label').innerHTML = 'Matrix A';
            }

            if(usedOperator.textContent == '+') {
                pageBgr.style.filter = 'hue-rotate(180deg)';
                backView();
            } else if(usedOperator.textContent == '-') {
                pageBgr.style.filter = 'hue-rotate(-50deg)';
                backView();
            } else if(usedOperator.textContent == 'x') {
                pageBgr.style.filter = 'hue-rotate(250deg)';
                backView();
            } else {
                pageBgr.style.filter = 'hue-rotate(120deg)';
                document.querySelector('.content').classList.add('det');
                document.getElementById('kolom').parentElement.classList.add('hide');
                document.querySelector('.matrix-B').classList.add('hide');
                document.querySelector('.matrix-A label').innerHTML = 'Determinan A';
                usedOperator.parentElement.classList.add('hide');
            }
        }
    )
});

// Set Ordo Function
const setOrdo = document.querySelector('.set-ordo');
function setGrid() {
    const forSquare = document.querySelector('.selected p').textContent;
    if(forSquare == '+' || forSquare == '-') {
        // Custom Ordo untuk operasi penjumlahan dan pengurangan
        const inputBaris = document.getElementById('baris');
        const inputKolom = document.getElementById('kolom');
        const inputBox = document.querySelectorAll('.matrix-input');
        let jmlBaris = parseInt(inputBaris.value);
        let jmlKolom = parseInt(inputKolom.value);

        if(
            // Validasi Value NaN - Undefined - Null
            jmlBaris > 0 && jmlBaris <= 5 && jmlKolom > 1 && jmlKolom <=5 ||
            jmlBaris > 1 && jmlBaris <= 5 && jmlKolom > 0 && jmlKolom <=5
        ) {
            inputBox.forEach(box => {
                box.innerHTML = '';
                for( let i = 0; i < jmlBaris * jmlKolom; i++ ) {
                    const newInput = document.createElement('input');
                    newInput.setAttribute('type','number');
                    box.appendChild(newInput);
                }

                box.style.gridTemplateColumns = `repeat( ${jmlKolom}, 40px)`;
                box.style.gridTemplateRows = `repeat( ${jmlBaris}, 40px)`;
            });
        } else {
            window.location.reload();
        }
    } else {
        // Ordo Persegi untuk perkalian dan determinan
        const inputOrdo = document.getElementById('baris');
        const inputBox = document.querySelectorAll('.matrix-input');
        const jmlOrdo = parseInt(inputOrdo.value);

        // Validasi Value NaN - Undefined - Null
        if( jmlOrdo > 1 && jmlOrdo <= 5 ) {
            inputBox.forEach(box => {
                box.innerHTML = '';
                for( let i = 0; i < jmlOrdo * jmlOrdo; i++ ) {
                    const newInput = document.createElement('input');
                    newInput.setAttribute('type','number');
                    box.appendChild(newInput);
                }
        
                box.style.gridTemplateColumns = `repeat( ${jmlOrdo}, 40px)`;
                box.style.gridTemplateRows = `repeat( ${jmlOrdo}, 40px)`;
            });
        } else {
            window.location.reload();
        }
    }
}
window.addEventListener('load', setGrid, false)
setOrdo.addEventListener('click', setGrid, false);

// Result UX 
const indexCard = document.querySelector('.card');
const resultPage = document.querySelector('.result');
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener(
    'click', function() {
        indexCard.style.transform = 'scale(1)';
        resultPage.style.transform = 'scale(0)';
    }
)

// Calculate UX
const execute = document.querySelector('.execute');
execute.addEventListener(
    'click', btn => {
        const matriksA = document.querySelectorAll('.matrix-A input');
        const matriksB = document.querySelectorAll('.matrix-B input');
        const final = document.querySelectorAll('.matrix-C input');
        const allInput = document.querySelectorAll('.row input');
        const operasi = document.querySelector('.selected p').textContent;
        const inputOrdo = document.getElementById('baris');
        const jmlOrdo = parseInt(inputOrdo.value);
        final[0].parentElement.classList.remove('det');

        function returnVal(typeInput) {
            let newVal = [];
            let tempoVal = [];
            typeInput.forEach(toIndex => {
                tempoVal.push(parseInt(toIndex.value));
            });
            for(eIndex = 0; eIndex < tempoVal.length; eIndex += jmlOrdo) {
                newVal.push(tempoVal.slice(eIndex, eIndex + jmlOrdo));
            }

           return newVal;
        }
        let mA = new returnVal(matriksA);
        let mB = new returnVal(matriksB);

        final.forEach(res => {
            res.classList.remove('hide');
            res.classList.remove('det');
        });

        // Untuk operasi penjumlahan dan pengurangan dengan ordo custom
        if(operasi == '+' || operasi == '-') {            
            let mA = [];
            let mB = [];

            allInput.forEach(all => {
                if(all.value == '') {
                    window.location.reload();
                }
            });

            matriksA.forEach(a => {
                mA.push(parseInt(a.value));
            });

            matriksB.forEach(b => {
                mB.push(parseInt(b.value));
            });

            for(let eIndex = 0; eIndex < mA.length; eIndex++) {
                if(operasi == '+') {
                    final[eIndex].value = mA[eIndex] + mB[eIndex];
                };
                if(operasi == '-') {
                    final[eIndex].value = mA[eIndex] - mB[eIndex];
                }
            }
        } else if(operasi == 'x') {
            // Operasi perkalian untuk ordo persegi
            allInput.forEach(all => {
                if(all.value == '') {
                    window.location.reload();
                }
            });

            function multiply(mA, mB, mC)
            {
                let i, j, k;
                for (i = 0; i < jmlOrdo; i++) {
                    for (j = 0; j < jmlOrdo; j++) {
                        mC[i][j] = 0;
                        for (k = 0; k < jmlOrdo; k++)
                            mC[i][j] += mA[i][k] * mB[k][j];
                    }
                }
            }
            let mC = new Array(jmlOrdo);
            for (let k = 0; k < jmlOrdo; k++) {
                mC[k] = new Array(jmlOrdo);
            }

            multiply(mA, mB, mC);

            const showMultiply = finalRes => {
                const show = [];
                finalRes.forEach(subRes => {
                    subRes.forEach(num => {
                        show.push(num);
                    });
                });
                for(x = 0; x < show.length; x++) {
                    final[x].setAttribute('readonly', 'readonly');
                    final[x].value = show[x];
                }
                return show;
            }
            showMultiply(mC);
        } else {
            matriksA.forEach(all => {
                if(all.value == '') {
                    window.location.reload();
                }
            });

            final.forEach(res => {
                res.classList.add('hide');
                res.classList.add('det');
            });

            final[0].parentElement.classList.add('det');
            
            // Operasi determinan untuk ordo persegi                
            function det(mA) {
                if (mA.length == 2) {
                    return (mA[0][0] * mA[1][1]) - (mA[0][1] * mA[1][0]);
                }
                let result = 0;
                for (let i = 0; i < mA.length; i++) { 
                    result += Math.pow(-1, i) * mA[0][i] * det(deleteRowAndColumn(mA, i)); 
                }
                return result;
            }
                
            function deleteRowAndColumn(mA, index) {
                let temporary = [];
                for (let i = 0; i < mA.length; i++) {
                    temporary.push(mA[i].slice(0));
                } 
                temporary.splice(0, 1); 
                for (let i = 0; i < temporary.length; i++) {
                    temporary[i].splice(index, 1);
                } 
                return temporary;
            }

            final[0].classList.remove('hide');
            final[0].value = det(mA);
        }
        indexCard.style.transform = 'scale(0)';
        resultPage.style.transform = 'scale(1)';  
    }
)