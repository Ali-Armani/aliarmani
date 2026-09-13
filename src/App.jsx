
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Home Page (placeholder)</div>} />
        <Route path="blog" element={<div>Blog Index (placeholder)</div>} />
        <Route path="blog/:slug" element={<div>Single Blog Post (placeholder)</div>} />
        <Route path="projects" element={<div>All Projects Page (placeholder)</div>} />
        <Route path="*" element={<div>404 — Page Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;