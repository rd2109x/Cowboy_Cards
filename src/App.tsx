
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Routes } from 'react-router-dom';
import Index from "./pages/Index";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ClassDetail from "./pages/ClassDetail";

setupIonicReact();

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/class/:id" element={<ClassDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
