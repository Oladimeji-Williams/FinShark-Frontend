"use client";

import ReactRouterApp from "./ReactRouterApp";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full lg:w-4/5 max-w-none flex-col items-center justify-between py-16 px-4 sm:px-6 lg:px-10 bg-white dark:bg-black sm:items-start">
        <ReactRouterApp />
      </main>
    </div>
  );
}
