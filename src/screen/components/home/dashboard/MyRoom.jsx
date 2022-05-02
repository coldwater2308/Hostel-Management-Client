import React from 'react'
import { Table } from 'react-bootstrap';
export default function MyRoom() {
  return (
   <div className='My-room'>
      <h1>Room No.: 328 </h1> 
      
      <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Hostel Name</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Shubham </td>
      <td>Maurya</td>
      <td>119cs0034</td>
      <td>Kalam Hall</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Ramniwash</td>
      <td>Kumar</td>
      <td>119cs0007</td>
      <td>Kalam Hall</td>
      
    </tr>

  </tbody>
</Table>

   </div>
  )
}
