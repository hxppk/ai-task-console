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
