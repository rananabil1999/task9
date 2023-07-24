var nameInput = document.getElementById('bookmarkName');
var urlInput = document.getElementById('bookmarkURL');
var submitBtn = document.getElementById('submitBtn');

var tableContent = document.getElementById('tableContent')
var boxInfo = document.querySelector('.box-info')
var closeBtn = document.getElementById('closeBtn')

var bookMarks;

if (localStorage.getItem('bookMarks') == null) {
    bookMarks = [];
} else {
    bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
    display();
}

submitBtn.onclick = function () {
    if (isNameValid() && isUrlValid()) {
        var bookMark = {
            name: capitalize(nameInput.value),
            url: urlInput.value
        }
        bookMarks.push(bookMark)
        console.log(bookMarks)
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks))
        nameInput.classList.remove('is-valid')
        urlInput.classList.remove('is-valid')
        display();
        clearData();
    } else {
        boxInfo.classList.remove('d-none')
    }
}

function display() {
    var box = ''
    for (var i = 0; i < bookMarks.length; i++) {
        box += `
       <tr>
       <td>${i + 1}</td>
       <td>${bookMarks[i].name}</td>
       <td>
            <a href="https://${bookMarks[i].url}">
            <button class="btn btn-visit" onclick="visitFun(${i})">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
            </a>
       </td>
       <td>
            <button class="btn btn-delete pe-2" onclick="deleteFun(${i})">
                <i class="fa-solid fa-trash-can"></i>Delete
            </button>
        </td>
       </tr>
        `
    }
    tableContent.innerHTML = box;
}


function clearData() {
    nameInput.value = '';
    urlInput.value = ''
}


function deleteFun(index) {
    bookMarks.splice(index, 1);
    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    display();
}


var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function isNameValid() {
    if (nameRegex.test(nameInput.value)) {
        nameInput.classList.add('is-valid')
        nameInput.classList.remove('is-invalid')
        return true;
    } else {
        nameInput.classList.add('is-invalid')
        nameInput.classList.remove('is-valid')
        return false;
    }
}
nameInput.addEventListener('input', isNameValid)


function isUrlValid() {
    if (urlRegex.test(urlInput.value)) {
        urlInput.classList.add('is-valid')
        urlInput.classList.remove('is-invalid')
        return true;
    } else {
        urlInput.classList.add('is-invalid')
        urlInput.classList.remove('is-valid')
        return false;
    }
}


urlInput.addEventListener('input', isUrlValid)



function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

function closeInfoBox() {
    boxInfo.classList.add("d-none");
}

closeBtn.addEventListener('click', closeInfoBox)

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeInfoBox();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeInfoBox();
    }
});


