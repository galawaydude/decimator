// just the front end rn, can add logic to link with the api here


export default function Receive() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Receive Files</h2>
        <input
          type="text"
          placeholder="Enter CID"
          className="w-full px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Download
        </button>
      </div>
    </div>
  );
}
