import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tag, Input, Select, Space, Progress, Button, Row, Col, Statistic } from 'antd'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import {
  tasks,
  getBizStats,
  BIZ_TASK_STATUS,
  BIZ_TASK_STATUS_COLOR,
} from '../../mock/data'
import styles from './BizTaskList.module.css'

const statusOptions = [
  { value: '', label: '全部状态' },
  ...Object.values(BIZ_TASK_STATUS).map((s) => ({ value: s, label: s })),
]

export default function BizTaskList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const stats = getBizStats()

  const filtered = tasks.filter((t) => {
    if (search && !t.name.includes(search)) return false
    if (statusFilter && t.bizStatus !== statusFilter) return false
    return true
  })

  const columns = [
    { title: '任务名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '券数量', dataIndex: 'couponCount', key: 'couponCount', width: 80 },
    {
      title: '完成进度',
      key: 'progress',
      width: 150,
      render: (_, record) => (
        <Space>
          <Progress
            percent={Math.round((record.confirmedCount / record.couponCount) * 100)}
            size="small"
            style={{ width: 80 }}
            showInfo={false}
          />
          <span style={{ fontSize: 13, color: '#4e5969' }}>
            {record.confirmedCount}/{record.couponCount}
          </span>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'bizStatus',
      key: 'bizStatus',
      width: 100,
      render: (status) => <Tag color={BIZ_TASK_STATUS_COLOR[status]}>{status}</Tag>,
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 160 },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => navigate(`/biz/tasks/${record.id}`)}>
          查看详情
        </Button>
      ),
    },
  ]

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>AI 建券</h1>
          <p className={styles.subtitle}>AI 自动创建优惠券</p>
        </div>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => navigate('/biz/upload')}
        >
          上传 Excel 建券
        </Button>
      </div>

      <Row gutter={16} className={styles.statsRow}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="待确认" value={stats.pendingConfirm} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="执行中" value={stats.running} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="已完成" value={stats.completed} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
      </Row>

      <Card size="small" className={styles.filterCard}>
        <Space wrap>
          <Input
            placeholder="搜索任务名称"
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
