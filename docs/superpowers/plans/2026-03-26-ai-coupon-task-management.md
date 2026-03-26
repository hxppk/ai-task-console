# AI 建券任务管理系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 6-page interactive frontend prototype for an AI-driven coupon creation task management system, split into an admin backend and a business-facing list.

**Architecture:** Single React app with two route groups (`/admin/*` for AI task backend, `/biz/*` for business AI coupon list). Shared layout component provides the top nav bar (matching 策略实验室 style) and per-section sidebars. All data is mock — no backend. Ant Design for all UI components.

**Tech Stack:** React 19, Vite 7, React Router v7, Ant Design 5, mock JSON data

---

## File Structure

```
src/
├── main.jsx                          # Entry, renders App with router
├── index.css                         # Global resets (keep existing)
├── App.jsx                           # Router definition with all routes
├── mock/
│   └── data.js                       # All mock data (tasks, coupons, stats)
├── layouts/
│   ├── TopNav.jsx                    # 策略实验室 top navigation bar
│   ├── TopNav.module.css
│   ├── AdminLayout.jsx               # Admin sidebar + content slot
│   ├── AdminLayout.module.css
│   ├── BizLayout.jsx                 # Business sidebar + content slot
│   └── BizLayout.module.css
├── pages/
│   ├── admin/
│   │   ├── TaskList.jsx              # Page 1: Admin task list
│   │   ├── TaskList.module.css
│   │   ├── TaskDetail.jsx            # Page 2: Admin task detail
│   │   ├── TaskDetail.module.css
│   │   ├── CouponDrawer.jsx          # Page 3: Coupon detail drawer
│   │   └── CouponDrawer.module.css
│   └── biz/
│       ├── BizTaskList.jsx           # Page 4: Business task list
│       ├── BizTaskList.module.css
│       ├── BizTaskDetail.jsx         # Page 5: Business task detail
│       ├── BizTaskDetail.module.css
│       ├── ExcelUpload.jsx           # Page 6: Excel upload
│       └── ExcelUpload.module.css
```

---

## Task 1: Install Dependencies and Setup Routing

**Files:**
- Modify: `package.json`
- Rewrite: `src/main.jsx`
- Rewrite: `src/App.jsx`
- Rewrite: `src/App.css` (delete contents, no longer needed)
- Rewrite: `src/index.css`

- [ ] **Step 1: Install antd and @ant-design/icons**

```bash
cd /Users/hexu/中心agent && npm install antd @ant-design/icons
```

- [ ] **Step 2: Replace index.css with minimal global resets**

Replace `src/index.css` with:

```css
:root {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  line-height: 1.5;
  color: #1d2129;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  min-height: 100%;
  margin: 0;
  padding: 0;
}

button, input {
  font: inherit;
}

button {
  cursor: pointer;
}
```

- [ ] **Step 3: Setup main.jsx with BrowserRouter**

Replace `src/main.jsx` with:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 4: Setup App.jsx with route structure**

