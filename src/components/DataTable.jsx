import React from 'react';

const DataTable = ({ data, onRowClick }) => {
  return (
    <table className="data-table">
  <thead>
    <tr>
      <th>Post ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item.id} onClick={() => onRowClick(item.postId)}>
        <td>{item.postId}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.body}</td>
      </tr>
    ))}
  </tbody>
</table>

  );
};

export default DataTable;
