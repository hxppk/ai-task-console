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
