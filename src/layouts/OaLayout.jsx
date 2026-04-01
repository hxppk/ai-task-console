import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import styles from './OaLayout.module.css'

export default function OaLayout() {
  return (
    <div className={styles.layout}>
      <TopNav activeKey="oa" />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
