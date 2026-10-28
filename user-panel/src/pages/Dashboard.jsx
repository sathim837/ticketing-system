function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        Welcome back!
      </h2>

      <p className="mt-2 text-slate-500">
        Here is an overview of your support tickets.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Tickets", value: 10 },
          { label: "Open Tickets", value: 3 },
          { label: "In Progress", value: 2 },
          { label: "Resolved", value: 5 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;