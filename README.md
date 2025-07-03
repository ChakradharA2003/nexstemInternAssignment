# ⚙️ Pipeline Visual Editor

An interactive DAG-based pipeline editor built with **React Flow**, supporting node creation, drag/drop, auto-layout (Dagre), validation, and delete functionality with a modern UI.

---

## 🚀 Demo

🔗 [Live Demo on Vercel](https://nexstem-intern-assignment.vercel.app/)

📹 **Screen Recording:**  

[Drive Link](https://drive.google.com/file/d/1inmn6_YbXbdHtApIobAPG2t3NXoX0SOl/view?usp=sharing)



---

## 📦 Tech Stack

| Layer        | Tools / Libraries                              |
|--------------|-------------------------------------------------|
| UI Framework | React                                           |
| Graph Engine | [React Flow](https://reactflow.dev)             |
| Layout Algo  | [Dagre](https://github.com/dagrejs/dagre)       |
| Icons        | React Icons (`react-icons`)                     |
| Feedback     | `react-toastify` for notifications              |
| Deployment   | Vercel (or Netlify/GitHub Pages)                |

---

## 🛠️ Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/pipeline-editor.git
cd pipeline-editor
```
2. **Install Dependencies**
```bash
npm install
```

3. **Run the App Locally**
```bash
npm run dev
```

4. **Build for Production**
```bash
npm run build
```

## 🧠 Architectural Notes

- **`ReactFlowProvider`** wraps the app to manage graph state globally and enable context access for all React Flow components.
  
- **`useStoreApi`** is used to access and manipulate React Flow’s internal state directly — particularly useful for operations like deleting nodes programmatically.
  
- **Custom Events (`deleteNodeById`)** decouple UI actions (like clicking a trash icon) from internal logic (like updating the node state), promoting cleaner architecture and separation of concerns.
  
- **Dagre Auto-Layout** is integrated with fine-tuned `ranksep` and `nodesep` to ensure visually coherent layouts, especially as graphs grow.
  
- **`nodeTypes`** is declared outside the component scope to prevent ReactFlow render loop warnings and optimize performance.


## ⚙️ Core Features

- ✅ **Add Nodes**: Instantly add nodes with custom labels.
- ✅ **Drag & Connect**: Drag nodes freely and connect them with automatic validation (prevents self-loops).
- ✅ **Smart UI**: Trash icon only appears when hovering over a node.
- ✅ **Auto-Layout**: One-click layout using Dagre (Left-to-Right direction) for clarity.
- ✅ **Delete Support**: Remove nodes or edges using the `Delete` key or trash icon.
- ✅ **Feedback System**: Real-time toast notifications on delete actions and validations.
