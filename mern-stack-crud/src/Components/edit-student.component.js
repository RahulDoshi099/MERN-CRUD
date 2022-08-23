import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import { useParams } from 'react-router-dom'


const EditStudent = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });
  const { id } = useParams()

  const onSubmit = (studentObject) => {
    axios
      .put(
        "http://localhost:4000/students/update-student/" +
        id,
        studentObject
      )
      .then((res) => {
        if (res === 200) {
          alert("student successfully updated ");
          props.history.push("/student-list");
        } else Promise.reject();
      })
      .catch((err) => alert("somthing went wrong"));
  };

  // Load data from server and reinitialize student form

  useEffect(() => {
    axios.get("http://localhost:4000/students/edit-student/" + id)
    .then((res)=>{
        const { name, email, rollno} = res.data;
        setFormValues({ name, email, rollno })
    })
    .catch((err)=> console.log(err))
  }, []);
  return <div>
      <StudentForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize>
      Update Student
      </StudentForm>
  </div>;
};

export default EditStudent;
