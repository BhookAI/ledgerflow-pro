export default function UploadPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subir Estudio de Suelo</h1>
      <div className="border-2 border-dashed p-8 text-center rounded-lg">
        <p className="text-gray-500">Arrastra PDF aquí o haz click para seleccionar</p>
        <input type="file" accept=".pdf" className="mt-4" />
      </div>
    </div>
  )
}
