import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [buyer, setBuyer] = useState({
    nama_lengkap: '',
    telepon: '',
    alamat: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: '',
    kode_pos: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/produk-publik/${id}`)
      .then((res) => {
        const data = res.data.data;
        const fallback = ['/storage/app/public/products/default.png'];
        const photos =
          Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : fallback;
        const slides = [
          ...photos.map((url) => ({ type: 'image', url })),
          ...(data.video_url ? [{ type: 'video', url: data.video_url }] : []),
        ];
        setProperty({ ...data, slides });
        window.scrollTo(0, 0);
      })
      .catch((err) => console.error('❌ Gagal ambil detail:', err));
  }, [id]);

  const startPiPayment = () => {
  const buyerInfo = { ...buyer };

  // 🔒 Validasi SDK Pi tersedia dan siap digunakan
  if (!window?.Pi || typeof window.Pi.createPayment !== 'function') {
    alert('⚠️ Fitur pembayaran hanya tersedia melalui Pi Browser. Silakan login ke Pi Network dan akses halaman ini melalui Pi Browser.');
    return;
  }

  // 🚀 Jalankan pembayaran via SDK Pi
  window.Pi.createPayment(
    {
      amount: property.price,
      memo: `Pembelian ${property.title}`,
      metadata: {
        items: [
          {
            productId: property.uuid,
            title: property.title,
            qty: 1,
          },
        ],
        address: buyerInfo, // 🧍 Data pembeli sebagai metadata
      },
    },
    {
      onReadyForServerApproval: (paymentId) => {
        axios
          .post('http://localhost:8000/api/transactions/approve', { paymentId })
          .then((res) => {
            console.log('✅ Approved by server:', res.data);
          })
          .catch((err) => {
            console.error('❌ Gagal kirim approve:', err);
            alert('⚠️ Transaksi gagal diverifikasi oleh server.');
          });
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        axios
          .post('http://localhost:8000/api/transactions/complete', {
            paymentId,
            txid,
          })
          .then(() => {
            alert('✅ Pembayaran berhasil diselesaikan!');
            setBuyer({
              nama_lengkap: '',
              telepon: '',
              alamat: '',
              provinsi: '',
              kabupaten: '',
              kecamatan: '',
              desa: '',
              kode_pos: '',
            });
            setShowModal(false);
          })
          .catch((err) => {
            console.error('❌ Gagal complete transaksi:', err);
            alert('⚠️ Gagal menyelesaikan transaksi. Hubungi admin jika masalah berlanjut.');
          });
      },
      onCancel: (paymentId) => {
        axios.post('http://localhost:8000/api/transactions/cancel', { paymentId });
        alert('⚠️ Pembayaran dibatalkan oleh pengguna.');
      },
      onError: (err) => {
        console.error('❌ Error SDK:', err);
        alert('⚠️ Terjadi kesalahan saat memproses pembayaran. Silakan coba kembali.');
      },
    }
  );
};


  const shareUrl = window.location.href;

  if (!property) {
    return (
      <Layout>
        <div className="pt-6">
          <p className="text-center text-gray-400">Sedang memuat detail properti...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-6">
        {/* 🔁 Slider Foto & Video */}
        <div className="mb-4 rounded-xl overflow-hidden shadow">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="rounded-xl"
          >
            {property.slides.map((slide, index) => (
              <SwiperSlide key={index}>
                {slide.type === 'image' ? (
                  <img
                    src={slide.url}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={slide.url}
                      title={`Video Properti ${index + 1}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔗 Bagikan */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() =>
              navigator.share?.({ title: property.title, url: shareUrl }) ||
              navigator.clipboard.writeText(shareUrl)
            }
            className="bg-white/20 hover:bg-white/30 backdrop-blur px-3 py-1 text-xs text-white rounded transition"
          >
            🔗 Bagikan
          </button>
        </div>

        <h1 className="text-xl font-bold mb-1 text-white">{property.title}</h1>
        <p className="text-sm text-white/70">{property.lokasi}</p>
        <p className="text-green-400 font-bold text-lg mb-4">
          {Number(property.price).toFixed(7)} π
        </p>

        {/* 🧾 Detail Properti */}
        <div className="text-sm text-white/80 space-y-1 mb-4">
          {property.luas_tanah && <p>📏 Luas Tanah: {property.luas_tanah} m²</p>}
          {property.luas_bangunan && <p>🏠 Luas Bangunan: {property.luas_bangunan} m²</p>}
          {property.jumlah_kamar && <p>🛏️ Kamar Tidur: {property.jumlah_kamar}</p>}
          {property.jumlah_kamar_mandi && <p>🛁 Kamar Mandi: {property.jumlah_kamar_mandi}</p>}
          {property.tipe && <p>🏷️ Tipe: {property.tipe}</p>}
          {property.fasilitas && (
            <p>
              ✅ Fasilitas:{' '}
              {Array.isArray(property.fasilitas)
                ? property.fasilitas.join(', ')
                : property.fasilitas}
            </p>
          )}
        </div>

        {/* 📖 Deskripsi */}
        <div
          className="bg-white/5 text-white text-sm p-4 rounded-xl backdrop-blur"
          dangerouslySetInnerHTML={{ __html: property.deskripsi }}
        />

        {/* 💰 Proses Pembayaran */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 w-full py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
        >
          💰 Lanjut Proses Pembayaran
        </button>

        {/* 🔙 Kembali */}
        <button
          onClick={() => navigate('/')}
          className="mt-3 w-full py-2 text-sm bg-white/10 border border-white/20 rounded text-white/80 hover:bg-white/20 transition"
        >
          ← Kembali ke Home
        </button>
      </div>

      {/* 🧍‍♂️ Modal Form Pembeli */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white/10 rounded-xl p-6 w-[90%] max-w-md text-white shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-white/70 hover:text-white text-lg"
            >
              ✖
            </button>
            <h2 className="text-white font-bold text-lg mb-3">🛒 Data Pembeli</h2>

            {[
              { name: 'nama_lengkap', label: 'Nama Lengkap' },
              { name: 'telepon', label: 'No WhatsApp' },
              { name: 'alamat', label: 'Alamat Lengkap' },
              { name: 'provinsi', label: 'Provinsi' },
              { name: 'kabupaten', label: 'Kabupaten / Kota' },
              { name: 'kecamatan', label: 'Kecamatan' },
              { name: 'desa', label: 'Desa / Kelurahan' },
              { name: 'kode_pos', label: 'Kode Pos' },
            ].map(({ name, label }) => (
              <input
                key={name}
                type="text"
                placeholder={label}
                value={buyer[name]}
                onChange={(e) => setBuyer({ ...buyer, [name]: e.target.value })}
                className="mb-2 w-full p-2 rounded bg-white/20 text-white placeholder:text-white/50"
              />
            ))}

            <button
              onClick={startPiPayment}
              className="w-full py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
            >
              💰 Lanjut Proses Pembayaran (via Pi SDK)
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}