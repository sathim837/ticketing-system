
import { useState } from "react";

const sampleUser = {
  name: "Sathi Majumder",
  email: "sathi@example.com",
  phone: "+91 98765 43210",
  department: "IT Support",
  role: "User",
  joinedOn: "15 January 2026",
};

function Profile() {
  const [profile, setProfile] = useState(sampleUser);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!profile.name.trim() || !profile.email.trim()) {
      setMessage("Name and email are required.");
      return;
    }

    setIsEditing(false);
    setMessage("Profile updated successfully.");

    // Demo only: profile is stored in React state, not a database.
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setMessage(
      "Demo only: connect your backend to change your password securely."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50 disabled:text-gray-500";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your personal account information.
        </p>
      </div>

      {message && (
        <div
          role="status"
          className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          {message}
        </div>
      )}

      {/* Profile summary */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-500" />

        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-sm">
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {profile.email}
                </p>
              </div>
            </div>

            <span className="mb-1 w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {profile.role}
            </span>
          </div>
        </div>
      </div>

      {/* Personal information */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your basic account details.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(true);
                setMessage("");
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                disabled={!isEditing}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <input
                id="department"
                name="department"
                value={profile.department}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                id="role"
                name="role"
                value={profile.role}
                disabled
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="joinedOn"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Member Since
              </label>
              <input
                id="joinedOn"
                name="joinedOn"
                value={profile.joinedOn}
                disabled
                className={inputClass}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setProfile(sampleUser);
                  setIsEditing(false);
                  setMessage("");
                }}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Change password */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Use a strong password to keep your account secure.
          </p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="current"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                id="current"
                type="password"
                autoComplete="current-password"
                value={passwords.current}
                onChange={(event) =>
                  setPasswords((previous) => ({
                    ...previous,
                    current: event.target.value,
                  }))
                }
                className={inputClass}
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={(event) =>
                  setPasswords((previous) => ({
                    ...previous,
                    newPassword: event.target.value,
                  }))
                }
                className={inputClass}
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={passwords.confirmPassword}
                onChange={(event) =>
                  setPasswords((previous) => ({
                    ...previous,
                    confirmPassword: event.target.value,
                  }))
                }
                className={inputClass}
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-100 pt-5">
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
