"use client";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function HomeGreeting() {
  return (
    <h1 className="text-2xl md:text-[28px] text-white font-bold cursor-default greeting-fade-in">
      {getGreeting()}
    </h1>
  );
}
