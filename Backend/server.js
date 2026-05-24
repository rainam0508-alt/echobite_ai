const express = require('express');
const cors = require("cors");
const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

let students = [ // Array of Multiple Objects
    { id: 1, name: "Fatima", Grade: "A" },
    { id: 2, name: "Areeba", Grade: "A+" },
    { id: 3, name: "Faryal", Grade: "B" }
]

// Request Type: Get, Post, Put, Delete  (HTTP VERB)


// Student data insert
app.post("/api/student", (req, res) => {

    const newStudent = {
        id: students.length + 1, // 3 + 1
        name: req.body.name,
        grade: req.body.grade
    }

    students.push(newStudent);

    res.json({
        success: true,
        data: students
    })

})

//list of students
app.get("/api/students", (req, res) => {
    res.json({
        success: true,
        data: students
    })
})

//Student get against Id 
app.get("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(x => x.id === id);
    res.json({
        success: true,
        data: student
    })
})


app.put("/api/student/:id", (req, res) => {

    const id = parseInt(req.params.id); // get Id from url param
    let studentIndex = students.find(x => x.id == id); // get student index from students

    if (studentIndex - 1) { // in case of not found the index
        res.json({
            success: false,
            msg: "Student Not found",
            data: {}
        })
    }

    // student object update
    students[studentIndex] = {
        id: req.params.id,
        name: req.body.name,
        grade: req.body.grade
    }

    // return response
    res.json({
        success: true,
        msg: "Student has been update Successfully!",
        data: students[studentIndex]
    })

})


app.delete("/api/student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = students.findIndex(x => x.id === id);

    if (studentIndex === -1) { // in case of not found the index
        res.json({
            success: false,
            msg: "Student Not found",
            data: {}
        })
    }

    const deleteStudent = students.splice(studentIndex, 1);// delete data from an array

    res.json({
        success: true,
        msg: "Student Deleted",
        data: deleteStudent[0]
    })
})



app.listen(PORT, () => {
    console.log("Server is running");
});

//romaisa
//nismat
//faryal
//rabiya
//ariba
//maryam bibi
//rida