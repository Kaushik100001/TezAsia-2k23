import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


const ItemType = 'CODE_BLOCK';

const DraggableCodeBlock = ({ code, index, moveCodeBlock }) => {
  const [, drag] = useDrag(() => ({
    type: ItemType,
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCodeBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="code-block"
    >
      <pre>{code}</pre>
    </div>
  );
};

function App() {
  const [codeBlocks, setCodeBlocks] = useState([
    { id: 1, code: 'const x = 10;\nconsole.log(x);' },
    { id: 2, code: 'function greet() {\n  console.log("Hello!");\n}' },
    { id: 3, code: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}' },
  ]);

  const moveCodeBlock = (fromIndex, toIndex) => {
    const updatedCodeBlocks = [...codeBlocks];
    const [movedCodeBlock] = updatedCodeBlocks.splice(fromIndex, 1);
    updatedCodeBlocks.splice(toIndex, 0, movedCodeBlock);
    setCodeBlocks(updatedCodeBlocks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Drag and Drop Code Blocks</h1>
        <div className="code-block-container">
          {codeBlocks.map((codeBlock, index) => (
            <DraggableCodeBlock
              key={codeBlock.id}
              code={codeBlock.code}
              index={index}
              moveCodeBlock={moveCodeBlock}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
