import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Breadcrumb, Steps, Table, Tag, Card, Descriptions, Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {
  getTask,
  getSubTasksForTask,
  ADMIN_TASK_STATUS,
  ADMIN_TASK_STATUS_COLOR,
  ADMIN_COUPON_STATUS,
  ADMIN_COUPON_STATUS_COLOR,
  BIZ_TASK_STATUS_COLOR,
  BIZ_COUPON_STATUS,
  BIZ_COUPON_STATUS_COLOR,
  TASK_PROGRESS_STEPS,
} from '../../mock/data'
import SubTaskDrawer from './SubTaskDrawer'
import styles from './TaskDetail.module.css'

function getStepStatus(taskStatus) {
  switch (taskStatus) {
    case ADMIN_TASK_STATUS.QUEUED: return { current: 0, status: 'process' }
    case ADMIN_TASK_STATUS.PARSING: return { current: 1, status: 'process' }
    case ADMIN_TASK_STATUS.CREATING: return { current: 2, status: 'process' }
    case ADMIN_TASK_STATUS.PENDING_CONFIRM: return { current: 3, status: 'process' }
    case ADMIN_TASK_STATUS.COMPLETED: return { current: 4, status: 'finish' }
    case ADMIN_TASK_STATUS.PARTIAL_ERROR: return { current: 2, status: 'error' }
    case ADMIN_TASK_STATUS.ERROR: return { current: 2, status: 'error' }
    default: return { current: 0, status: 'process' }
  }
}

export default function TaskDetail({ mode = 'admin' }) {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [drawerSubTask, setDrawerSubTask] = useState(null)

  const isAdmin = mode === 'admin'
  const task = getTask(taskId)
  const subTasks = getSubTasksForTask(taskId)

  if (!task) {
    return <div>任务不存在</div>
  }

  const backPath = isAdmin ? '/admin/tasks' : '/biz/tasks'

  const adminColumns = [
    { title: '编号', dataIndex: 'id', key: 'id', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '类型', dataIndex: 'skillType', key: 'skillType', width: 80 },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
          <Button type="link" size="small" onClick={() => setDrawerSubTask(record)}>
            查看详情
          </Button>
          {record.status === ADMIN_COUPON_STATUS.FAILED && (
            <Button type="link" size="small" danger>
              重试
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const bizColumns = [
    { title: '券名称', dataIndex: 'name', key: 'name', ellipsis: true },
    {
      title: '券类型',
      key: 'extType',
      width: 80,
      render: (_, record) => record.ext?.type,
    },
    {
      title: '面额',
      key: 'extAmount',
      width: 80,
      render: (_, record) => record.ext?.amount,
    },
    {
      title: '状态',
      key: 'bizStatus',
      width: 100,
      render: (_, record) => (
        <Tag color={BIZ_COUPON_STATUS_COLOR[record.ext?.bizStatus]}>{record.ext?.bizStatus}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        record.ext?.bizStatus === BIZ_COUPON_STATUS.PENDING_CONFIRM ? (
          <Button type="link" size="small">
            去确认
          </Button>
        ) : null
      ),
    },
  ]

  if (isAdmin) {
    const stepInfo = getStepStatus(task.adminStatus)

    return (
      <div className={styles.page}>
        <Breadcrumb
          items={[
            { title: <a onClick={() => navigate(backPath)}>任务管理</a> },
            { title: task.id },
          ]}
        />

        <div className={styles.header}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            onClick={() => navigate(backPath)}
          />
          <h1 className={styles.title}>{task.id}</h1>
          <Tag color={ADMIN_TASK_STATUS_COLOR[task.adminStatus]}>{task.adminStatus}</Tag>
        </div>
        <p className={styles.taskName}>{task.name}</p>

        <Card size="small">
          <Descriptions column={6} size="small">
            <Descriptions.Item label="OA单号">
              {task.oaNumber ? <a>{task.oaNumber}</a> : '—'}
            </Descriptions.Item>
            <Descriptions.Item label="来源">{task.source}</Descriptions.Item>
            <Descriptions.Item label="Skill类型">{task.skillType}</Descriptions.Item>
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
          title="子任务清单"
          extra={<span style={{ color: '#86909c', fontSize: 13 }}>共 {subTasks.length} 个，已完成 {task.completedCount}/{task.subTaskCount}</span>}
        >
          <Table
            dataSource={subTasks}
            columns={adminColumns}
            rowKey="id"
            size="middle"
            pagination={false}
          />
        </Card>

        <SubTaskDrawer
          subTask={drawerSubTask}
          onClose={() => setDrawerSubTask(null)}
        />
      </div>
    )
  }

  // Biz mode
  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[
          { title: <a onClick={() => navigate(backPath)}>AI 建券</a> },
          { title: task.name },
        ]}
      />

      <div className={styles.header}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => navigate(backPath)}
        />
        <h1 className={styles.title}>{task.name}</h1>
        <Tag color={BIZ_TASK_STATUS_COLOR[task.bizStatus]}>{task.bizStatus}</Tag>
      </div>
      <p className={styles.progressText}>确认进度：已确认 {task.confirmedCount}/{task.subTaskCount}</p>

      <Card size="small" title="券清单">
        <Table
          dataSource={subTasks}
          columns={bizColumns}
          rowKey="id"
          size="middle"
          pagination={false}
        />
      </Card>
    </div>
  )
}
