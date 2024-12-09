import React, { useEffect, useState } from "react";

const Dashboard = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resultsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://hn.algolia.com/api/v1/search?query=${searchTerm}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.hits || []);
        setFilteredData(result.hits || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      (item.title ||item.author ||item.author || "No Title").includes(searchTerm)
   
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page
  }, [searchTerm, data]);

  const indexOfLastItem = currentPage * resultsPerPage;
  const indexOfFirstItem = indexOfLastItem - resultsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / resultsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 mt-20 flex flex-col min-h-screen ">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto  overflow-x-hidden pb-20">
        {currentData.length > 0 ? (
          <ul className="space-y-3">
            {currentData.map((item) => (
              <li key={item.objectID} className="p-2 bg-gray-100 rounded shadow">
                 {item.title || "No Title"}
                
                <p className="text-sm text-gray-600">
                  Author: {item.author || "Unknown"} | Comments: {item.num_comments} | <a
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                 url: {item.url}
                </a> 
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>

      {/* Fixed Pagination Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md py-4 flex justify-between items-center px-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
