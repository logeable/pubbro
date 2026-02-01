export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
  )
}