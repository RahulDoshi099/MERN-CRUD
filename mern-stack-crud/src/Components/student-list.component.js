import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import StudentTableRow from "./StudentTableRow";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/students/")
      .then(({ data }) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sorting = () => {
    console.log("coming here")
    const dataArr = students.sort((a, b) => (a.name > b.name ? 1 : -1));
    setStudents(dataArr);
  };
  const [sortvalue , setSortValue] =useState("")
  console.log(students);
  return (
    <>
      <div className="table-wrapper">
        <input
          type="search"
          placeholder="search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "15px" }}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={()=>{setSortValue("name")}}>
                Name
                
              </th>
              <th onClick={()=>{setSortValue("email")}}>Email</th>
              <th onClick={()=>{setSortValue("rollno")}}>Roll No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students

              .filter((user) => {
                return user.name.toLowerCase().includes(search?.toLowerCase());
              })
              .sort((a, b) => (a[sortvalue] > b[sortvalue] ? 1 : -1))
              .map((res, i) => {
                return <StudentTableRow obj={res} key={i} />;
              })}
          </tbody>
        </Table>
      </div>
          </>
  );
};

export default StudentList;
