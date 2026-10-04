# ⚡ GenFlow

> A visual workflow automation platform for building, testing, and executing automated workflows without writing complex orchestration code.

GenFlow is a full-stack workflow automation platform that allows users to visually create workflows by connecting different nodes such as Webhooks, Transformations, Conditions, Email actions, and HTTP Requests.

The platform provides a visual canvas where workflows can be designed, configured, validated, saved, imported, exported, and executed.

---

## 🚀 Features

### 🎨 Visual Workflow Builder

- Drag-and-drop workflow nodes
- Visual workflow canvas powered by React Flow
- Connect nodes to define workflow execution
- TRUE/FALSE branching for conditional workflows
- Node configuration panel
- Zoom and canvas controls

### 🔗 Workflow Nodes

GenFlow currently supports:

- **Webhook** — Receive incoming workflow data
- **Transform Data** — Prepare and transform workflow data
- **Condition** — Evaluate workflow data
- **Send Email** — Execute email notification actions
- **HTTP Request** — Send HTTP requests to external APIs
- **Database** — Store or retrieve workflow data
- **Schedule** — Run workflows on a schedule
- **Manual Trigger** — Start workflows manually

### 🧠 Conditional Workflow Execution

Conditions can evaluate workflow data using operators such as:

```text
status Equals approved

The condition can then route execution through:
TRUE  → Send Email
FALSE → HTTP Request

This enables branching workflows instead of simple linear execution.
▶️ Workflow Execution
GenFlow provides an execution engine that:
1. Starts from the workflow trigger
2. Processes connected nodes
3. Evaluates conditions
4. Follows the correct branch
5. Executes actions
6. Displays execution status and results
💾 Workflow Management
- Save workflows
- Load saved workflows
- Import workflows from JSON
- Export workflows as JSON
- Workflow templates
- Editable workflow names
📊 Dashboard
The dashboard provides an overview of:
- Total workflows
- Active workflows
- Successful runs
- Failed runs
- Recent workflows
- Recent activity
- Quick actions
⚙️ Settings
The application includes a settings area for:
- Profile management
- Profile image
- Notification preferences
- Application preferences
- Security information
📱 Responsive Interface
GenFlow is designed to work across:
- Desktop
- Laptop
- Tablet
- Mobile-sized responsive layouts
🏗️ Architecture
                         ┌─────────────────────┐
                         │      GenFlow        │
                         │  Workflow Platform  │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
             ┌──────▼──────┐                 ┌──────▼──────┐
             │  Frontend   │                 │   Backend   │
             │ React + TS  │                 │ Node + TS   │
             └──────┬──────┘                 └──────┬──────┘
                    │                               │
                    │                               │
             ┌──────▼─────────┐             ┌───────▼────────┐
             │ Visual Builder │             │ Workflow API   │
             │ React Flow     │             │ Express        │
             └──────┬─────────┘             └───────┬────────┘
                    │                               │
                    └──────────────┬────────────────┘
                                   │
                          ┌────────▼────────┐
                          │ Workflow Engine │
                          └─────────────────┘

🛠️ Tech Stack
Frontend
- React
- TypeScript
- Vite
- React Flow (@xyflow/react)
- Tailwind CSS
- Lucide React
- React Router
Backend
- Node.js
- TypeScript
- Express.js
- TSX
Workflow Engine
- Custom TypeScript workflow execution engine
- Node-based execution
- Conditional branching
- HTTP request execution
- Workflow validation
Development Tools
- VS Code
- npm
- Git
- GitHub
📁 Project Structure
genflow/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── workflow.routes.ts
│   │   │
│   │   ├── workflow/
│   │   │   └── workflow.engine.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── ...
│   │   └── App.tsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── .gitignore
├── README.md
└── package configuration

⚙️ Getting Started
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/genflow.git
cd genflow

2. Install frontend dependencies
cd frontend
npm install

3. Install backend dependencies
Open another terminal:
cd backend
npm install

🔐 Environment Variables
Create:
backend/.env

Example:
PORT=5000

Never commit your .env file to GitHub.

The repository uses .gitignore to keep environment files and generated dependencies out of version control.
▶️ Running the Project
Start Backend
From the backend directory:
npm run dev

Backend runs on:
http://localhost:5000

Start Frontend
From the frontend directory:
npm run dev

Frontend runs on the Vite development server, typically:
http://localhost:5174

🧪 Build for Production
From the frontend directory:
npm run build

The production build is generated inside:
frontend/dist/

🔄 Example Workflow
A typical GenFlow workflow can look like:
Webhook
   │
   ▼
Transform Data
   │
   ▼
Condition
  ├──────── TRUE ────────► Send Email
  │
  └──────── FALSE ───────► HTTP Request

Example condition:
Field: status
Operator: Equals
Value: approved

If:
{
  "status": "approved"
}

the TRUE branch executes.
Otherwise, the FALSE branch executes.
💡 Use Cases
GenFlow can be used to build workflows such as:
Customer Notifications
Webhook
   ↓
Transform Data
   ↓
Check Customer Status
   ↓
Send Notification

API Automation
Webhook
   ↓
Transform Data
   ↓
Condition
   ↓
HTTP Request

Approval Workflows
Request Received
       ↓
   Validation
       ↓
   Condition
    ↙       ↘
Approved   Rejected
   ↓          ↓
 Email      HTTP/API


 🎯 Why GenFlow?
Traditional automation systems often require users to understand complex APIs, event systems, and backend orchestration.
GenFlow simplifies this process by providing a visual workflow builder where users can:
- Build workflows visually
- Connect workflow steps
- Configure individual nodes
- Add conditional logic
- Execute workflows
- Inspect execution results
- Save and reuse workflows
The goal is to make workflow automation more accessible while still providing a developer-friendly architecture.
🔮 Future Improvements
Potential future enhancements include:
- Scheduled workflow execution
- More database integrations
- Authentication and user accounts
- Persistent workflow storage
- More third-party API integrations
- Advanced workflow analytics
- Retry and failure handling
- Workflow versioning
- Webhook management
- Background job processing
- Real-time execution monitoring
- AI-powered workflow generation
🏆 Hackathon Highlights
GenFlow demonstrates:
- Full-stack application development
- Visual workflow orchestration
- Node-based execution architecture
- Conditional branching
- API integration
- Workflow validation
- JSON workflow portability
- Responsive UI design
- Production-ready frontend build
👩‍💻 Development
Built as a full-stack automation platform with a focus on:
Visual Builder + Workflow Engine + Developer Experience
📄 License
This project is developed for educational and hackathon purposes.