import { Header } from './components/Header';
import { Canvas } from './components/Canvas';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col font-sans bg-background">
      <Header />
      <ReactFlowProvider>
        <Canvas />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
