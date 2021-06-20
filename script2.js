
var searchButton = document.getElementById('searchButton')
var inputText = document.getElementById('inputText')
var output = document.getElementById('output')
var badgeCount = document.getElementById('count')
var inputName = document.getElementById('name')
var inputUsername = document.getElementById('username')
var inputNamePrefix = document.getElementById('namePrefix')
var outputTableBody = document.getElementById('outputTableBody')
var submitData = document.getElementById('addButton')

function addDataToTable(index){
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('score',row)
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = inputName.value
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = inputName.value
    row.appendChild(cell)
    cell = document.createElement('td')
    //cell.innerHTML = inputNamePrefix.options[inputNamePrefix.selectedIndex].text
    row.appendChild(cell)
    outputTableBody.appendChild(row)
}

var index = 1
submitData.addEventListener('click',(event)=>{
   addDataToTable(index++)
})
function addStudentTotable(index,student){
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('score','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.studentId
    let img = document.createElement('img')
    img.setAttribute('src',student.image)
    img.height = 200
    img.classList.add('img-thumbnail')
    cell.appendChild(img)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gender
    row.appendChild(cell)
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText = 'delete'
    button.addEventListener('click',function() {
        let confirms = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if (confirms){
        deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    cell = document.createElement('td')
    let button2 = document.createElement('button')
    button2.classList.add('btn')
    button2.classList.add('btn-primary')
    button2.setAttribute('type','button2')
    button2.innerText = 'Edit'
    button2.addEventListener('click',function() {
        let confirms2 = confirm(`ท่านต้องการแก้ไขคุณ ${student.name} หรือไม่`)
        if (confirms2){
        singleStudentResult.style.display='none'
        listStudentResult.style.display='none'
        addUserDetail.style.display='block'
        upStudent(student.id)
        }
    })
    cell.appendChild(button2)
    row.appendChild(cell)
    row.appendChild(cell)
    tableBody.appendChild(row)
}  
function addStudentList(studentList){
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    // tableBody.innerHTML=''
    for(student of studentList){
        addStudentTotable(counter++,student)
    }
} 
function onLoad(){
    // fetch('https://dv-student-backend-2019.appspot.com/students')
    // .then((response) => {
    //     return response.json()
    // }).then(data => {
    //     addStudentList(data)
    // })
    
    hideAll()

    // showAllStudents()
}

function addStudent(){ 
    let studente = {} 
    studente.name = document.getElementById('nameInput').value 
    studente.surname = document.getElementById('surnameInput').value 
    studente.studentId = document.getElementById ('studentIdInput').value 
    studente.gpa = document.getElementById ('gpaInput').value 
    studente.image = document.getElementById ('imageLinkInput').value
    addStudentToDB(studente) 
}
document.getElementById('addButton').addEventListener('click',(event)=>{
    console.log('click')
    addStudent()
})

function addStudentData(student){
    singleStudentResult.style.display='block'
    listStudentResult.style.display='none'
    let idElem = document.getElementById('id') 
    idElem.innerHTML = student.id 
    let studentIdElem = document.getElementById ('studentID') 
    studentIdElem.innerHTML = student.studentIdElem
    let nameElem = document.getElementById('name') 
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById ('gpa') 
    gpaElem.innerHTML = student.gpa 
    let profileElem = document.getElementById('image') 
    profileElem.setAttribute ('src', student.image)
    
}

function addStudentToDB(student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(student)
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        console.log('success',data)
        showAllStudents()
    })
}

function deleteStudent (id) { 
    fetch( `https://dv-student-backend-2019.appspot.com/student/${id}`,{
         method: 'DELETE' 
    }).then(response => { 
        if (response.status === 200)
        { 
            return response.json() 
        }else{
             throw Error(response.statusText) }
    }).then(data =>
            { alert(`student name ${data.name} is now deleted`) 
            showAllStudents()
    }).catch( error => 
            { alert('your input student id is not in the database') 
    })
}

function upStudent(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(id)
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        console.log('success',data)
        showAllStudents()
    })
}

document.getElementById('searchButton').addEventListener('click', (event) =>{
    let id = document.getElementById('inputText').value
    if(id != null){
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then(response => {
        return response.json()
    }).then(student => {
        addStudentData(student)
    })
    }
    else{
        alert('Please input id')
    }
})

function showAllStudents(){
    fetch('https://dv-student-backend-2019.appspot.com/students')
    .then((response)=>{
        return response.json()
    }).then(data=>{
        console.log('success',data)
        addStudentList(data)
    })
}

var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')

function hideAll(){
    singleStudentResult.style.display='none'
    listStudentResult.style.display='none'
    addUserDetail.style.display='none'
}



document.getElementById('allStudentMenu').addEventListener('click', (event) => {
    hideAll()
    listStudentResult.style.display='block'
    showAllStudents()
})

document.getElementById('addStudentMenu').addEventListener('click', (event) => {
    hideAll()
    addUserDetail.style.display='block'
    
})