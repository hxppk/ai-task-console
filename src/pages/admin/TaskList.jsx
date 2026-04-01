import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table, Tabs, Tag, Input, Select, Space, Progress, Button, Row, Col, Statistic, Pagination, DatePicker, Empty, Badge } from 'antd'
import { SearchOutlined, DownOutlined } from '@ant-design/icons'
import AiAssistantPanel from '../../components/ai/AiAssistantPanel'
import {
  tasks,
  getAdminStats,
  getCouponItemsForTask,
  ADMIN_TASK_STATUS,
  ADMIN_TASK_STATUS_COLOR,
  BIZ_TASK_STATUS,
  BIZ_TASK_STATUS_COLOR,
  BIZ_COUPON_STATUS,
  BIZ_COUPON_STATUS_COLOR,
} from '../../mock/data'
import styles from './TaskList.module.css'

const adminStatusOptions = [
  { value: '', label: '全部状态' },
  ...Object.values(ADMIN_TASK_STATUS).map((s) => ({ value: s, label: s })),
]

const sourceOptions = [
  { value: '', label: '全部来源' },
  { value: 'OA审批', label: 'OA审批' },
  { value: '手动上传', label: '手动上传' },
]

const BIZ_PAGE_SIZE = 20

const BIZ_TAB_ALL = '全部'

const BIZ_TAB_ORDER = [
  BIZ_TAB_ALL,
  BIZ_TASK_STATUS.PENDING_CONFIRM,
  BIZ_TASK_STATUS.PROCESSING,
  BIZ_TASK_STATUS.CONFIRMED,
  BIZ_TASK_STATUS.DISCARDED,
]

const BIZ_EMPTY_TEXT = {
  [BIZ_TAB_ALL]: '暂无任务',
  [BIZ_TASK_STATUS.PENDING_CONFIRM]: '暂无待确认的任务',
  [BIZ_TASK_STATUS.PROCESSING]: '暂无处理中的任务',
  [BIZ_TASK_STATUS.CONFIRMED]: '暂无已确认的任务',
  [BIZ_TASK_STATUS.DISCARDED]: '暂无已废弃的任务',
}

