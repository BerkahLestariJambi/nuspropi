export default function Layout({ children }) {
  return (
    <div className="bg-brand text-white min-h-screen font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-[510px]">{children}</div>
    </div>
  );
}
