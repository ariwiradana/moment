import React, { useState } from "react";
import { GetServerSideProps } from "next";

interface Client {
  id: string;
  name: string;
}

interface UpdateClientProps {
  client: Client | null;
}

const UpdateClient: React.FC<UpdateClientProps> = ({ client }) => {
  const [name, setName] = useState(client?.name || "");
  const [message] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Update Client</h2>
      {client ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Update Client
          </button>
        </form>
      ) : (
        <p className="text-red-600">Client not found.</p>
      )}
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  let client = null;

  const response = await fetch(`http://localhost:3000/api/clients?id=${id}`);
  if (response.ok) {
    client = await response.json();
  }

  return {
    props: {
      client,
    },
  };
};

export default UpdateClient;
