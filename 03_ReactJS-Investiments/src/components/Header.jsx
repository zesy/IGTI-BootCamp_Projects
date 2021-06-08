export default function Header({version}) {
    return (
        <div className="bg-green-100 mx-auto p-4 text-center">
          <h1 className="font-semibold text-3xl">
            React-Investments
          </h1>
          <p className="text-sm text-gray-400">Version: {version}</p>
        </div>
    )
}
