import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Input, Select, Space, Progress, Button, Row, Col, Statistic } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {
  tasks,
  getAdminStats,
  ADMIN_TASK_STATUS,
  ADMIN_TASK_STATUS_COLOR,
} from '../../mock/data'
import styles from './TaskList.module.css'

const statusOptions = [
  { value: '', label: '全部状态' },
  ...Object.values(ADMIN_TASK_STATUS).map((s) => ({ value: s, label: s })),
]

const sourceOptions = [
  { value: '', label: '全部来源' },
  { value: 'OA审批', label: 'OA审批' },
  { value: '手动上传', label: '手动上传' },
]

export default function TaskList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  const stats = getAdminStats()

  const filtered = tasks.filter((t) => {
    if (search && !t.id.includes(search) && !t.name.includes(search)) return false
    if (statusFilter && t.adminStatus !== statusFilter) return false
    if (sourceFilter && t.source !== sourceFilter) return false
    return true
  })

  const columns = [
    { title: '任务编号', dataIndex: 'id', key: 'id', width: 180 },
    { title: '任务名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '来源', dataIndex: 'source', key: 'source', width: 100 },
    {
      title: 'OA单号',
      dataIndex: 'oaNumber',
      key: 'oaNumber',
      width: 140,
      render: (v) => v || '—',
    },
    { title: '券数量', dataIndex: 'couponCount', key: 'couponCount', width: 80 },
    {
      title: '完成进度',
      key: 'progress',
      width: 150,
      render: (_, record) => (
        <Space>
          <Progress
            percent={Math.round((record.completedCount / record.couponCount) * 100)}
            size="small"
            style={{ width: 80 }}
            showInfo={false}
          />
          <span style={{ fontSize: 13, color: '#4e5969' }}>
            {record.completedCount}/{record.couponCount}
          </span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'adminStatus',
      key: 'adminStatus',
      width: 100,
      render: (status) => <Tag color={ADMIN_TASK_STATUS_COLOR[status]}>{status}</Tag>,
    },
    { title: '发起人', dataIndex: 'creator', key: 'creator', width: 80 },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
    {
      title: '操作',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" onClick={() => navigate(`/admin/tasks/${record.id}`)}>
            查看详情
          </Button>
          {(record.adminStatus === ADMIN_TASK_STATUS.ERROR ||
            record.adminStatus === ADMIN_TASK_STATUS.PARTIAL_ERROR) && (
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
      <div className={styles.header}>
        <h1 className={styles.title}>任务管理</h1>
        <p className={styles.subtitle}>AI 自动化任务管理</p>
      </div>

      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card size="small"><Statistic title="总任务数" value={stats.total} /></Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="执行中" value={stats.running} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="部分异常" value={stats.partialError} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="异常" value={stats.error} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      <Card size="small" className={styles.filterCard}>
        <Space wrap>
          <Input
            placeholder="搜索任务编号或名称"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            style={{ width: 140 }}
          />
          <Select
            value={sourceFilter}
            onChange={setSourceFilter}
            options={sourceOptions}
            style={{ width: 140 }}
          />
        </Space>
      </Card>

      <Card size="small">
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            defaultPageSize: 10,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  )
}
