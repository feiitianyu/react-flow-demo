import React, { useState, useCallback, useMemo, useEffect, useLayoutEffect } from "react";
import ReactFlow, { Background, Handle, Position, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider, Panel, Controls } from "reactflow";
import Dagre from '@dagrejs/dagre'
import { Button, Modal, Popover } from 'antd'
import { WifiOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import screen from '../../media/imgs/screen.jpg'
import exchangeboard from '../../media/imgs/exchangeboard.jpg'

import 'reactflow/dist/style.css'
import './index.css'

const Label = ({ img, name, desc }) => {
  let content = (<div className='show' >
    <img src={img} style={{ width: 80 }} />
    <div style={{ marginLeft: 20 }}>
      <div>{name} <StarFilled style={{ marginLeft: 10, color: '#fc9434' }} /></div>
      <div>Mac地址：097897</div>
      <div>IP地址：192.168.1.1</div>
    </div>
  </div>);
  return (
    <Popover content={content} placement="topLeft">
      <div className='label-container' >
        <img src={img} className="label-img" />
        <div className="name-desc-container">
          <div className='label-name'>{name}</div>
          <div className='label-desc'>{desc}</div>
        </div>
        <div style={{ display: 'flex' }}>
          {name === 'cp3' && <WifiOutlined style={{ color: '#cf4036' }} />}
          {name === 'cp3' && <StarFilled style={{ marginLeft: 4, color: '#fc9434' }} />}
          {name !== 'cp3' && <WifiOutlined style={{ color: '#00D899' }} />}
          {name !== 'cp3' && <StarOutlined style={{ marginLeft: 4, color: '#00D899' }} />}
        </div>
      </div>
    </Popover>

  )
}

// const CustomNode = ({ data }) => {

//   return (
//     <div style={{ border: '1px solid #e1e1e1', padding: 10 }}>
//       <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
//         <img src={data.img} style={{ width: '100%' }} />
//         <div>
//           <div>{data.name}</div>
//           <div>{data.desc}</div>
//         </div>
//         <div style={{ display: 'flex' }}>
//         <WifiOutlined style={{ color: '#00D899' }} />
//         <StarOutlined style={{ marginLeft: 4, color: '#00D899' }} />
//       </div>
//       </div>
//       <Handle type='source' position={Position.Right} />
//       <Handle type='target' position={Position.Left} />
//     </div>
//   )
// }

const initialNodes = [
  { id: '1', data: { label: <Label img={exchangeboard} name='5楼-DP100' desc='易科分控' /> }, position: { x: 0, y: 270 }, sourcePosition: 'right', style: { width: 180 } },
  { id: '2', data: { label: <Label img={exchangeboard} name='按键面板' desc='EZpro ips' /> }, position: { x: 250, y: 0 }, targetPosition: 'left', style: { width: 180 } },
  { id: '3', data: { label: <Label img={exchangeboard} name='ZOOM' desc='ZOOM ZR' /> }, position: { x: 250, y: 60 }, targetPosition: 'left', style: { width: 180 } },
  { id: '4', data: { label: <Label img={exchangeboard} name='左摄像头' desc='B8 系列' /> }, position: { x: 250, y: 120 }, targetPosition: 'left', style: { width: 180 } },
  { id: '5', data: { label: <Label img={exchangeboard} name='右摄像头' desc='B8 系列' /> }, position: { x: 250, y: 180 }, targetPosition: 'left', style: { width: 180 } },
  { id: '6', data: { label: <Label img={exchangeboard} name='时序电源' desc='FUN' /> }, position: { x: 250, y: 240 }, targetPosition: 'left', style: { width: 180 } },
  { id: '7', data: { label: <Label img={exchangeboard} name='cp3' desc='CRE' /> }, position: { x: 250, y: 300 }, targetPosition: 'left', sourcePosition: 'right', style: { width: 180 } },
  { id: '8', data: { label: <Label img={exchangeboard} name='音频处理器' desc='SPR' /> }, position: { x: 250, y: 360 }, targetPosition: 'left', style: { width: 180 } },
  { id: '9', data: { label: <Label img={exchangeboard} name='空调2' desc='DOKIN' /> }, position: { x: 250, y: 420 }, targetPosition: 'left', style: { width: 180 } },
  { id: '10', data: { label: <Label img={exchangeboard} name='空调1' desc='DOKIN' /> }, position: { x: 250, y: 480 }, targetPosition: 'left', style: { width: 180 } },
  { id: '11', data: { label: <Label img={exchangeboard} name='天花吊麦' desc='SHURE' /> }, position: { x: 250, y: 540 }, targetPosition: 'left', style: { width: 180 } },
  { id: '12', data: { label: <Label img={exchangeboard} name='显示器' desc='LE' /> }, position: { x: 500, y: 180 }, targetPosition: 'left', style: { width: 180 } },
  { id: '13', data: { label: <Label img={exchangeboard} name='鼠标' desc='LE' /> }, position: { x: 500, y: 240 }, targetPosition: 'left', style: { width: 180 } },
  { id: '14', data: { label: <Label img={exchangeboard} name='投影仪' desc='CRM' /> }, position: { x: 500, y: 300 }, targetPosition: 'left', style: { width: 180 } },
  { id: '15', data: { label: <Label img={exchangeboard} name='DMPS矩阵' desc='CRM' /> }, position: { x: 500, y: 360 }, targetPosition: 'left', style: { width: 180 } },
  { id: '16', data: { label: <Label img={exchangeboard} name='灯光' desc='EZpro' /> }, position: { x: 500, y: 420 }, targetPosition: 'left', style: { width: 180 } },
]

const initialEdges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '1-3', source: '1', target: '3' },
  { id: '1-4', source: '1', target: '4' },
  { id: '1-5', source: '1', target: '5' },
  { id: '1-6', source: '1', target: '6' },
  { id: '1-7', source: '1', target: '7' },
  { id: '1-8', source: '1', target: '8' },
  { id: '1-9', source: '1', target: '9' },
  { id: '1-10', source: '1', target: '10' },
  { id: '1-11', source: '1', target: '11' },
  { id: '7-12', source: '7', target: '12' },
  { id: '7-13', source: '7', target: '13' },
  { id: '7-14', source: '7', target: '14' },
  { id: '7-15', source: '7', target: '15' },
  { id: '7-16', source: '7', target: '16' },
]

const LayoutFlow = () => {
  // const nodeTypes = useMemo(() => ({ wrapper: CustomNode }), [])
  const { fitView } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      fitView
      // nodeTypes={nodeTypes}
      attributionPosition="bottom-left"
      defaultEdgeOptions={{ type: 'step', markerEnd: { type: 'arrowclosed' } }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}

const Flow = () => {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  )
}

export default Flow
