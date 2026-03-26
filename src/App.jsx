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
