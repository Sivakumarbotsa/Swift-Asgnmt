import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';

import { saveState, loadState } from '../utils/persistState';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const toggleSort = (column) => {
    if (sortBy !== column) {
      setSortBy(column);
      setSortOrder('asc');
    } else {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  const getArrow = (column) => {
    if (sortBy !== column) return '▲▼';
    return sortOrder === 'asc' ? '▲' : '▼';
  };

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setSearchTerm(saved.searchTerm);
      setPage(saved.page);
      setPageSize(saved.pageSize);
      setSortBy(saved.sortBy);
      setSortOrder(saved.sortOrder);
    }
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())
      .then(data => {
        const mapped = data.map(item => ({ ...item, postId: item.postId || item.id }));
        setComments(mapped);
      });
  }, []);

  useEffect(() => {
    saveState({ page, pageSize, searchTerm, sortBy, sortOrder });
  }, [page, pageSize, searchTerm, sortBy, sortOrder]);

  const filtered = comments.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search) ||
      item.body.toLowerCase().includes(search)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy || !sortOrder) return 0;
   const valA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
    const valB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
    <Navbar userName="Swift" />

    <div className="dashboard-container">
      <div className="sort-controls">
        <button onClick={() => toggleSort('postId')}>
          Sort Post ID {getArrow('postId')}
        </button>
        <button onClick={() => toggleSort('name')}>
          Sort Name {getArrow('name')}
        </button>
        <button onClick={() => toggleSort('email')}>
          Sort Email {getArrow('email')}
        </button>
        <input
          type="text"
          placeholder="Search name, email, comment"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        data={paginated}
        onRowClick={(id) => navigate(`/profile/${id}`)}
      />
      <Pagination
        total={filtered.length}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
    </>
  );
};

export default Dashboard;