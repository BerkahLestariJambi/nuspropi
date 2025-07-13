// src/components/ProductList.jsx
import { frameClass } from '../utils/style';
import { Link } from 'react-router-dom';

export default function ProductList({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-sm">
        Belum ada properti tersedia.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((product) => {
        const isBaru =
          new Date() - new Date(product.created_at) < 7 * 24 * 60 * 60 * 1000;

        const thumbnail = Array.isArray(product.photos) && product.photos.length > 0
          ? product.photos[0]
          : '/products/default.png';

        return (
          <div
            key={product.uuid}
            className={`${frameClass} overflow-hidden relative`}
          >
            {isBaru && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full z-10">
                Baru 🎉
              </span>
            )}

            <img
              src={thumbnail}
              alt={product.title}
              className="w-full h-36 object-cover rounded-t"
            />

            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-green-600 font-bold text-sm mt-1">
                {Number(product.price).toFixed(4)} π
              </p>
              <p className="text-xs text-gray-500">{product.lokasi}</p>

              <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                <span>Stok: {product.stok || 0}</span>
                <span>⭐ 5.0</span>
              </div>

              <Link to={`/produk/${product.uuid}`}>
                <button className="mt-3 w-full bg-orange-500 text-white text-sm py-1 rounded hover:bg-orange-600 transition">
                  Lihat Detail
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
