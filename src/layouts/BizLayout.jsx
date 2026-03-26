import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { FileTextOutlined, RobotOutlined } from '@ant-design/icons'
import TopNav from './TopNav'
import styles from './BizLayout.module.css'

const bizNavItems = [
  { key: 'home', label: '首页', path: null },
  { key: 'marketing', label: '营销中心', path: null },
  { key: 'reward', label: '奖励中心', path: '/biz' },
  { key: 'member', label: '会员', path: null },
  { key: 'tech', label: '技术中心', path: null },
  { key: 'region', label: '区域工作台', path: null },
  { key: 'ai-admin', label: 'AI 任务后台', path: '/admin' },
]

const bizBrand = { icon: '✓', text: '会员营销', color: '#1677ff' }

const sideMenuItems = [
  { key: '/biz/coupon-templates', icon: <FileTextOutlined />, label: '优惠券模板管理', disabled: true },
  { key: '/biz/tasks', icon: <RobotOutlined />, label: 'AI 智能建券' },
]

export default function BizLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  let selectedKey = '/biz/tasks'
  if (location.pathname.startsWith('/biz/upload')) selectedKey = '/biz/tasks'

  return (
    <div className={styles.layout}>
      <TopNav activeKey="reward" navItems={bizNavItems} brand={bizBrand} />
      <div className={styles.body}>
        <aside className={styles.sidebar}>
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
