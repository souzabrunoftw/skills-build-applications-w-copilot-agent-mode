import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';
const ENDPOINT = `${API_BASE}/leaderboard/`;
const MODAL_ID = 'leaderboardDetailsModal';

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const renderValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getColumns = (items) => {
    const keys = new Set();
    items.forEach((item) => {
      if (item && typeof item === 'object') {
        Object.keys(item).forEach((key) => keys.add(key));
      }
    });
    return Array.from(keys);
  };

  const fetchData = async () => {
    console.log('Fetching Leaderboard from', ENDPOINT);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ENDPOINT);
      const json = await response.json();
      console.log('Leaderboard response', json);
      const items = Array.isArray(json) ? json : json?.results ?? [];
      setData(items);
    } catch (err) {
      console.error('Leaderboard fetch error', err);
      setError(err.message || 'Fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getColumns(data);

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="h5 mb-1">Leaderboard</h2>
          <p className="endpoint-text mb-0">Endpoint: {ENDPOINT}</p>
        </div>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={fetchData} disabled={loading}>
          Refresh
        </button>
      </div>
      <div className="card-body">
        {loading && <div className="alert alert-info">Loading Leaderboard...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <>
            <p className="mb-3">Loaded {data.length} item{data.length === 1 ? '' : 's'}.</p>
            {data.length === 0 ? (
              <div className="alert alert-secondary">No Leaderboard data available.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      {columns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id ?? index}>
                        {columns.map((column) => (
                          <td key={column}>{renderValue(item[column])}</td>
                        ))}
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target={`#${MODAL_ID}`}
                            onClick={() => setSelectedItem(item)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <div className="modal fade" id={MODAL_ID} tabIndex="-1" aria-labelledby={`${MODAL_ID}Label`} aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${MODAL_ID}Label`}>Leaderboard details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <pre className="bg-light p-3 rounded">{selectedItem ? JSON.stringify(selectedItem, null, 2) : 'No item selected.'}</pre>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
