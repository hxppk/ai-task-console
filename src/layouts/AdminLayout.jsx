import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import TopNav from './TopNav'
import styles from './AdminLayout.module.css'

const sideMenuItems = [
  { key: '/admin/tasks', icon: <UnorderedListOutlined />, label: '任务管理' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const selectedKey = '/admin/tasks'

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
