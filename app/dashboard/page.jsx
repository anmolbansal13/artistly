"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import mock_data from "../../public/MOCK_DATA.json";

export default function ManagerDashboard() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    let allArtists = [];

    // Add localStorage data first
    const data = localStorage.getItem("artistFormData");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const artistList = Array.isArray(parsed) ? parsed : [parsed];
        allArtists = [...artistList];
      } catch (err) {
        console.error("Error parsing artist data:", err);
      }
    }

    // Add mock data second
    if (mock_data && Array.isArray(mock_data)) {
      const transformedMockData = mock_data.map((artist) => ({
        name: `${artist.first_name} ${artist.last_name}`,
        category: artist.category,
        location: artist.location,
        fee: artist.fee,
        id: artist.id,
        email: artist.email,
      }));
      allArtists = [...allArtists, ...transformedMockData];
    }

    setArtists(allArtists);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Manager Dashboard</h2>
        {artists.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm md:text-base table-auto border">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 md:p-3 border">Name</th>
                  <th className="p-2 md:p-3 border">Category</th>
                  <th className="p-2 md:p-3 border">Location</th>
                  <th className="p-2 md:p-3 border">Fee (₹)</th>
                  <th className="p-2 md:p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist, index) => (
                  <tr
                    key={artist.id || index}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-2 md:p-3 border">{artist.name}</td>
                    <td className="p-2 md:p-3 border">{artist.category}</td>
                    <td className="p-2 md:p-3 border">{artist.location}</td>
                    <td className="p-2 md:p-3 border">₹{artist.fee}</td>
                    <td className="p-2 md:p-3 border">
                      <button className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded hover:bg-blue-700 text-xs md:text-sm">
                        Ask for Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
