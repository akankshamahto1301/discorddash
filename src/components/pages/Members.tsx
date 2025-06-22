"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, UserPlus } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { User } from "@/types";
import { getRoleColorClasses, formatDate } from "@/utils/dashboard";

export default function Members() {
  const { state, dispatch } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [sortBy, setSortBy] = useState("joinDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    role: "Member",
    avatar: "",
  });

  const itemsPerPage = 5;

  // Filter and sort users
  const filteredUsers = state.users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRole === "all" || user.role === selectedRole)
    )
    .sort((a, b) => {
      if (sortBy === "joinDate") {
        const dateA = new Date(a.joinDate).getTime();
        const dateB = new Date(b.joinDate).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "username") {
        return sortOrder === "asc"
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleAddUser = () => {
    if (newUser.username.trim()) {
      const user: User = {
        id: Date.now().toString(),
        username: newUser.username,
        avatar:
          newUser.avatar ||
          `https://images.unsplash.com/photo-${
            1500000000000 + Math.floor(Math.random() * 100000000)
          }?w=50&h=50&fit=crop&crop=face`,
        joinDate: new Date().toISOString().split("T")[0],
        role: newUser.role,
        isOnline: Math.random() > 0.5,
      };

      dispatch({ type: "ADD_USER", payload: user });
      setNewUser({ username: "", role: "Member", avatar: "" });
      setShowAddModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {" "}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">Members</h2>
          <p className="theme-text-secondary">
            Manage your server members and their roles
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>
      {/* Filters */}
      <div className="theme-bg-secondary rounded-lg p-6 border theme-border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border theme-border rounded-lg theme-bg-secondary theme-text-primary placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          {/* Role filter */}{" "}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 theme-text-tertiary" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border theme-border rounded-lg px-3 py-2 theme-bg-secondary theme-text-primary focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              aria-label="Filter by role"
            >
              <option value="all">All Roles</option>
              {state.roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Members table */}{" "}
      <div className="theme-bg-secondary rounded-lg border theme-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="theme-bg-tertiary">
              <tr>
                {" "}
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Member
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider cursor-pointer theme-hover"
                  onClick={() => handleSort("joinDate")}
                >
                  Join Date{" "}
                  {sortBy === "joinDate" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium theme-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y theme-border">
              {paginatedUsers.map((user) => {
                const userRole = state.roles.find((r) => r.name === user.role);
                const roleColors = userRole
                  ? getRoleColorClasses(userRole.color)
                  : getRoleColorClasses("#888888");

                return (
                  <tr key={user.id} className="theme-hover">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-10 h-10 rounded-full"
                          />{" "}
                          <span
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 theme-bg-primary ${
                              user.isOnline ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        </div>{" "}
                        <div>
                          <p className="font-medium theme-text-primary">
                            {user.username}
                          </p>
                          <p className="text-sm theme-text-secondary">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm theme-text-primary">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors.bg} ${roleColors.text}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isOnline
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {user.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {" "}
                      <button
                        className="text-indigo-600 hover:text-indigo-700"
                        aria-label={`Edit ${user.username}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700"
                        aria-label={`Remove ${user.username}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>{" "}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 theme-bg-tertiary border-t theme-border">
            <div className="flex items-center justify-between">
              <div className="text-sm theme-text-primary">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} members
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm theme-bg-secondary border theme-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed theme-hover"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm theme-text-primary">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm theme-bg-secondary border theme-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed theme-hover"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {" "}
          <div className="theme-bg-secondary rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold theme-text-primary">
                Add New Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="theme-text-tertiary hover:theme-text-primary"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium theme-text-primary mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border theme-border rounded-lg theme-bg-primary theme-text-primary focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium theme-text-primary mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border theme-border rounded-lg theme-bg-primary theme-text-primary focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  aria-label="Select role for new member"
                >
                  {state.roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Avatar URL (optional)
                </label>
                <input
                  type="url"
                  value={newUser.avatar}
                  onChange={(e) =>
                    setNewUser({ ...newUser, avatar: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={!newUser.username.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg disabled:cursor-not-allowed"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
