import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  RateCreate,
  Thanks,
} from "./pages/rate";

import { initializeFirebase } from "refine-firebase";
import {
  FirebaseDatabase,
  FirestoreDatabase,

} from "refine-firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyBWmhbm9BMJzX4y-NtuZNzHizWkFH_pK2s",
  authDomain: "jocaapp-33214.firebaseapp.com",
  projectId: "jocaapp-33214",
  storageBucket: "jocaapp-33214.appspot.com",
  messagingSenderId: "451752334569",
  appId: "1:451752334569:web:00b45ba47e189fd9860c78",
  measurementId: "G-VRKG42ZZJF"
};
const firebaseApp = initializeFirebase(firebaseConfig);

const firestoreDatabase = new FirestoreDatabase();

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <Refine
            dataProvider={firestoreDatabase.getDataProvider()}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "rate",
                show: '/thanks',
                meta: {
                  canDelete: true,
                },
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "YzHztu-9gR40J-80bucA",
            }}
          >
            <Routes >
              <Route path="thanks" element={<Thanks />} />

              <Route path="/rate">
                <Route index={false} path=":id" element={<RateCreate />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Refine>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
