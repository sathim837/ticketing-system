
import { useState } from "react";

function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Please enter a ticket title.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Demo only: display the submitted ticket in the console.
    console.log("New ticket:", formData);

    setSuccessMessage("Ticket created successfully!");

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
    });

    setErrors({});
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Create Ticket
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Submit a support request and our team will help you.
        </p>
      </div>

      {/* Form card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Ticket Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Provide the details below to create your ticket.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Success message */}
          {successMessage && (
            <div
              role="status"
              className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {successMessage}
            </div>
          )}

          {/* Ticket title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Ticket Title <span className="text-red-500">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Unable to reset my password"
              maxLength={150}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.title
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue, what happened, and any steps you have already tried..."
              maxLength={3000}
              className={`w-full resize-y rounded-lg border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.description
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            <div className="mt-1 flex items-center justify-between gap-3">
              {errors.description ? (
                <p className="text-sm text-red-600">
                  {errors.description}
                </p>
              ) : (
                <p className="text-xs text-gray-500">
                  Include enough detail to help us understand the issue.
                </p>
              )}

              <span className="shrink-0 text-xs text-gray-400">
                {formData.description.length}/3000
              </span>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            <p className="mt-2 text-xs text-gray-500">
              Choose Urgent only if the issue requires immediate attention.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  description: "",
                  priority: "Medium",
                });
                setErrors({});
                setSuccessMessage("");
              }}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-xs text-gray-400">
        Your ticket will be available in My Tickets after it is saved.
      </p>
    </div>
  );
}

export default CreateTicket;
