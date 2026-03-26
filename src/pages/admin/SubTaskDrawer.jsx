import { Drawer, Descriptions, Timeline, Tag, Button, Space, Alert, Table } from 'antd'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { ADMIN_COUPON_STATUS, ADMIN_COUPON_STATUS_COLOR } from '../../mock/data'
import styles from './SubTaskDrawer.module.css'

const stepIconMap = {
  done: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  running: <SyncOutlined spin style={{ color: '#1677ff' }} />,
  pending: <MinusCircleOutlined style={{ color: '#d9d9d9' }} />,
  failed: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
}

const stepColorMap = {
  done: 'green',
  running: 'blue',
  pending: 'gray',
  failed: 'red',
}

const itemStatusColorMap = {
  '已完成': 'success',
  '创建中': 'processing',
  '排队中': 'default',
  '失败': 'error',
}

function renderExtBySkillType(subTask) {
  const { skillType, ext, items } = subTask

  switch (skillType) {
    case '建活动':
      return (
        <Descriptions column={2} size="small">
          <Descriptions.Item label="活动类型">{ext?.activityType || '—'}</Descriptions.Item>
          <Descriptions.Item label="预算">{ext?.budget || '—'}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{ext?.startTime || '—'}</Descriptions.Item>
          <Descriptions.Item label="结束时间">{ext?.endTime || '—'}</Descriptions.Item>
        </Descriptions>
      )

    case '创建人群':
      return (
        <Descriptions column={2} size="small">
          <Descriptions.Item label="人群规模">{ext?.crowdSize || '—'}</Descriptions.Item>
          <Descriptions.Item label="人群ID">{ext?.crowdId || '—'}</Descriptions.Item>
          <Descriptions.Item label="标签" span={2}>{ext?.tags || '—'}</Descriptions.Item>
        </Descriptions>
      )

    case '建活动落地页':
      return (
        <Descriptions column={1} size="small">
          <Descriptions.Item label="模板名称">{ext?.templateName || '—'}</Descriptions.Item>
          <Descriptions.Item label="页面链接">
            {ext?.pageUrl ? <a href={ext.pageUrl} target="_blank" rel="noreferrer">{ext.pageUrl}</a> : '—'}
          </Descriptions.Item>
        </Descriptions>
      )

    case '建券':
      if (!items || items.length === 0) {
        return <div style={{ color: '#86909c', fontSize: 13 }}>暂无券数据</div>
      }
      return (
        <Table
          dataSource={items}
          rowKey="id"
          size="small"
          pagination={false}
          columns={[
            { title: '券名称', dataIndex: 'name', key: 'name', ellipsis: true },
            {
              title: '类型',
              key: 'type',
              width: 60,
              render: (_, r) => r.ext?.type,
            },
            {
              title: '面额',
              key: 'amount',
              width: 60,
              render: (_, r) => r.ext?.amount,
            },
            {
              title: '状态',
              key: 'status',
              width: 80,
              render: (_, r) => <Tag color={itemStatusColorMap[r.status]}>{r.status}</Tag>,
            },
          ]}
        />
      )

    default:
      return null
  }
}

export default function SubTaskDrawer({ subTask, onClose }) {
  if (!subTask) return null

  return (
    <Drawer
      title={
        <Space>
          <span>{subTask.name}</span>
          <Tag color="blue">{subTask.skillType}</Tag>
        </Space>
      }
      open={!!subTask}
      onClose={onClose}
      width={480}
    >
      <div className={styles.section}>
        <div className={styles.sectionTitle}>通用信息</div>

        <div className={styles.subsection}>
          <div className={styles.subsectionTitle}>执行链路</div>
          <Timeline
            items={subTask.execSteps.map((step) => ({
              dot: stepIconMap[step.status],
              color: stepColorMap[step.status],
              children: (
                <div className={styles.timelineItem}>
                  <span>{step.step}</span>
                  {step.duration && <span className={styles.duration}>{step.duration}</span>}
                </div>
              ),
            }))}
          />
        </div>

        {subTask.errors.length > 0 && (
          <div className={styles.subsection}>
            <div className={styles.subsectionTitle}>异常记录</div>
            {subTask.errors.map((err, i) => (
              <Alert key={i} message={err} type="error" showIcon style={{ marginBottom: 8 }} />
            ))}
          </div>
        )}

        <div className={styles.footer}>
          {subTask.status === ADMIN_COUPON_STATUS.FAILED && (
            <Button type="primary" danger block>
              重试
            </Button>
          )}
          {subTask.status === ADMIN_COUPON_STATUS.COMPLETED && subTask.skillType === '建券' && subTask.items?.length > 0 && (
            <Button type="primary" block>
              去确认草稿
            </Button>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>扩展信息（{subTask.skillType}）</div>
        {renderExtBySkillType(subTask)}
      </div>
    </Drawer>
  )
}
