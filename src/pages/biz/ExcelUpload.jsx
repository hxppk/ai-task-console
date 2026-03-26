import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Upload, Button, Table, Statistic, Row, Col, message, Space } from 'antd'
import { FileExcelOutlined } from '@ant-design/icons'
import styles from './ExcelUpload.module.css'

const { Dragger } = Upload

const mockParsedCoupons = [
  { key: '1', name: '满50减10通用券', type: '满减', amount: '10元', scope: '全品类' },
  { key: '2', name: '新品8折券', type: '折扣', amount: '8折', scope: '新品类目' },
  { key: '3', name: '新客立减5元', type: '立减', amount: '5元', scope: '新客专享' },
]

const parsedColumns = [
  { title: '券名称', dataIndex: 'name', key: 'name' },
  { title: '券类型', dataIndex: 'type', key: 'type', width: 80 },
  { title: '面额', dataIndex: 'amount', key: 'amount', width: 80 },
  { title: '适用范围', dataIndex: 'scope', key: 'scope', width: 120 },
]

export default function ExcelUpload() {
  const navigate = useNavigate()
  const [couponFile, setCouponFile] = useState(null)
  const [storeFile, setStoreFile] = useState(null)

  const bothUploaded = couponFile && storeFile

  const uploadProps = (setter) => ({
    accept: '.xlsx,.xls,.csv',
    maxCount: 1,
    beforeUpload: (file) => {
      setter(file)
      return false
    },
    onRemove: () => setter(null),
  })

  const handleCreate = () => {
    message.success('任务创建成功，即将跳转任务列表')
    setTimeout(() => navigate('/biz/tasks'), 1500)
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>上传 Excel 建券</h1>
      <p className={styles.subtitle}>上传建券字段和门店清单 Excel，系统将自动解析并创建建券任务</p>

      <Row gutter={16}>
        <Col span={12}>
          <Card size="small" title="建券字段 Excel">
            <Dragger {...uploadProps(setCouponFile)}>
              <p className="ant-upload-drag-icon"><FileExcelOutlined /></p>
              <p className="ant-upload-text">点击或拖拽上传建券字段 Excel</p>
              <p className="ant-upload-hint">支持 .xlsx / .xls / .csv</p>
            </Dragger>
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" title="门店清单 Excel">
            <Dragger {...uploadProps(setStoreFile)}>
              <p className="ant-upload-drag-icon"><FileExcelOutlined /></p>
              <p className="ant-upload-text">点击或拖拽上传门店清单 Excel</p>
              <p className="ant-upload-hint">支持 .xlsx / .xls / .csv</p>
            </Dragger>
          </Card>
        </Col>
      </Row>

      {bothUploaded && (
        <Card size="small" title="解析预览" className={styles.previewCard}>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Statistic title="识别券数量" value={mockParsedCoupons.length} suffix="张" />
            </Col>
            <Col span={8}>
              <Statistic title="门店数量" value={128} suffix="家" />
            </Col>
          </Row>
          <Table
            dataSource={mockParsedCoupons}
            columns={parsedColumns}
            size="small"
            pagination={false}
          />
        </Card>
      )}

      <div className={styles.footer}>
        <Space>
          <Button onClick={() => navigate('/biz/tasks')}>取消</Button>
          <Button type="primary" disabled={!bothUploaded} onClick={handleCreate}>
            开始创建任务
          </Button>
        </Space>
      </div>
    </div>
  )
}
