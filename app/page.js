// "use client"

import Link from "next/link";
import Header from '../components/Header.jsx';
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Header/>
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-12 px-4 bg-gradient-to-r from-blue-100 to-purple-100">
        <h2 className="text-4xl font-bold mb-4">Connect with Talented Artists</h2>
        <p className="text-lg mb-6 max-w-xl">Find singers, dancers, speakers, and DJs for your events and shows. Let's make your vision come alive!</p>
        <Link href="/artists">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700 transition">Explore Artists</button>
        </Link>
      </section>

      {/* Artist Categories */}
      <section className="py-12 px-4 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-8">Choose Artist Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          {['Singers', 'Dancers', 'Speakers', 'DJs'].map((category) => (
            <Link key={category} href={`/artists?category=${category === 'Singers' ? 'Singer' : category === 'Dancers' ? 'Dancer' : category === 'Speakers' ? 'Speaker' : 'DJ'}`}>
              <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
                <h4 className="text-xl font-bold mb-2">{category}</h4>
                <p className="text-gray-600 text-sm">Discover amazing {category.toLowerCase()} for your next event.</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
