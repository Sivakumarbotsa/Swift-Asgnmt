import React from 'react';

const Pagination = ({ total, page, setPage, pageSize, setPageSize }) => {
  const totalPages = Math.ceil(total / pageSize);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        &lt;
      </button>
      {pageNumbers.slice(0, 5).map((n) => (
        <button key={n} className={page === n ? 'active' : ''} onClick={() => setPage(n)}>
          {n}
        </button>
      ))}
      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        &gt;
      </button>
      <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
        {[10, 50, 100].map((size) => (
          <option key={size} value={size}>{size}/page</option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