Replace `src/App.jsx` with:

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import BizLayout from './layouts/BizLayout'
import TaskList from './pages/admin/TaskList'
import TaskDetail from './pages/admin/TaskDetail'
import BizTaskList from './pages/biz/BizTaskList'
import BizTaskDetail from './pages/biz/BizTaskDetail'
import ExcelUpload from './pages/biz/ExcelUpload'

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<TaskList />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/:taskId" element={<TaskDetail />} />
      </Route>
      <Route path="/biz" element={<BizLayout />}>
        <Route index element={<BizTaskList />} />
        <Route path="tasks" element={<BizTaskList />} />
        <Route path="tasks/:taskId" element={<BizTaskDetail />} />
        <Route path="upload" element={<ExcelUpload />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 5: Clear App.css**

Empty `src/App.css` (will be unused, remove import from App.jsx if present).

- [ ] **Step 6: Create placeholder page components**

Create minimal placeholder components so the app compiles. Each file exports a component that renders a `<div>Page Name</div>`.

Create these files with placeholder content:
- `src/layouts/TopNav.jsx`
- `src/layouts/AdminLayout.jsx`
- `src/layouts/BizLayout.jsx`
- `src/pages/admin/TaskList.jsx`
- `src/pages/admin/TaskDetail.jsx`
- `src/pages/admin/CouponDrawer.jsx`
- `src/pages/biz/BizTaskList.jsx`
- `src/pages/biz/BizTaskDetail.jsx`
- `src/pages/biz/ExcelUpload.jsx`

Example placeholder:

```jsx
export default function TaskList() {
  return <div>Admin Task List</div>
}
```

- [ ] **Step 7: Verify the app compiles and routes work**

```bash
cd /Users/hexu/中心agent && npx vite --port 5174 &
sleep 3
curl -s http://localhost:5174 | head -20
```

Open `http://localhost:5174/admin` and `http://localhost:5174/biz` — both should render their placeholder text.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: setup routing, install antd, create placeholder pages"
```

---

## Task 2: Mock Data

**Files:**
- Create: `src/mock/data.js`

- [ ] **Step 1: Create mock data file**

Create `src/mock/data.js` with all the mock data the prototype needs:

```js
// Task statuses for admin backend
export const ADMIN_TASK_STATUS = {
  PARSING: '解析中',
  RUNNING: '执行中',
  PENDING_CONFIRM: '待确认',
  COMPLETED: '已完成',
  PARTIAL_ERROR: '部分异常',
  ERROR: '异常',
}

// Task statuses for business list (simplified)
export const BIZ_TASK_STATUS = {
  RUNNING: '执行中',
  PENDING_CONFIRM: '待确认',
  COMPLETED: '已完成',
}

// Coupon statuses for admin backend
export const ADMIN_COUPON_STATUS = {
  QUEUED: '排队中',
  CREATING: '创建中',
  COMPLETED: '已完成',
  FAILED: '失败',
}

// Coupon statuses for business list (simplified)
export const BIZ_COUPON_STATUS = {
  CREATING: '创建中',
  PENDING_CONFIRM: '待确认',
  CONFIRMED: '已确认',
}

// Status tag colors (antd Tag color prop)
export const ADMIN_TASK_STATUS_COLOR = {
  [ADMIN_TASK_STATUS.PARSING]: 'processing',
  [ADMIN_TASK_STATUS.RUNNING]: 'processing',
  [ADMIN_TASK_STATUS.PENDING_CONFIRM]: 'warning',
  [ADMIN_TASK_STATUS.COMPLETED]: 'success',
  [ADMIN_TASK_STATUS.PARTIAL_ERROR]: 'error',
  [ADMIN_TASK_STATUS.ERROR]: 'error',
}

export const ADMIN_COUPON_STATUS_COLOR = {
  [ADMIN_COUPON_STATUS.QUEUED]: 'default',
  [ADMIN_COUPON_STATUS.CREATING]: 'processing',
  [ADMIN_COUPON_STATUS.COMPLETED]: 'success',
  [ADMIN_COUPON_STATUS.FAILED]: 'error',
}

export const BIZ_TASK_STATUS_COLOR = {
  [BIZ_TASK_STATUS.RUNNING]: 'processing',
  [BIZ_TASK_STATUS.PENDING_CONFIRM]: 'warning',
  [BIZ_TASK_STATUS.COMPLETED]: 'success',
}

export const BIZ_COUPON_STATUS_COLOR = {
  [BIZ_COUPON_STATUS.CREATING]: 'processing',
  [BIZ_COUPON_STATUS.PENDING_CONFIRM]: 'warning',
  [BIZ_COUPON_STATUS.CONFIRMED]: 'success',
}

// Coupon execution steps (for admin coupon detail drawer timeline)
export const COUPON_EXEC_STEPS = [
  '解析参数',
  '填写表单',
  '校验',
  '生成草稿',
  '确认提交',
  '结果回传',
]

// Task progress steps (for admin task detail stepper)
export const TASK_PROGRESS_STEPS = ['解析', '执行', '待确认', '已完成']

// Mock coupon data keyed by task ID
const couponsByTask = {
  'TSK-20260308-001': [
    {
      id: 'CPN-001',
      name: '满30减5通用券',
      type: '满减',
      amount: '5元',
      scope: '全品类',
      validRange: '2026-03-10 ~ 03-25',
      stock: 8000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      duration: '4.8s',
      draftId: 'draft-20260310-001',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.1s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-002',
      name: '8折小程序专享券',
      type: '折扣',
      amount: '8折',
      scope: '小程序',
      validRange: '2026-03-10 ~ 03-25',
      stock: 3000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      duration: '5.2s',
      draftId: 'draft-20260310-002',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.5s' },
        { step: '校验', status: 'done', duration: '0.3s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-003',
      name: '新客立减10元券',
      type: '立减',
      amount: '10元',
      scope: '新客专享',
      validRange: '2026-03-08 ~ 03-31',
      stock: 2000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      duration: '4.5s',
      draftId: 'draft-20260310-003',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '2.9s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '0.9s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'done', duration: null },
      ],
      errors: [],
    },
  ],
  'TSK-20260310-002': [
    {
      id: 'CPN-004',
      name: '春季新品满50减10',
      type: '满减',
      amount: '10元',
      scope: '新品类目',
      validRange: '2026-03-15 ~ 04-15',
      stock: 5000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.CONFIRMED,
      duration: '5.0s',
      draftId: 'draft-20260311-001',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.3s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'done', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-005',
      name: '春季新品8.5折券',
      type: '折扣',
      amount: '8.5折',
      scope: '新品类目',
      validRange: '2026-03-15 ~ 04-15',
      stock: 3000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      duration: '4.7s',
      draftId: 'draft-20260311-002',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.0s' },
        { step: '校验', status: 'done', duration: '0.3s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-006',
      name: '春季新品立减5元',
      type: '立减',
      amount: '5元',
      scope: '全品类',
      validRange: '2026-03-15 ~ 04-15',
      stock: 8000,
      adminStatus: ADMIN_COUPON_STATUS.CREATING,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-007',
      name: '春季拉新20元券',
      type: '立减',
      amount: '20元',
      scope: '新客专享',
      validRange: '2026-03-15 ~ 04-15',
      stock: 2000,
      adminStatus: ADMIN_COUPON_STATUS.QUEUED,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-008',
      name: '春季满100减20',
      type: '满减',
      amount: '20元',
      scope: '全品类',
      validRange: '2026-03-15 ~ 04-15',
      stock: 4000,
      adminStatus: ADMIN_COUPON_STATUS.QUEUED,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
  ],
  'TSK-20260312-003': [
    {
      id: 'CPN-009',
      name: '会员日专属折扣券',
      type: '折扣',
      amount: '7折',
      scope: '全品类',
      validRange: '2026-03-15 ~ 03-15',
      stock: 10000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      duration: '6.1s',
      draftId: 'draft-20260312-001',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '4.2s' },
        { step: '校验', status: 'done', duration: '0.5s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-010',
      name: '会员日满减券',
      type: '满减',
      amount: '15元',
      scope: '全品类',
      validRange: '2026-03-15 ~ 03-15',
      stock: 5000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      duration: '5.3s',
      draftId: 'draft-20260312-002',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.6s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
  ],
  'TSK-20260314-004': [
    {
      id: 'CPN-011',
      name: '周年庆满100减30',
      type: '满减',
      amount: '30元',
      scope: '全品类',
      validRange: '2026-04-01 ~ 04-30',
      stock: 6000,
      adminStatus: ADMIN_COUPON_STATUS.FAILED,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'done', duration: '3.8s' },
        { step: '校验', status: 'failed', duration: '0.3s' },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['校验失败：有效期起始日期不能早于当前日期'],
    },
    {
      id: 'CPN-012',
      name: '周年庆8折券',
      type: '折扣',
      amount: '8折',
      scope: '全品类',
      validRange: '2026-04-01 ~ 04-30',
      stock: 8000,
      adminStatus: ADMIN_COUPON_STATUS.COMPLETED,
      bizStatus: BIZ_COUPON_STATUS.PENDING_CONFIRM,
      duration: '5.0s',
      draftId: 'draft-20260314-001',
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'done', duration: '3.2s' },
        { step: '校验', status: 'done', duration: '0.4s' },
        { step: '生成草稿', status: 'done', duration: '1.1s' },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-013',
      name: '周年庆新客立减15',
      type: '立减',
      amount: '15元',
      scope: '新客专享',
      validRange: '2026-04-01 ~ 04-30',
      stock: 3000,
      adminStatus: ADMIN_COUPON_STATUS.CREATING,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.2s' },
        { step: '填写表单', status: 'running', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
    {
      id: 'CPN-014',
      name: '周年庆满200减50',
      type: '满减',
      amount: '50元',
      scope: '全品类',
      validRange: '2026-04-01 ~ 04-30',
      stock: 2000,
      adminStatus: ADMIN_COUPON_STATUS.QUEUED,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'pending', duration: null },
        { step: '填写表单', status: 'pending', duration: null },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: [],
    },
  ],
  'TSK-20260315-005': [
    {
      id: 'CPN-015',
      name: '咖啡品类拉新5元券',
      type: '立减',
      amount: '5元',
      scope: '咖啡品类',
      validRange: '2026-03-20 ~ 04-20',
      stock: 10000,
      adminStatus: ADMIN_COUPON_STATUS.FAILED,
      bizStatus: BIZ_COUPON_STATUS.CREATING,
      duration: null,
      draftId: null,
      execSteps: [
        { step: '解析参数', status: 'done', duration: '0.3s' },
        { step: '填写表单', status: 'failed', duration: '2.1s' },
        { step: '校验', status: 'pending', duration: null },
        { step: '生成草稿', status: 'pending', duration: null },
        { step: '确认提交', status: 'pending', duration: null },
        { step: '结果回传', status: 'pending', duration: null },
      ],
      errors: ['填写表单失败：门店清单格式不匹配，缺少必填列"门店编码"'],
    },
  ],
}

// Mock tasks
export const tasks = [
  {
    id: 'TSK-20260308-001',
    name: '38女神节活动建券',
    source: 'OA审批',
    oaNumber: 'OA-2026-3842',
    activity: '38女神节全国大促',
    couponCount: 3,
    completedCount: 3,
    adminStatus: ADMIN_TASK_STATUS.COMPLETED,
    bizStatus: BIZ_TASK_STATUS.COMPLETED,
    confirmedCount: 3,
    creator: '陈悦',
    createdAt: '2026-03-08 14:20',
  },
  {
    id: 'TSK-20260310-002',
    name: '春季新品上市优惠券',
    source: 'OA审批',
    oaNumber: 'OA-2026-3901',
    activity: '春季新品发布会',
    couponCount: 5,
    completedCount: 2,
    adminStatus: ADMIN_TASK_STATUS.RUNNING,
    bizStatus: BIZ_TASK_STATUS.RUNNING,
    confirmedCount: 1,
    creator: '张文佳',
    createdAt: '2026-03-10 09:15',
  },
  {
    id: 'TSK-20260312-003',
    name: '会员日专属折扣券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4001',
    activity: '3月会员日活动',
    couponCount: 2,
    completedCount: 2,
    adminStatus: ADMIN_TASK_STATUS.PENDING_CONFIRM,
    bizStatus: BIZ_TASK_STATUS.PENDING_CONFIRM,
    confirmedCount: 0,
    creator: '林巧',
    createdAt: '2026-03-12 16:30',
  },
  {
    id: 'TSK-20260314-004',
    name: '门店周年庆满减券',
    source: 'OA审批',
    oaNumber: 'OA-2026-4012',
    activity: '春熙路店3周年',
    couponCount: 4,
    completedCount: 1,
    adminStatus: ADMIN_TASK_STATUS.PARTIAL_ERROR,
    bizStatus: BIZ_TASK_STATUS.RUNNING,
    confirmedCount: 0,
    creator: '路颖',
    createdAt: '2026-03-14 11:00',
  },
  {
    id: 'TSK-20260315-005',
    name: '咖啡品类拉新券',
    source: '手动上传',
    oaNumber: null,
    activity: '咖啡日均提升计划',
    couponCount: 1,
    completedCount: 0,
    adminStatus: ADMIN_TASK_STATUS.ERROR,
    bizStatus: BIZ_TASK_STATUS.RUNNING,
    confirmedCount: 0,
    creator: '方鸣',
    createdAt: '2026-03-15 08:45',
  },
]

// Helper: get coupons for a task
export function getCouponsForTask(taskId) {
  return couponsByTask[taskId] || []
}

// Helper: get a single task by ID
export function getTask(taskId) {
  return tasks.find((t) => t.id === taskId) || null
}

// Stats for admin dashboard
export function getAdminStats() {
  return {
    total: tasks.length,
    running: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.RUNNING).length,
    partialError: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.PARTIAL_ERROR).length,
    error: tasks.filter((t) => t.adminStatus === ADMIN_TASK_STATUS.ERROR).length,
  }
}

