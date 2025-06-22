"use client";

import React, { useState } from "react";
import { Shield, Edit, Eye, EyeOff, Users, Settings } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { Role } from "@/types";
import { getRoleColorClasses } from "@/utils/dashboard";

export default function Roles() {
  const { state, dispatch } = useDashboard();
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleToggleVisibility = (roleId: string) => {
    dispatch({ type: "TOGGLE_ROLE_VISIBILITY", payload: roleId });
  };

  const handleStartEdit = (role: Role) => {
    setEditingRole(role.id);
    setEditName(role.name);
  };

  const handleSaveEdit = () => {
    if (editingRole && editName.trim()) {
      dispatch({
        type: "RENAME_ROLE",
        payload: { id: editingRole, name: editName },
      });
      setEditingRole(null);
      setEditName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
    setEditName("");
  };

  const getPermissionText = (permissions: string[]): string => {
    if (permissions.includes("all")) return "All Permissions";
    if (permissions.length === 0) return "No special permissions";
    return permissions.join(", ");
  };

  return (
    <div className="p-6 space-y-6">
      {" "}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">Roles</h2>
          <p className="theme-text-secondary">
            Manage server roles and their permissions
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Shield className="w-5 h-5" />
          <span>Create Role</span>
        </button>
      </div>{" "}
      {/* Role hierarchy info */}
      <div className="theme-bg-tertiary border theme-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium theme-text-primary">Role Hierarchy</h3>
            <p className="text-sm theme-text-secondary mt-1">
              Roles are ordered by importance. Higher roles can manage lower
              roles but not vice versa.
            </p>
          </div>
        </div>
      </div>
      {/* Roles list */}
      <div className="space-y-4">
        {state.roles.map((role, index) => {
          const roleColors = getRoleColorClasses(role.color);

          return (
            <div
              key={role.id}
              className="theme-bg-secondary border theme-border rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Role hierarchy indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 theme-bg-tertiary rounded-full flex items-center justify-center text-sm font-medium theme-text-secondary">
                      {index + 1}
                    </div>
                    {index < state.roles.length - 1 && (
                      <div className="w-0.5 h-4 theme-border mt-2" />
                    )}
                  </div>

                  {/* Role info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {editingRole === role.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-3 py-1 border theme-border rounded theme-bg-secondary theme-text-primary"
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSaveEdit()
                            }
                            placeholder="Role name"
                            aria-label="Edit role name"
                            autoFocus
                          />
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-700"
                            aria-label="Save role name"
                          >
                            ✓
                          </button>{" "}
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Cancel editing"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${roleColors.bg} ${roleColors.text}`}
                          >
                            {role.name}
                          </span>{" "}
                          <button
                            onClick={() => handleStartEdit(role)}
                            className="theme-text-secondary hover:theme-text-primary"
                            aria-label={`Edit ${role.name} role name`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm theme-text-secondary">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {role.memberCount} member
                          {role.memberCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>{getPermissionText(role.permissions)}</span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* Role actions */}
                <div className="flex items-center space-x-3">
                  {/* Visibility toggle */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm theme-text-secondary">
                      Visible:
                    </span>{" "}
                    <button
                      onClick={() => handleToggleVisibility(role.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        role.isVisible ? "bg-indigo-600" : "theme-bg-tertiary"
                      }`}
                      aria-label={`Toggle visibility for ${role.name} role`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          role.isVisible ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Visibility icon */}
                  <div className="theme-text-secondary">
                    {role.isVisible ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
              {/* Permission details */}
              {role.permissions.length > 0 &&
                !role.permissions.includes("all") && (
                  <div className="mt-4 pt-4 border-t theme-border">
                    <h4 className="text-sm font-medium theme-text-primary mb-2">
                      Permissions:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 theme-bg-tertiary theme-text-primary text-xs rounded-md"
                        >
                          {permission.replace("_", " ").toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}{" "}
              {/* Admin role special notice */}
              {role.permissions.includes("all") && (
                <div className="mt-4 pt-4 border-t theme-border">
                  <div className="theme-bg-tertiary border theme-border rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span className="text-sm theme-text-primary font-medium">
                        Administrator Role
                      </span>
                    </div>
                    <p className="text-xs theme-text-secondary mt-1">
                      This role has all permissions and can manage the entire
                      server.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>{" "}
      {/* Role management tips */}
      <div className="theme-bg-tertiary rounded-lg p-4">
        {" "}
        <h3 className="font-medium theme-text-primary mb-2">
          Role Management Tips
        </h3>
        <ul className="text-sm theme-text-secondary space-y-1">
          <li>
            • Higher roles in the list have more authority than lower roles
          </li>
          <li>
            • Hidden roles won&apos;t appear in member lists to regular users
          </li>
          <li>
            • Be careful when editing role permissions as it affects all members
            with that role
          </li>
          <li>
            • The Administrator role should be given only to trusted members
          </li>
        </ul>
      </div>
    </div>
  );
}
