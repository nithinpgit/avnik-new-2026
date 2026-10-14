import React from 'react';

export default function EventCard({ event = {}, onOpen, onBookmark, variant = 'detailed' }) {
  const { title, images = [], startDate, location, price, rating } = event;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <button onClick={() => onOpen && onOpen(event)} className="block text-left w-full">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100">
          <img src={images[0] || '/assets/images/event-placeholder.jpg'} alt={title} className="object-cover w-full h-full" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-sm text-gray-500 mt-1">{new Date(startDate).toLocaleString()}</div>
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-600">{location || 'Online'}</div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{price ? `$${price}` : 'Free'}</div>
              <div className="text-xs px-2 py-1 bg-yellow-50 rounded">⭐ {rating || '—'}</div>
            </div>
          </div>
        </div>
      </button>
      <div className="p-3 border-t bg-gray-50 flex justify-end gap-2">
        <button onClick={(e) => { e.stopPropagation(); onBookmark && onBookmark(event); }} aria-label="Bookmark" className="text-sm px-3 py-1 rounded bg-white border">Bookmark</button>
      </div>
    </article>
  );
}
