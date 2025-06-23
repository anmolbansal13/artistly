"use client";


import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import mock_data from "../../public/MOCK_DATA.json";
import Header from "../../components/Header.jsx";

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    fee: "",
  });

  // Set initial filter based on URL parameter
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam
      }));
    }
  }, [categoryParam]);

  // { "id": 1, "first_name": "Maxi", "last_name": "Pach", "email": "mpach0@comcast.net", "category": "Dancer", "fee": 98075, "location": "Goa" }
  const artists = mock_data;

  const category = ["Singer", "Musician", "Dancer", "Speaker", "Actor", "DJ"];
  const locations_list = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredArtists = artists.filter((artist) => {
    const categoryMatch =
      !filters.category || artist.category === filters.category;
    const locationMatch =
      !filters.location || artist.location === filters.location;

    let feeMatch = true;
    if (filters.fee) {
      if (filters.fee === "25000") {
        feeMatch = artist.fee >= 1000 && artist.fee <= 25000;
      } else if (filters.fee === "50000") {
        feeMatch = artist.fee > 25000 && artist.fee <= 50000;
      } else if (filters.fee === "75000") {
        feeMatch = artist.fee > 50000 && artist.fee <= 75000;
      } else if (filters.fee === "100000") {
        feeMatch = artist.fee > 75000 && artist.fee <= 100000;
      }
    }
    return categoryMatch && locationMatch && feeMatch;
  });

  return (
    <div className="min-h-screen">
      <Header/>
      {/* Filters */}
      <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between px-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full md:w-48"
          >
            <option value="">All</option>
            {category.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full md:w-48"
          >
            <option value="">All</option>
            {locations_list.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fee Range</label>
          <select
            name="fee"
            value={filters.fee}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full md:w-48"
          >
            <option value="">No Limit</option>
            <option value="25000">₹1,000 - ₹25,000</option>
            <option value="50000">₹25,000 - ₹50,000</option>
            <option value="75000">₹50,000 - ₹75,000</option>
            <option value="100000">₹75,000 - ₹100,000</option>
          </select>
        </div>
      </section>

      {/* Artist Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredArtists.map((artist, index) => (
          <div key={artist.id} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">
              {artist.first_name + " " + artist.last_name}
            </h3>
            <p className="text-sm text-gray-600">Category: {artist.category}</p>
            <p className="text-sm text-gray-600">Location: {artist.location}</p>
            <p className="text-sm text-gray-600 mb-4">Fee: ₹{artist.fee}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Ask for Quote
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
