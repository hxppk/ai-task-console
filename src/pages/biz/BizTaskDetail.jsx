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
