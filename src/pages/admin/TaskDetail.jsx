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
            {task.oaNumber ? <a>{task.oaNumber}</a> : '—'}
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
