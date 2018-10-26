window.onload = init;

function init() {
    let todoList = {
        listHTML: document.getElementById("todoList"),
        listTask: [],
        add(task, priority = false) {
            let element = document.createElement("li");
            let tarea = document.createElement("p");
            tarea.innerText = task;
            element.appendChild(tarea);
            let deleteText = document.createElement("label");
            deleteText.innerText = "Eliminar?";
            element.appendChild(deleteText);
            let deleteBottom = document.createElement("input");
            deleteBottom.type = 'checkbox';
            element.appendChild(deleteBottom);
            let doneText = document.createElement("label");
            doneText.innerText = "Terminada?";
            element.appendChild(doneText);
            let doneBottom = document.createElement("input");
            doneBottom.type = 'checkbox';
            element.appendChild(doneBottom);

            // Añadir un boton para marcar de finalizado
            doneBottom.addEventListener("change", function () {
                if (this.checked) {
                    tarea.style.textDecoration = 'line-through';
                }
                else {
                    tarea.style.textDecoration = "none";
                }
            });

            // Elmine elemento de la lista
            deleteBottom.addEventListener("click", function(){
                if (this.checked) {
                    element.removeChild(tarea);
                    element.removeChild(doneBottom);
                    element.removeChild(doneText);
                    element.removeChild(deleteBottom);
                    element.removeChild(deleteText);
                    element.style.listStyle = 'none';
                }
             });
            
            if (priority) {
                this.listTask.unshift({
                    element,
                    task
                });
                this.listHTML.insertBefore(element, this.listHTML.childNodes[0]);
            } else {
                this.listTask.push({
                    element,
                    task
                });
                this.listHTML.appendChild(element);
            }
        }
    }

    let form = document.managerTask;
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let task = form.task.value;

        let validTask = /.{2,}/;
        if (!validTask.test(task)) {
            console.log("Ingrese una descripcion clara");
            return false;
        }

        todoList.add(task, form.important.checked);

    });
}
