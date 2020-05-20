const object = document.getElementById("listActivity");
const input = document.getElementById("Input");

window.onload = (event) => {
    if (typeof(Storage) !== "undefined") {
        object.innerHTML = localStorage.getItem("activity");
    }
}

function addToList(content) {
    const position = "beforeend";
    const text = `<li>
                    <div class = "uncheck iconcheck" onclick = "clickCheck(this)" ></div>
                    <p class = "incomplete item">${content}</p>
                    <div class = "remove iconremove" onclick = "clickRemove(this)"></div>
                </li>`;
    object.insertAdjacentHTML(position, text);
}

function processAddToList() {
    if (input.value == "") {
        alert("Xin vui lòng nhập activity");
        return;
    }
    addToList(input.value);
    input.value = "";
}

function clickRemove(element) {
    var cf = confirm("Bạn có muốn xóa activity này?");
    if (!cf) {
        return;
    }
    var div = element.parentElement.parentElement;
    div.removeChild(element.parentElement);
}

function clickCheck(element) {
    var str = element.getAttribute("class");
    var div = element.parentElement;
    var para = div.getElementsByClassName("item");
    var strComplete = para[0].getAttribute("class");
    if (str.search("uncheck") >= 0) {
        element.setAttribute("class", str.slice(2));
        para[0].setAttribute("class", strComplete.slice(2));
    } else {
        element.setAttribute("class", "un" + str);
        para[0].setAttribute("class", "in" + strComplete);
    }
}

function save() {
    var cf = confirm("Bạn có muốn lưu không?");
    if (!cf) {
        return;
    }
    localStorage.setItem("activity", object.innerHTML);
}

function reset() {
    var cf = confirm("Bạn có muốn reset không?");
    if (!cf) {
        return;
    }
    object.innerHTML = "";
    localStorage.clear();
}

input.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        processAddToList();
    }
})