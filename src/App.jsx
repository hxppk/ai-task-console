import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import BizLayout from './layouts/BizLayout'
import TaskList from './pages/admin/TaskList'
import TaskDetail from './pages/admin/TaskDetail'
import ExcelUpload from './pages/biz/ExcelUpload'

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<TaskList mode="admin" />} />
        <Route path="tasks" element={<TaskList mode="admin" />} />
        <Route path="tasks/:taskId" element={<TaskDetail mode="admin" />} />
      </Route>
      <Route path="/biz" element={<BizLayout />}>
        <Route index element={<TaskList mode="biz" />} />
        <Route path="tasks" element={<TaskList mode="biz" />} />
        <Route path="tasks/:taskId" element={<TaskDetail mode="biz" />} />
        <Route path="upload" element={<ExcelUpload />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default App
