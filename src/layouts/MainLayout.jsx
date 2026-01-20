export default function MainLayout({children}) {
    return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
    )
}