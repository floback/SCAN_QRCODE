export default function Loader() {
  return (
    <div className="min-h-screen flex items-center rounded-2xl justify-center bg-gradient-to-br bg-cyan-50 from-cyan-100 to-cyan-200 via-cyan-300 shadow-lg">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-5 h-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}


