"use client";

import React, { useState } from "react";
import { MessageSquare, Trash2, Search, Hash, Clock } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { formatTime, formatDate } from "@/utils/dashboard";

export default function Messages() {
  const { state, dispatch } = useDashboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");

  // Get unique channels from messages
  const channels = Array.from(
    new Set(state.messages.map((msg) => msg.channelId))
  );

  // Filter messages
  const filteredMessages = state.messages
    .filter(
      (message) =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedChannel === "all" || message.channelId === selectedChannel)
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  const handleDeleteMessage = (messageId: string) => {
    dispatch({ type: "DELETE_MESSAGE", payload: messageId });
  };

  const getChannelDisplayName = (channelId: string): string => {
    return channelId.charAt(0).toUpperCase() + channelId.slice(1);
  };

  return (
    <div className="p-6 space-y-6">
      {" "}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold theme-text-primary">Messages</h2>
          <p className="theme-text-secondary">
            View and manage server messages across all channels
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm theme-text-secondary">
          <MessageSquare className="w-4 h-4" />
          <span>{filteredMessages.length} messages</span>
        </div>
      </div>{" "}
      {/* Filters */}
      <div className="theme-bg-secondary rounded-lg p-6 border theme-border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border theme-border rounded-lg theme-bg-secondary theme-text-primary placeholder:theme-text-tertiary focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Channel filter */}
          <div className="flex items-center space-x-2">
            <Hash className="w-5 h-5 theme-text-tertiary" />
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="border theme-border rounded-lg px-3 py-2 theme-bg-secondary theme-text-primary focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              aria-label="Filter by channel"
            >
              <option value="all">All Channels</option>
              {channels.map((channel) => (
                <option key={channel} value={channel}>
                  #{getChannelDisplayName(channel)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Messages list */}
      <div className="space-y-4">
        {" "}
        {filteredMessages.length === 0 ? (
          <div className="theme-bg-secondary rounded-lg p-12 border theme-border text-center">
            <MessageSquare className="w-12 h-12 theme-text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-medium theme-text-primary mb-2">
              No messages found
            </h3>
            <p className="theme-text-secondary">
              {searchTerm || selectedChannel !== "all"
                ? "Try adjusting your search filters."
                : "No messages have been sent yet."}
            </p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className="theme-bg-secondary rounded-lg p-6 border theme-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                {/* Message content */}
                <div className="flex items-start space-x-4 flex-1">
                  {/* Avatar */}
                  <img
                    src={message.avatar}
                    alt={message.username}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />

                  {/* Message details */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium theme-text-primary">
                        {message.username}
                      </span>
                      <span className="text-sm theme-text-secondary">
                        in #{getChannelDisplayName(message.channelId)}
                      </span>
                      <div className="flex items-center space-x-1 text-xs theme-text-tertiary">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(message.timestamp)}</span>
                        <span>{formatTime(message.timestamp)}</span>
                      </div>
                    </div>

                    {/* Message content */}
                    <div className="theme-bg-tertiary rounded-lg p-3">
                      <p className="theme-text-primary break-words">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  {" "}
                  <button
                    onClick={() => handleDeleteMessage(message.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label={`Delete message from ${message.username}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message metadata */}
              <div className="mt-4 pt-4 border-t theme-border">
                <div className="flex items-center justify-between text-xs theme-text-tertiary">
                  <span>Message ID: {message.id}</span>
                  <span>User ID: {message.userId}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>{" "}
      {/* Message management info */}
      {filteredMessages.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-200">
                Message Moderation
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Use the delete button to remove inappropriate messages. All
                deletions are logged for audit purposes.
              </p>
            </div>
          </div>
        </div>
      )}{" "}
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="theme-bg-secondary rounded-lg p-6 border theme-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium theme-text-secondary">
                Total Messages
              </p>
              <p className="text-2xl font-bold theme-text-primary mt-1">
                {state.messages.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="theme-bg-secondary rounded-lg p-6 border theme-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium theme-text-secondary">
                Active Channels
              </p>
              <p className="text-2xl font-bold theme-text-primary mt-1">
                {channels.length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <Hash className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="theme-bg-secondary rounded-lg p-6 border theme-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium theme-text-secondary">
                Messages Today
              </p>
              <p className="text-2xl font-bold theme-text-primary mt-1">
                {state.stats.messagesToday}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
