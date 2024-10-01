import AdminLayout from "@/components/admin/layouts";
import { useAdminClients } from "@/hooks/admin/useAdminClients";
import { montserrat } from "@/lib/fonts";
import moment from "moment";
import Link from "next/link";
import React from "react";

const ClientDashboard: React.FC = () => {
  const { clients, isLoading, isError, mutate } = useAdminClients();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error loading clients.</div>
    );
  }

  const handleDelete = (id: number) => {
    console.log(id)
    mutate(); // Re-fetch clients after delete
  };

  return (
    <AdminLayout>
      <div className={`container mx-auto p-6 ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

        <div className="mb-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add New Client
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b border-gray-300">Brides</th>
              <th className="py-3 px-4 border-b border-gray-300">Location</th>
              <th className="py-3 px-4 border-b border-gray-300">
                Date & Time
              </th>
              <th className="py-3 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-300">
                  {client.male_name} - {client.female_name}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <Link
                    href={client.location_full}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {client.location_full}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {moment(client.date).format("dddd, D MMMM YYYY")} -{" "}
                  {client.time}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <Link href={`/admin/clients/${client.id}`}>
                    <button className="text-blue-500 hover:underline mr-4">
                      Details
                    </button>
                  </Link>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ClientDashboard;
