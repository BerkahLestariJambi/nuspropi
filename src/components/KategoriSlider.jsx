const kategoriList = [
  'Cluster',
  'Rumah Subsidi',
  'Villa',
  'Kontrakan',
  'Kost',
  'Lainnya',
];

export default function KategoriSlider({ onSelect }) {
  return (
    <div style={{ overflowX: 'auto', display: 'flex', padding: '1rem 0.5rem', gap: '1rem' }}>
      {kategoriList.map((kategori) => (
        <button
          key={kategori}
          onClick={() => onSelect(kategori)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            border: '1px solid #ccc',
            whiteSpace: 'nowrap',
          }}
        >
          {kategori}
        </button>
      ))}
    </div>
  );
}
 
