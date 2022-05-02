import { Table } from '@mui/material'
import React from 'react'

function Staff() {
  return (
    <div className='staff' style={{"width":"100%","background":"#fff","height":"80vh","alignItems":"self-start"}}>
    <Table >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead> 
      <tbody>
        <tr>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
        </tr>
        <tr>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
          <td>Hello</td>
        </tr>
      </tbody>
    </Table>



    </div>
  )
}

export default Staff