export default function TaskList({ mode = 'admin' }) {
  const navigate = useNavigate()
  const isAdmin = mode === 'admin'

  // Admin states
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  // Biz states
  const [activeTab, setActiveTab] = useState(BIZ_TASK_STATUS.PENDING_CONFIRM) // default to 待确认
  const [bizSearch, setBizSearch] = useState('')
  const [dateRange, setDateRange] = useState(null)
  const [bizPage, setBizPage] = useState(1)
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(tasks.map((t) => t.id)))

  // Badge counts — global, not affected by search/date filters
  const bizTabCounts = useMemo(() => {
    const counts = { [BIZ_TAB_ALL]: tasks.length }
    for (const status of BIZ_TAB_ORDER) {
      if (status === BIZ_TAB_ALL) continue
      counts[status] = tasks.filter((t) => t.bizStatus === status).length
    }
    return counts
  }, [])

  // Admin filter
  const adminFiltered = useMemo(() => {
    if (!isAdmin) return []
    return tasks.filter((t) => {
      if (search && !t.id.includes(search) && !t.name.includes(search)) return false
      if (statusFilter && t.adminStatus !== statusFilter) return false
      if (sourceFilter && t.source !== sourceFilter) return false
      return true
    })
  }, [isAdmin, search, statusFilter, sourceFilter])

  // Biz filter + sort + paginate → flat data
  const filteredBizTasks = useMemo(() => {
    if (isAdmin) return []
    return tasks
      .filter((t) => {
        if (activeTab !== BIZ_TAB_ALL && t.bizStatus !== activeTab) return false
        if (bizSearch && !t.name.includes(bizSearch)) return false
        if (dateRange && dateRange[0] && dateRange[1]) {
          const ct = new Date(t.createdAt).getTime()
          if (ct < dateRange[0].startOf('day').valueOf() || ct > dateRange[1].endOf('day').valueOf()) return false
        }
        return true
      })
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }, [isAdmin, activeTab, bizSearch, dateRange])

  const paginatedBizTasks = useMemo(() => {
    const start = (bizPage - 1) * BIZ_PAGE_SIZE
    return filteredBizTasks.slice(start, start + BIZ_PAGE_SIZE)
  }, [filteredBizTasks, bizPage])

  const bizFlatData = useMemo(() => {
    if (isAdmin) return []
    return paginatedBizTasks.flatMap((task) => {
      const groupRow = { _type: 'group', _key: `group-${task.id}`, _taskId: task.id, task }
      if (!expandedGroups.has(task.id)) return [groupRow]
      const items = getCouponItemsForTask(task.id).map((item) => ({
        ...item,
        _type: 'item',
        _key: item.id,
        _taskId: task.id,
      }))
      return [groupRow, ...items]
    })
  }, [isAdmin, paginatedBizTasks, expandedGroups])

  const toggleGroup = (taskId) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
  }

  const handleTabChange = (key) => {
    setActiveTab(key)
    setBizPage(1)
  }

  // ---- Admin columns ----
  const adminColumns = [
    { title: '任务编号', dataIndex: 'id', key: 'id', width: 180 },
    { title: '任务名称', dataIndex: 'name', key: 'name', ellipsis: true },
    { title: '来源', dataIndex: 'source', key: 'source', width: 100 },
    { title: '子任务数', dataIndex: 'subTaskCount', key: 'subTaskCount', width: 90 },
    {
      title: '完成进度',
      key: 'progress',
      width: 150,
      render: (_, record) => (
        <Space>
          <Progress
            percent={record.subTaskCount ? Math.round((record.completedCount / record.subTaskCount) * 100) : 0}
            size="small"
            style={{ width: 80 }}
            showInfo={false}
          />
          <span style={{ fontSize: 13, color: '#4e5969' }}>
            {record.completedCount}/{record.subTaskCount}
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
      width: 100,
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => navigate(`/admin/tasks/${record.id}`)}>
          查看详情
        </Button>
      ),
    },
  ]

  // ---- Biz columns (grouped table) ----
  const BIZ_COL_COUNT = 6
  const groupCellProps = (record, isFirst) => {
    if (record._type !== 'group') return {}
    return isFirst ? { colSpan: BIZ_COL_COUNT } : { colSpan: 0 }
  }

  const bizColumns = [
    {
      title: '券名称',
      key: 'name',
      ellipsis: true,
      onCell: (record) => groupCellProps(record, true),
      render: (_, record) => {
        if (record._type === 'group') {
          const t = record.task
          const expanded = expandedGroups.has(t.id)
          return (
            <div className={styles.groupRowContent} onClick={() => toggleGroup(t.id)}>
              <DownOutlined className={`${styles.groupArrow} ${expanded ? '' : styles.groupArrowCollapsed}`} />
              <Tag color="blue">{t.name}</Tag>
              {t.oaNumber && <span style={{ color: '#86909c', fontSize: 13 }}>{t.oaNumber}</span>}
              <span style={{ color: '#86909c', fontSize: 13 }}>共 {t.totalCouponCount} 张券</span>
              <span style={{ color: '#b5b5b5', fontSize: 12 }}>{t.createdAt}</span>
              <Tag color={BIZ_TASK_STATUS_COLOR[t.bizStatus]}>{t.bizStatus}</Tag>
            </div>
          )
        }
        return record.name
      },
    },
    {
      title: '券类型',
      key: 'type',
      width: 80,
      onCell: (record) => groupCellProps(record, false),
      render: (_, record) => record.ext?.type,
    },
    {
      title: '面额',
      key: 'amount',
      width: 80,
      onCell: (record) => groupCellProps(record, false),
      render: (_, record) => record.ext?.amount,
    },
    {
      title: '适用范围',
      key: 'scope',
      width: 100,
      onCell: (record) => groupCellProps(record, false),
      render: (_, record) => record.ext?.scope,
    },
    {
      title: '状态',
      key: 'bizStatus',
      width: 90,
      onCell: (record) => groupCellProps(record, false),
      render: (_, record) => {
        const s = record.ext?.bizStatus
        return s ? <Tag color={BIZ_COUPON_STATUS_COLOR[s]}>{s}</Tag> : null
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      onCell: (record) => groupCellProps(record, false),
      render: (_, record) => {
        const s = record.ext?.bizStatus
        if (s === BIZ_COUPON_STATUS.CONFIRMED) {
          return (
            <Space>
              <Button type="link" size="small">查看</Button>
              <Button type="link" size="small">编辑</Button>
            </Space>
          )
        }
        if (s === BIZ_COUPON_STATUS.PENDING_CONFIRM) {
          return (
            <Space>
              <Button type="link" size="small">去确认</Button>
              <Button type="link" size="small" style={{ color: '#86909c' }}>废弃</Button>
            </Space>
          )
        }
        if (s === BIZ_COUPON_STATUS.DISCARDED) {
          return <span style={{ color: '#b5b5b5', fontSize: 13 }}>已废弃</span>
        }
        return null
      },
    },
  ]

  // ---- Admin stats ----
  const renderAdminStats = () => {
    const stats = getAdminStats()
    return (
      <Row gutter={16} className={styles.statsRow}>
        <Col flex={1}>
          <Card size="small"><Statistic title="总任务数" value={stats.total} /></Card>
        </Col>
        <Col flex={1}>
          <Card size="small">
            <Statistic title="创建中" value={stats.processing} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col flex={1}>
          <Card size="small">
            <Statistic title="草稿已就绪" value={stats.draftReady} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col flex={1}>
          <Card size="small">
            <Statistic title="部分异常" value={stats.partialError} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col flex={1}>
          <Card size="small">
            <Statistic title="异常" value={stats.error} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>
    )
  }

  // ---- Biz Tabs ----
  const isHighPriorityTab = (status) =>
    status !== BIZ_TAB_ALL && (status === BIZ_TASK_STATUS.PENDING_CONFIRM || status === BIZ_TASK_STATUS.PROCESSING)

  const bizTabItems = BIZ_TAB_ORDER.map((status) => ({
    key: status,
    label: (
      <span>
        {status}
        <Badge
          count={bizTabCounts[status]}
          style={{
            marginLeft: 6,
            backgroundColor: !bizTabCounts[status] ? '#d9d9d9' : isHighPriorityTab(status) ? '#ff4d4f' : '#d9d9d9',
          }}
          size="small"
          showZero
        />
      </span>
    ),
  }))

  // ---- Render ----
  if (!isAdmin) {
    return (
      <div className={styles.page}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>AI 建券</h1>
            <p className={styles.subtitle}>AI 自动创建优惠券</p>
          </div>
          <AiAssistantPanel />
        </div>

        <Card size="small">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={bizTabItems}
          />

          <Space wrap className={styles.bizFilterRow}>
            <Input
              placeholder="搜索活动名称"
              prefix={<SearchOutlined />}
              value={bizSearch}
              onChange={(e) => { setBizSearch(e.target.value); setBizPage(1) }}
              style={{ width: 240 }}
              allowClear
            />
            <DatePicker.RangePicker
              value={dateRange}
              onChange={(val) => { setDateRange(val); setBizPage(1) }}
              placeholder={['开始日期', '结束日期']}
            />
          </Space>

          {bizFlatData.length > 0 ? (
            <>
              <Table
                dataSource={bizFlatData}
                columns={bizColumns}
                rowKey="_key"
                size="middle"
                pagination={false}
                rowClassName={(record) => record._type === 'group' ? styles.groupRow : ''}
                style={{ marginTop: 16 }}
              />
              {filteredBizTasks.length > BIZ_PAGE_SIZE && (
                <div className={styles.bizPagination}>
                  <Pagination
                    current={bizPage}
                    pageSize={BIZ_PAGE_SIZE}
                    total={filteredBizTasks.length}
                    onChange={(p) => setBizPage(p)}
                    showTotal={(total) => `共 ${total} 个任务`}
                    showSizeChanger={false}
                    size="small"
                  />
                </div>
              )}
            </>
          ) : (
            <Empty description={BIZ_EMPTY_TEXT[activeTab]} style={{ padding: '48px 0' }} />
          )}
        </Card>
      </div>
    )
  }

  // Admin mode
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>任务管理</h1>
        <p className={styles.subtitle}>AI 自动化任务管理</p>
      </div>

      {renderAdminStats()}

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
            options={adminStatusOptions}
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
          dataSource={adminFiltered}
          columns={adminColumns}
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
