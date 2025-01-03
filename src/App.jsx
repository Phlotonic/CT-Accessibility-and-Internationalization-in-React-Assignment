import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>{t('welcome')}</h1>} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;