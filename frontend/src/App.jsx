// import React from "react";
// import AuthGate from "./auth/AuthGate";
// import { configureAmplify } from "./auth/amplifyConfig";
// import { useAuthenticator } from "@aws-amplify/ui-react";
// import Notes from "./pages/Notes";
// import "./index.css";

// configureAmplify();

// export default function App() {
//   return (
//     <AuthGate>
//       <AppShell />
//     </AuthGate>
//   );
// }

// function AppShell() {
//   const { user, signOut } = useAuthenticator((context) => [context.user]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
//         <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
//           <h1 className="text-xl font-semibold text-gray-900">Notes</h1>
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-600">
//               {user?.username || user?.attributes?.email}
//             </span>
//             <button
//               onClick={signOut}
//               className="rounded bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
//             >
//               Sign out
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-3xl px-4 py-6">
//         <Notes />
//       </main>
//     </div>
//   );
// }

import React from "react";
import AuthGate from "./auth/AuthGate";
import { configureAmplify } from "./auth/amplifyConfig";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Notes from "./pages/Notes";
import "./index.css";

configureAmplify();

export default function App() {
  return (
    <AuthGate>
      <AppShell />
    </AuthGate>
  );
}

function AppShell() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="app-gradient">
      <header className="sticky top-0 z-10 border-b glass">
        <div className="container-pro flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500" />
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              Notes
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline pill">
              {user?.username || user?.attributes?.email}
            </span>
            <button
              onClick={signOut}
              className="btn-ghost"
              title="Sign out"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container-pro py-6 sm:py-8">
        <Notes />
      </main>
    </div>
  );
}