// Stats for biz dashboard
export function getBizStats() {
  return {
    pendingConfirm: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.PENDING_CONFIRM).length,
    running: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.RUNNING).length,
    completed: tasks.filter((t) => t.bizStatus === BIZ_TASK_STATUS.COMPLETED).length,
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/mock/data.js && git commit -m "feat: add mock data for tasks and coupons"
```

---

## Task 3: Layout — Top Navigation Bar

**Files:**
- Create: `src/layouts/TopNav.jsx`
- Create: `src/layouts/TopNav.module.css`

- [ ] **Step 1: Build TopNav component**

Matches 策略实验室 top nav style. Receives `activeKey` prop to highlight current section.

```jsx
import { useNavigate } from 'react-router-dom'
import styles from './TopNav.module.css'

const navItems = [
  { key: 'label', label: '标签智库', path: null },
  { key: 'event', label: '事件管理', path: null },
  { key: 'product', label: '产品实验', path: null },
  { key: 'marketing', label: '营销策略', path: null },
  { key: 'message', label: '消息中心', path: null },
  { key: 'cost', label: '成本中心', path: null },
  { key: 'ai-admin', label: 'AI 任务后台', path: '/admin' },
  { key: 'ai-biz', label: 'AI 建券', path: '/biz' },
]

export default function TopNav({ activeKey }) {
  const navigate = useNavigate()

  return (
    <header className={styles.topNav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>Q</span>
          <span className={styles.logoText}>策略实验室</span>
        </div>
        <nav className={styles.menu}>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`${styles.menuItem} ${activeKey === item.key ? styles.menuItemActive : ''}`}
              onClick={() => item.path && navigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.right}>
        <div className={styles.avatar}>何旭</div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Style TopNav**

```css
/* src/layouts/TopNav.module.css */
.topNav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.logoIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #52c41a;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.logoText {
  font-size: 15px;
  font-weight: 600;
  color: #1d2129;
}

.menu {
  display: flex;
  align-items: center;
  gap: 4px;
}

.menuItem {
  padding: 6px 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #4e5969;
  font-size: 14px;
  white-space: nowrap;
}

.menuItem:hover {
  background: #f7f8fa;
  color: #1d2129;
}

.menuItemActive {
  background: #f0f5ff;
  color: #1664ff;
  font-weight: 500;
}

.right {
  display: flex;
  align-items: center;
}

.avatar {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #1d2129;
  cursor: pointer;
}

.avatar::before {
  content: '';
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e6f4ff;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/TopNav.jsx src/layouts/TopNav.module.css && git commit -m "feat: build top navigation bar matching 策略实验室 style"
```

---

## Task 4: Layout — Admin Layout and Biz Layout

**Files:**
- Rewrite: `src/layouts/AdminLayout.jsx`
- Create: `src/layouts/AdminLayout.module.css`
- Rewrite: `src/layouts/BizLayout.jsx`
- Create: `src/layouts/BizLayout.module.css`

- [ ] **Step 1: Build AdminLayout**

```jsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import TopNav from './TopNav'
import styles from './AdminLayout.module.css'

const sideMenuItems = [
  { key: '/admin/tasks', icon: <UnorderedListOutlined />, label: '任务管理' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = location.pathname.startsWith('/admin/tasks') ? '/admin/tasks' : '/admin/tasks'

  return (
    <div className={styles.layout}>
      <TopNav activeKey="ai-admin" />
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>AI TASK CONSOLE</div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={sideMenuItems}
            onClick={({ key }) => navigate(key)}
            style={{ border: 'none' }}
          />
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Style AdminLayout**

```css
/* src/layouts/AdminLayout.module.css */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.body {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  min-width: 200px;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  padding-top: 16px;
}

.sidebarTitle {
  padding: 0 24px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #86909c;
  letter-spacing: 0.05em;
}

.content {
  flex: 1;
  padding: 24px;
  min-width: 0;
  overflow-y: auto;
}
```

- [ ] **Step 3: Build BizLayout**

```jsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { CreditCardOutlined, UploadOutlined } from '@ant-design/icons'
import TopNav from './TopNav'
import styles from './BizLayout.module.css'

const sideMenuItems = [
  { key: '/biz/tasks', icon: <CreditCardOutlined />, label: 'AI 建券' },
  { key: '/biz/upload', icon: <UploadOutlined />, label: 'Excel 上传' },
]

export default function BizLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  let selectedKey = '/biz/tasks'
  if (location.pathname.startsWith('/biz/upload')) selectedKey = '/biz/upload'

  return (
    <div className={styles.layout}>
      <TopNav activeKey="ai-biz" />
      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>AI 建券</div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={sideMenuItems}
            onClick={({ key }) => navigate(key)}
            style={{ border: 'none' }}
          />
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Style BizLayout** (same structure as AdminLayout)

```css
/* src/layouts/BizLayout.module.css */
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.body {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  min-width: 200px;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  padding-top: 16px;
}

.sidebarTitle {
  padding: 0 24px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #86909c;
  letter-spacing: 0.05em;
}

.content {
  flex: 1;
  padding: 24px;
  min-width: 0;
  overflow-y: auto;
}
```

- [ ] **Step 5: Verify layouts render with placeholders**

Open `http://localhost:5174/admin` and `http://localhost:5174/biz` — both should show the top nav, sidebar, and placeholder content area.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/ && git commit -m "feat: build admin and biz layouts with sidebar navigation"
```

---

## Task 5: Page 1 — Admin Task List

**Files:**
- Rewrite: `src/pages/admin/TaskList.jsx`
- Create: `src/pages/admin/TaskList.module.css`

- [ ] **Step 1: Build AdminTaskList page**

Uses antd `Card`, `Table`, `Tag`, `Input`, `Select`, `Progress`, `Space`, `Button` components.

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Input, Select, Space, Progress, Button, Row, Col, Statistic } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  tasks,
  getAdminStats,
  ADMIN_TASK_STATUS,
  ADMIN_TASK_STATUS_COLOR,
} from '../../mock/data'
import styles from './TaskList.module.css'

const statusOptions = [
  { value: '', label: '全部状态' },
  ...Object.values(ADMIN_TASK_STATUS).map((s) => ({ value: s, label: s })),
]

const sourceOptions = [
  { value: '', label: '全部来源' },
  { value: 'OA审批', label: 'OA审批' },
  { value: '手动上传', label: '手动上传' },
]

export default function TaskList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  const stats = getAdminStats()

  const filtered = tasks.filter((t) => {
    if (search && !t.id.includes(search) && !t.name.includes(search)) return false
    if (statusFilter && t.adminStatus !== statusFilter) return false
    if (sourceFilter && t.source !== sourceFilter) return false
    return true
  })

  const columns = [
    { title: '任务编号', dataIndex: 'id', key: 'id', width: 180 },
    { title: '任务名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '来源', dataIndex: 'source', key: 'source', width: 100 },
    {
      title: 'OA单号',
      dataIndex: 'oaNumber',
      key: 'oaNumber',
      width: 140,
      render: (v) => v || '—',
    },
    { title: '券数量', dataIndex: 'couponCount', key: 'couponCount', width: 80 },
    {
      title: '完成进度',
      key: 'progress',
      width: 150,
      render: (_, record) => (
        <Space>
          <Progress
            percent={Math.round((record.completedCount / record.couponCount) * 100)}
            size="small"
            style={{ width: 80 }}
            showInfo={false}
          />
          <span style={{ fontSize: 13, color: '#4e5969' }}>
            {record.completedCount}/{record.couponCount}
          </span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'adminStatus',
      key: 'adminStatus',
      width: 100,
      render: (status) => <Tag color={ADMIN_TASK_STATUS_COLOR[status]}>{status}</Tag>,
    },
    { title: '发起人', dataIndex: 'creator', key: 'creator', width: 80 },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => navigate(`/admin/tasks/${record.id}`)}>
            查看详情
          </Button>
          {(record.adminStatus === ADMIN_TASK_STATUS.ERROR ||
            record.adminStatus === ADMIN_TASK_STATUS.PARTIAL_ERROR) && (
            <Button type="link" size="small" danger>
              重试
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>任务管理</h1>
        <p className={styles.subtitle}>AI 自动化任务管理</p>
      </div>

      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card size="small"><Statistic title="总任务数" value={stats.total} /></Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="执行中" value={stats.running} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="部分异常" value={stats.partialError} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="异常" value={stats.error} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      <Card size="small" className={styles.filterCard}>
        <Space wrap>
          <Input
            placeholder="搜索任务编号或名称"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            style={{ width: 140 }}
          />
          <Select
            value={sourceFilter}
            onChange={setSourceFilter}
            options={sourceOptions}
            style={{ width: 140 }}
          />
        </Space>
      </Card>

      <Card size="small">
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            defaultPageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Style AdminTaskList**

```css
/* src/pages/admin/TaskList.module.css */
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  margin-bottom: 8px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: #86909c;
}

.statsRow {
  margin-bottom: 0;
}

.filterCard {
  margin-bottom: 0;
}
```

- [ ] **Step 3: Verify page renders**

Open `http://localhost:5174/admin` — should show stats cards, filters, and task table with mock data.

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/TaskList.jsx src/pages/admin/TaskList.module.css && git commit -m "feat: build admin task list page with stats, filters, and table"
```

---

## Task 6: Page 2 — Admin Task Detail

**Files:**
- Rewrite: `src/pages/admin/TaskDetail.jsx`
- Create: `src/pages/admin/TaskDetail.module.css`

- [ ] **Step 1: Build AdminTaskDetail page**

Uses antd `Breadcrumb`, `Steps`, `Table`, `Tag`, `Card`, `Descriptions`, `Button`, `Space`.

```jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Steps, Table, Tag, Card, Descriptions, Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  getTask,
  getCouponsForTask,
  ADMIN_TASK_STATUS,
  ADMIN_TASK_STATUS_COLOR,
  ADMIN_COUPON_STATUS,
  ADMIN_COUPON_STATUS_COLOR,
  TASK_PROGRESS_STEPS,
} from '../../mock/data'
import CouponDrawer from './CouponDrawer'
import styles from './TaskDetail.module.css'

function getStepStatus(taskStatus) {
  const isError = taskStatus === ADMIN_TASK_STATUS.ERROR || taskStatus === ADMIN_TASK_STATUS.PARTIAL_ERROR
  switch (taskStatus) {
    case ADMIN_TASK_STATUS.PARSING: return { current: 0, status: 'process' }
    case ADMIN_TASK_STATUS.RUNNING: return { current: 1, status: 'process' }
    case ADMIN_TASK_STATUS.PENDING_CONFIRM: return { current: 2, status: 'process' }
    case ADMIN_TASK_STATUS.COMPLETED: return { current: 3, status: 'finish' }
    case ADMIN_TASK_STATUS.PARTIAL_ERROR: return { current: 1, status: 'error' }
    case ADMIN_TASK_STATUS.ERROR: return { current: 1, status: 'error' }
    default: return { current: 0, status: 'process' }
  }
}

export default function TaskDetail() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [drawerCoupon, setDrawerCoupon] = useState(null)

  const task = getTask(taskId)
  const coupons = getCouponsForTask(taskId)

  if (!task) {
    return <div>任务不存在</div>
  }

  const stepInfo = getStepStatus(task.adminStatus)

  const columns = [
    { title: '券名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '券类型', dataIndex: 'type', key: 'type', width: 80 },
    { title: '面额', dataIndex: 'amount', key: 'amount', width: 80 },
    {
      title: '券状态',
      dataIndex: 'adminStatus',
      key: 'adminStatus',
      width: 100,
      render: (status) => <Tag color={ADMIN_COUPON_STATUS_COLOR[status]}>{status}</Tag>,
    },
    {
      title: '耗时',
      dataIndex: 'duration',
      key: 'duration',
      width: 80,
      render: (v) => v || '—',
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => setDrawerCoupon(record)}>
            查看详情
          </Button>
          {record.adminStatus === ADMIN_COUPON_STATUS.FAILED && (
            <Button type="link" size="small" danger>
              重试
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[
          { title: <a onClick={() => navigate('/admin/tasks')}>任务管理</a> },
          { title: task.id },
        ]}
      />

      <div className={styles.header}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate('/admin/tasks')}
        />
        <h1 className={styles.title}>{task.id}</h1>
        <Tag color={ADMIN_TASK_STATUS_COLOR[task.adminStatus]}>{task.adminStatus}</Tag>
      </div>
      <p className={styles.taskName}>{task.name}</p>

      <Card size="small">
        <Descriptions column={5} size="small">
          <Descriptions.Item label="OA单号">
            {task.oaNumber ? (
              <a>{task.oaNumber}</a>
            ) : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="来源">{task.source}</Descriptions.Item>
          <Descriptions.Item label="关联活动">{task.activity}</Descriptions.Item>
          <Descriptions.Item label="发起人">{task.creator}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{task.createdAt}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card size="small" title="任务进度">
        <Steps
          current={stepInfo.current}
          status={stepInfo.status}
          items={TASK_PROGRESS_STEPS.map((title) => ({ title }))}
        />
      </Card>

      <Card
        size="small"
        title="券清单"
        extra={<span style={{ color: '#86909c', fontSize: 13 }}>共 {coupons.length} 张，已完成 {task.completedCount}/{task.couponCount}</span>}
      >
        <Table
          dataSource={coupons}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={false}
        />
      </Card>

      <CouponDrawer
        coupon={drawerCoupon}
        onClose={() => setDrawerCoupon(null)}
      />
    </div>
  )
}
```

- [ ] **Step 2: Style AdminTaskDetail**

```css
/* src/pages/admin/TaskDetail.module.css */
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
}

.taskName {
  margin: -8px 0 0;
  font-size: 14px;
  color: #86909c;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/admin/TaskDetail.jsx src/pages/admin/TaskDetail.module.css && git commit -m "feat: build admin task detail page with stepper and coupon table"
```

---

## Task 7: Page 3 — Coupon Detail Drawer

**Files:**
- Rewrite: `src/pages/admin/CouponDrawer.jsx`
- Create: `src/pages/admin/CouponDrawer.module.css`

- [ ] **Step 1: Build CouponDrawer component**

Uses antd `Drawer`, `Descriptions`, `Timeline`, `Tag`, `Button`, `Alert`.

```jsx
import { Drawer, Descriptions, Timeline, Tag, Button, Space, Alert } from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { ADMIN_COUPON_STATUS, ADMIN_COUPON_STATUS_COLOR } from '../../mock/data'
import styles from './CouponDrawer.module.css'

const stepIconMap = {
  done: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  running: <SyncOutlined spin style={{ color: '#1677ff' }} />,
  pending: <MinusCircleOutlined style={{ color: '#d9d9d9' }} />,
  failed: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
}

const stepColorMap = {
  done: 'green',
  running: 'blue',
  pending: 'gray',
  failed: 'red',
}

export default function CouponDrawer({ coupon, onClose }) {
  if (!coupon) return null

  return (
    <Drawer
      title={
        <Space>
          <span>{coupon.name}</span>
          <Tag color={ADMIN_COUPON_STATUS_COLOR[coupon.adminStatus]}>{coupon.adminStatus}</Tag>
        </Space>
      }
      open={!!coupon}
      onClose={onClose}
      width={400}
    >
      <div className={styles.section}>
        <div className={styles.sectionTitle}>券基本信息</div>
        <Descriptions column={2} size="small">
          <Descriptions.Item label="券名称" span={2}>{coupon.name}</Descriptions.Item>
          <Descriptions.Item label="券类型">{coupon.type}</Descriptions.Item>
          <Descriptions.Item label="面额">{coupon.amount}</Descriptions.Item>
          <Descriptions.Item label="适用范围">{coupon.scope}</Descriptions.Item>
          <Descriptions.Item label="库存">{coupon.stock?.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="有效期" span={2}>{coupon.validRange}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>执行链路</div>
        <Timeline
          items={coupon.execSteps.map((step) => ({
            dot: stepIconMap[step.status],
            color: stepColorMap[step.status],
            children: (
              <div className={styles.timelineItem}>
                <span>{step.step}</span>
                {step.duration && <span className={styles.duration}>{step.duration}</span>}
              </div>
            ),
          }))}
        />
      </div>

      {coupon.draftId && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>草稿链接</div>
          <a>{coupon.draftId}</a>
        </div>
      )}

      {coupon.errors.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>异常记录</div>
          {coupon.errors.map((err, i) => (
            <Alert key={i} message={err} type="error" showIcon style={{ marginBottom: 8 }} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        {coupon.adminStatus === ADMIN_COUPON_STATUS.FAILED && (
          <Button type="primary" danger block>
            重试
          </Button>
        )}
        {coupon.adminStatus === ADMIN_COUPON_STATUS.COMPLETED && coupon.draftId && (
          <Button type="primary" block>
            去确认草稿
          </Button>
        )}
      </div>
    </Drawer>
  )
}
```

- [ ] **Step 2: Style CouponDrawer**

```css
/* src/pages/admin/CouponDrawer.module.css */
.section {
  margin-bottom: 24px;
}

.sectionTitle {
  font-size: 14px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 12px;
}

.timelineItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.duration {
  font-size: 12px;
  color: #86909c;
}

.footer {
  margin-top: 24px;
}
```

- [ ] **Step 3: Verify admin pages end-to-end**

Open `http://localhost:5174/admin` → click "查看详情" on a task → see task detail with stepper and coupon table → click "查看详情" on a coupon → see drawer slide in with execution timeline.

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/CouponDrawer.jsx src/pages/admin/CouponDrawer.module.css && git commit -m "feat: build coupon detail drawer with execution timeline"
```

---

## Task 8: Page 4 — Business Task List

**Files:**
- Rewrite: `src/pages/biz/BizTaskList.jsx`
- Create: `src/pages/biz/BizTaskList.module.css`

- [ ] **Step 1: Build BizTaskList page**

Similar to admin task list but simplified: fewer stats, fewer columns, no error states visible, upload button.

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Input, Select, Space, Progress, Button, Row, Col, Statistic } from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import {
  tasks,
  getBizStats,
  BIZ_TASK_STATUS,
  BIZ_TASK_STATUS_COLOR,
} from '../../mock/data'
import styles from './BizTaskList.module.css'

const statusOptions = [
  { value: '', label: '全部状态' },
  ...Object.values(BIZ_TASK_STATUS).map((s) => ({ value: s, label: s })),
]

export default function BizTaskList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const stats = getBizStats()

  const filtered = tasks.filter((t) => {
    if (search && !t.name.includes(search)) return false
    if (statusFilter && t.bizStatus !== statusFilter) return false
    return true
  })

  const columns = [
    { title: '任务名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '券数量', dataIndex: 'couponCount', key: 'couponCount', width: 80 },
    {
      title: '完成进度',
      key: 'progress',
      width: 150,
      render: (_, record) => (
        <Space>
          <Progress
            percent={Math.round((record.confirmedCount / record.couponCount) * 100)}
            size="small"
            style={{ width: 80 }}
            showInfo={false}
          />
          <span style={{ fontSize: 13, color: '#4e5969' }}>
            {record.confirmedCount}/{record.couponCount}
          </span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'bizStatus',
      key: 'bizStatus',
      width: 100,
      render: (status) => <Tag color={BIZ_TASK_STATUS_COLOR[status]}>{status}</Tag>,
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => navigate(`/biz/tasks/${record.id}`)}>
          查看详情
        </Button>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>AI 建券</h1>
          <p className={styles.subtitle}>AI 自动创建优惠券</p>
        </div>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => navigate('/biz/upload')}
        >
          上传 Excel 建券
        </Button>
      </div>

      <Row gutter={16} className={styles.statsRow}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="待确认" value={stats.pendingConfirm} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="执行中" value={stats.running} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="已完成" value={stats.completed} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
      </Row>

      <Card size="small" className={styles.filterCard}>
        <Space wrap>
          <Input
            placeholder="搜索任务名称"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            style={{ width: 140 }}
          />
        </Space>
      </Card>

      <Card size="small">
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            defaultPageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Style BizTaskList**

```css
/* src/pages/biz/BizTaskList.module.css */
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.headerRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: #86909c;
}

.statsRow {
  margin-bottom: 0;
}

.filterCard {
  margin-bottom: 0;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/biz/BizTaskList.jsx src/pages/biz/BizTaskList.module.css && git commit -m "feat: build business task list page with simplified view"
```

---

## Task 9: Page 5 — Business Task Detail

**Files:**
- Rewrite: `src/pages/biz/BizTaskDetail.jsx`
- Create: `src/pages/biz/BizTaskDetail.module.css`

- [ ] **Step 1: Build BizTaskDetail page**

Simplified detail page with coupon list and "去确认" action buttons.

```jsx
import { useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Table, Tag, Card, Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  getTask,
  getCouponsForTask,
  BIZ_TASK_STATUS_COLOR,
  BIZ_COUPON_STATUS,
  BIZ_COUPON_STATUS_COLOR,
} from '../../mock/data'
import styles from './BizTaskDetail.module.css'

export default function BizTaskDetail() {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const task = getTask(taskId)
  const coupons = getCouponsForTask(taskId)

  if (!task) {
    return <div>任务不存在</div>
  }

  const columns = [
    { title: '券名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '券类型', dataIndex: 'type', key: 'type', width: 80 },
    { title: '面额', dataIndex: 'amount', key: 'amount', width: 80 },
    {
      title: '状态',
      dataIndex: 'bizStatus',
      key: 'bizStatus',
      width: 100,
      render: (status) => <Tag color={BIZ_COUPON_STATUS_COLOR[status]}>{status}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        record.bizStatus === BIZ_COUPON_STATUS.PENDING_CONFIRM ? (
          <Button type="link" size="small">
            去确认
          </Button>
        ) : null
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[
          { title: <a onClick={() => navigate('/biz/tasks')}>AI 建券</a> },
          { title: task.name },
        ]}
      />

      <div className={styles.header}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate('/biz/tasks')}
        />
        <h1 className={styles.title}>{task.name}</h1>
        <Tag color={BIZ_TASK_STATUS_COLOR[task.bizStatus]}>{task.bizStatus}</Tag>
      </div>
      <p className={styles.progressText}>确认进度：已确认 {task.confirmedCount}/{task.couponCount}</p>

      <Card size="small" title="券清单">
        <Table
          dataSource={coupons}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={false}
        />
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Style BizTaskDetail**

```css
/* src/pages/biz/BizTaskDetail.module.css */
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
}

.progressText {
  margin: -8px 0 0;
  font-size: 14px;
  color: #86909c;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/biz/BizTaskDetail.jsx src/pages/biz/BizTaskDetail.module.css && git commit -m "feat: build business task detail page with confirm actions"
```

---

## Task 10: Page 6 — Excel Upload

**Files:**
- Rewrite: `src/pages/biz/ExcelUpload.jsx`
- Create: `src/pages/biz/ExcelUpload.module.css`

- [ ] **Step 1: Build ExcelUpload page**

Uses antd `Upload.Dragger`, `Card`, `Table`, `Button`, `message`. Mock parsing behavior on file select.

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Upload, Button, Table, Statistic, Row, Col, message, Space } from 'antd'
import { InboxOutlined, FileExcelOutlined } from '@ant-design/icons'
import styles from './ExcelUpload.module.css'

const { Dragger } = Upload

// Mock parsed result shown after both files are uploaded
const mockParsedCoupons = [
  { key: '1', name: '满50减10通用券', type: '满减', amount: '10元', scope: '全品类' },
  { key: '2', name: '新品8折券', type: '折扣', amount: '8折', scope: '新品类目' },
  { key: '3', name: '新客立减5元', type: '立减', amount: '5元', scope: '新客专享' },
]

const parsedColumns = [
  { title: '券名称', dataIndex: 'name', key: 'name' },
  { title: '券类型', dataIndex: 'type', key: 'type', width: 80 },
  { title: '面额', dataIndex: 'amount', key: 'amount', width: 80 },
  { title: '适用范围', dataIndex: 'scope', key: 'scope', width: 120 },
]

export default function ExcelUpload() {
  const navigate = useNavigate()
  const [couponFile, setCouponFile] = useState(null)
  const [storeFile, setStoreFile] = useState(null)

  const bothUploaded = couponFile && storeFile

  const uploadProps = (setter) => ({
    accept: '.xlsx,.xls,.csv',
    maxCount: 1,
    beforeUpload: (file) => {
      setter(file)
      return false // prevent actual upload
    },
    onRemove: () => setter(null),
  })

  const handleCreate = () => {
    message.success('任务创建成功，即将跳转任务列表')
    setTimeout(() => navigate('/biz/tasks'), 1500)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>上传 Excel 建券</h1>
      <p className={styles.subtitle}>上传建券字段和门店清单 Excel，系统将自动解析并创建建券任务</p>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="建券字段 Excel">
            <Dragger {...uploadProps(setCouponFile)}>
              <p className="ant-upload-drag-icon"><FileExcelOutlined /></p>
              <p className="ant-upload-text">点击或拖拽上传建券字段 Excel</p>
              <p className="ant-upload-hint">支持 .xlsx / .xls / .csv</p>
            </Dragger>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="门店清单 Excel">
            <Dragger {...uploadProps(setStoreFile)}>
              <p className="ant-upload-drag-icon"><FileExcelOutlined /></p>
              <p className="ant-upload-text">点击或拖拽上传门店清单 Excel</p>
              <p className="ant-upload-hint">支持 .xlsx / .xls / .csv</p>
            </Dragger>
          </Card>
        </Col>
      </Row>

      {bothUploaded && (
        <Card size="small" title="解析预览" className={styles.previewCard}>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Statistic title="识别券数量" value={mockParsedCoupons.length} suffix="张" />
            </Col>
            <Col span={8}>
              <Statistic title="门店数量" value={128} suffix="家" />
            </Col>
          </Row>
          <Table
            dataSource={mockParsedCoupons}
            columns={parsedColumns}
            size="small"
            pagination={false}
          />
        </Card>
      )}

      <div className={styles.footer}>
        <Space>
          <Button onClick={() => navigate('/biz/tasks')}>取消</Button>
          <Button type="primary" disabled={!bothUploaded} onClick={handleCreate}>
            开始创建任务
          </Button>
        </Space>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Style ExcelUpload**

```css
/* src/pages/biz/ExcelUpload.module.css */
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: #86909c;
}

.previewCard {
  margin-top: 0;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
```

- [ ] **Step 3: Verify all biz pages end-to-end**

Open `http://localhost:5174/biz` → see simplified task list with upload button → click "上传 Excel 建券" → see upload page → click "查看详情" on a task → see business detail with confirm buttons.

- [ ] **Step 4: Commit**

```bash
git add src/pages/biz/ExcelUpload.jsx src/pages/biz/ExcelUpload.module.css && git commit -m "feat: build Excel upload page with parsing preview"
```

---

## Task 11: Cleanup and Final Verification

**Files:**
- Delete: `src/App.css` (unused)
- Delete: `src/data/pages.js` (old mock data, unused)

- [ ] **Step 1: Remove unused files**

```bash
rm src/App.css src/data/pages.js
rmdir src/data 2>/dev/null || true
```

- [ ] **Step 2: Verify all 6 pages work**

Test the full navigation flow:

1. `http://localhost:5174/admin` → Admin task list with stats + filters + table
2. Click a task → Admin task detail with stepper + coupon table
3. Click a coupon "查看详情" → Drawer slides in with execution timeline
4. `http://localhost:5174/biz` → Business task list with upload button
5. Click "上传 Excel 建券" → Excel upload page with dual upload areas
6. Click a task "查看详情" → Business task detail with confirm buttons
7. Top nav switches between admin and biz correctly

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "chore: remove unused files, cleanup complete"
```
