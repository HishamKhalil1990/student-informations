'use strict'
let savedData = [];
let idCounter = 0;
let form = document.getElementById('form');
let table = document.getElementById('table');
let total = document.getElementById('total');
function Student(name, email, mobile, age, tution) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.age = age;
    this.tution = tution;
    Student.allStudents.push(this);
}
Student.prototype.render = function () {
    let tr = document.createElement('tr');
    table.appendChild(tr);
    for (let i = 0; i < 6; i++) {
        let td = document.createElement('td')
        tr.appendChild(td);
        switch (i) {
            case 0:
                td.textContent = idCounter + 1;
                break;
            case 1:
                td.textContent = this.name;
                break;
            case 2:
                td.textContent = this.email;
                break;
            case 3:
                td.textContent = this.mobile;
                break;
            case 4:
                td.textContent = this.age;
                break;
            case 5:
                td.textContent = this.tution;
                break;
        }
    }
}
Student.allStudents = [];
form.addEventListener('submit', saveStudentData);
function saveStudentData(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let mobile = event.target.mobile.value;
    let tution = event.target.tuition.value;
    let splitedString = email.split('@ltuc.com');
    let name = splitedString[0];
    let age = randomAge(18, 24);
    new Student(name, email, mobile, age, tution);
    saveToLocalStorage();
    refreshPage();

}
function randomAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function saveToLocalStorage() {
    localStorage.setItem('allStudents', JSON.stringify(Student.allStudents));
}
function refreshPage() {
    if (table.firstChild !== null) {
        while (table.firstChild !== null) {
            table.removeChild(table.firstChild);
        }
    }
    let headRow = document.createElement('tr');
    table.appendChild(headRow);
    for (let i = 0; i < 6; i++) {
        let th = document.createElement('th')
        headRow.appendChild(th);
        switch (i) {
            case 0:
                th.textContent = 'id';
                break;
            case 1:
                th.textContent = 'name';
                break;
            case 2:
                th.textContent = 'email';
                break;
            case 3:
                th.textContent = 'mobile';
                break;
            case 4:
                th.textContent = 'age';
                break;
            case 5:
                th.textContent = 'tution';
                break;
        }
    }
    if (localStorage.getItem('allStudents') !== null)
        savedData = JSON.parse(localStorage.getItem('allStudents'));
    Student.allStudents = [];
    idCounter = 0;
    let totalTutions = 0;
    for (let i = 0; i < savedData.length; i++) {
        let name = savedData[i].name;
        let email = savedData[i].email;
        let mobile = savedData[i].mobile;
        let age = savedData[i].age;
        let tution = savedData[i].tution;
        new Student(name, email, mobile, age, tution)
        Student.allStudents[i].render();
        idCounter++;
        totalTutions += parseInt(tution);
    }
    total.textContent = `total is ${totalTutions}`
}
refreshPage();