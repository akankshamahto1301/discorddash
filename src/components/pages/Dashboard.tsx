"use client";

import React from "react";
import {
  Users,
  UserCheck,
  Shield,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import {
  getRoleColorClasses,
  getBarHeight,
  formatDate,
} from "@/utils/dashboard";

export default function Dashboard() {
  const { state } = useDashboard();

  const metrics = [
    {
      title: "Total Members",
      value: state.stats.totalMembers,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      color: "bg-blue-500",
    },
    {
      title: "Online Users",
      value: state.stats.onlineUsers,
      icon: UserCheck,
      change: "+5%",
      changeType: "positive" as const,
      color: "bg-green-500",
    },
    {
      title: "Active Roles",
      value: state.stats.activeRoles,
      icon: Shield,
      change: "0%",
      changeType: "neutral" as const,
      color: "bg-purple-500",
    },
    {
      title: "Messages Today",
      value: state.stats.messagesToday,
      icon: MessageCircle,
      change: "+25%",
      changeType: "positive" as const,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, AdminUser!</h2>
        <p className="text-indigo-100">
          Here&apos;s what&apos;s happening with your Discord server today.
        </p>
      </div>
      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div
              key={index}
              className="theme-bg-secondary rounded-lg p-6 border theme-border shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium theme-text-secondary">
                    {metric.title}
                  </p>
                  <p className="text-3xl font-bold theme-text-primary mt-2">
                    {metric.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />{" "}
                    <span
                      className={`text-sm font-medium ${
                        metric.changeType === "positive"
                          ? "text-green-600"
                          : "theme-text-secondary"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${metric.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>{" "}
      {/* Member growth chart */}
      <div className="theme-bg-secondary rounded-lg p-6 border theme-border shadow-sm">
        <h3 className="text-lg font-semibold theme-text-primary mb-4">
          Member Growth Over Time
        </h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {state.stats.memberGrowth.map((data, index) => {
            const maxMembers = Math.max(
              ...state.stats.memberGrowth.map((d) => d.members)
            );
            const heightClass = getBarHeight(data.members, maxMembers);
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`bg-indigo-500 rounded-t-sm transition-all duration-300 hover:bg-indigo-600 w-full ${heightClass}`}
                  title={`${data.month}: ${data.members} members`}
                />{" "}
                <span className="text-xs theme-text-secondary mt-2">
                  {data.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {" "}
        {/* Recent members */}
        <div className="theme-bg-secondary rounded-lg p-6 border theme-border shadow-sm">
          <h3 className="text-lg font-semibold theme-text-primary mb-4">
            Recent Members
          </h3>
          <div className="space-y-3">
            {state.users.slice(-3).map((user) => {
              const userRole = state.roles.find((r) => r.name === user.role);
              const roleColors = userRole
                ? getRoleColorClasses(userRole.color)
                : getRoleColorClasses("#888888");

              return (
                <div key={user.id} className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium theme-text-primary">
                      {user.username}
                    </p>
                    <p className="text-sm theme-text-secondary">
                      Joined {formatDate(user.joinDate)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors.bg} ${roleColors.text}`}
                  >
                    {user.role}
                  </span>
                </div>
              );
            })}
          </div>
        </div>{" "}
        {/* Server statistics */}
        <div className="theme-bg-secondary rounded-lg p-6 border theme-border shadow-sm">
          <h3 className="text-lg font-semibold theme-text-primary mb-4">
            Server Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="theme-text-secondary">Member Retention</span>
              <span className="font-semibold theme-text-primary">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="theme-text-secondary">Daily Active Users</span>
              <span className="font-semibold theme-text-primary">
                {Math.round(state.stats.onlineUsers * 1.5)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="theme-text-secondary">Average Session</span>
              <span className="font-semibold theme-text-primary">2h 34m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="theme-text-secondary">Peak Online Time</span>
              <span className="font-semibold theme-text-primary">8:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
