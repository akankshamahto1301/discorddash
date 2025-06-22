// Utility functions for the dashboard

export function getRoleColorClasses(color: string) {
  // Convert hex color to Tailwind-like classes
  const colorMap: Record<string, { bg: string; text: string }> = {
    "#ff0000": {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-600 dark:text-red-400",
    },
    "#00ff00": {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-600 dark:text-green-400",
    },
    "#0066ff": {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-600 dark:text-blue-400",
    },
    "#ffaa00": {
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-600 dark:text-orange-400",
    },
    "#cc00ff": {
      bg: "bg-purple-100 dark:bg-purple-900",
      text: "text-purple-600 dark:text-purple-400",
    },
    "#888888": {
      bg: "bg-gray-100 dark:bg-gray-900",
      text: "text-gray-600 dark:text-gray-400",
    },
  };

  return (
    colorMap[color] || {
      bg: "bg-gray-100 dark:bg-gray-900",
      text: "text-gray-600 dark:text-gray-400",
    }
  );
}

export function getBarHeight(value: number, max: number): string {
  const percentage = (value / max) * 100;
  if (percentage >= 90) return "h-full";
  if (percentage >= 75) return "h-5/6";
  if (percentage >= 60) return "h-4/6";
  if (percentage >= 45) return "h-3/6";
  if (percentage >= 30) return "h-2/6";
  if (percentage >= 15) return "h-1/6";
  return "h-2";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
