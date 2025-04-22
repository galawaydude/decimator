// just the front end rn, can add logic to link with the api here


export default function Upload() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Files</h2>
        <input type="file" className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700" />
        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Upload
        </button>
      </div>
    </div>
  );
}
