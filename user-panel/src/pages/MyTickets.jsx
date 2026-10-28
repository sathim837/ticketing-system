
import { useState } from "react";
import { useSelector } from "react-redux";

const sampleTickets = [
  {
    id: "TKT-1001",
    title: "Unable to reset my password",
    createdOn: "22 Oct 2026",
    priority: "High",
    status: "Open",
  },
  {
    id: "TKT-1002",
    title: "Payment deducted but order not confirmed",
    createdOn: "21 Oct 2026",
    priority: "Urgent",
    status: "In Progress",
  },
  {
    id: "TKT-1003",
    title: "Unable to update profile information",
    createdOn: "20 Oct 2026",
    priority: "Low",
    status: "Resolved",
  },
  {
    id: "TKT-1004",
    title: "Application page loading slowly",
    createdOn: "19 Oct 2026",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "TKT-1005",
    title: "Request access to the reporting module",
    createdOn: "18 Oct 2026",
    priority: "Medium",
    status: "Closed",
  },
];

const priorityStyles = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-blue-100 text-blue-700",
};

const statusStyles = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-purple-100 text-purple-700",
  Resolved: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

function MyTickets() {

  const activeMenu = useSelector(
    (state) => state.navigation.activeMenu 
  )

  const [search, setSearch] = useState("");

  const filteredTickets = sampleTickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase()) ||
    ticket.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {activeMenu}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and track all the support tickets you have created.
        </p>
      </div>

      {/* Ticket summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Tickets</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {sampleTickets.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Open Tickets</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {sampleTickets.filter((ticket) => ticket.status === "Open").length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">
            {
              sampleTickets.filter(
                (ticket) => ticket.status === "In Progress"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Tickets table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Tickets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredTickets.length} tickets found
            </p>
          </div>

          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-72"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Ticket Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Created On
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Priority
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {ticket.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {ticket.id}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {ticket.createdOn}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          priorityStyles[ticket.priority]
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[ticket.status]
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No tickets found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyTickets;
