import { useState } from 'react';

export default function ProductSearch({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <input
        type="text"
        placeholder="Cari judul atau lokasi..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button type="submit" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Cari
      </button>
    </form>
  );
}
 
