import React from 'react';

export default function EventDetails({ event = {}, onBook }) {
  const { title, images = [], description, startDate, endDate, organizer, location, price } = event;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden">
            <img src={images[0] || '/assets/images/event-hero.jpg'} alt={title} className="w-full h-64 object-cover" />
          </div>
          <h1 className="text-2xl font-bold mt-4">{title}</h1>
          <div className="text-sm text-gray-600 mt-2">{new Date(startDate).toLocaleString()} — {new Date(endDate).toLocaleString()}</div>
          <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: description || '<p>No description</p>' }} />
          <section className="mt-6">
            <h2 className="text-lg font-semibold">Organizer</h2>
            <div className="text-sm text-gray-700">{organizer?.name || '—'}</div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="sticky top-24 bg-white p-4 rounded-md shadow-sm">
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-xl font-semibold mt-1">{price ? `$${price}` : 'Free'}</div>
            <button onClick={onBook} className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">Book now</button>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-semibold">Location</h3>
            <div className="text-sm text-gray-600 mt-1">{location || 'Online'}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
