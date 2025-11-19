export const TestType = [
  {
    "name": "TOEIC",
    "part": 7,
    "number": 200
  },
  {
    "name": "Ielts",
    "part": 2,
    "number": 80
  },
];

export const PartLengthToeic = [
  {
    "part": 1,
    "length": 6,
    "start": 1
  },
  {
    "part": 2,
    "length": 25,
    "start": 7
  },
  {
    "part": 3,
    "length": 39,
    "start": 32
  },
  {
    "part": 4,
    "length": 30,
    "start": 71
  },
  {
    "part": 5,
    "length": 30,
    "start": 101
  },
  {
    "part": 6,
    "length": 16,
    "start": 131
  },
  {
    "part": 7,
    "length": 54,
    "start": 149
  },
];

export const category = [
  {
    "type": "",
    "children": [
      { "icon": "BarsOutlined", "type": "Tất cả", "count": 45, "color": "#155dfc" },
      { "icon": "CustomerServiceOutlined", "type": "IELTS", "count": 42, "color": "#00a63e" },
      { "icon": "EditOutlined", "type": "TOEIC", "count": 21, "color": "#fdc700" },
      { "icon": "AudioOutlined", "type": "TOEFL", "count": 20, "color": "#fb2c36" }
    ]
  },
  {
    "type": "IELTS",
    "children": [
      { "icon": "ReadOutlined", "type": "Reading", "count": 45, "color": "#155dfc" },
      { "icon": "CustomerServiceOutlined", "type": "Listening", "count": 42, "color": "#00a63e" },
      { "icon": "EditOutlined", "type": "Writing", "count": 21, "color": "#fdc700" },
      { "icon": "AudioOutlined", "type": "Speaking", "count": 20, "color": "#fb2c36" }
    ]
  },
  {
    "type": "TOEIC",
    "children": [
      { "icon": "ReadOutlined", "type": "Reading", "count": 42, "color": "#155dfc" },
      { "icon": "CustomerServiceOutlined", "type": "Listening", "count": 42, "color": "#00a63e" },
      { "icon": "FileDoneOutlined", "type": "Full Test", "count": 44, "color": "#fdc700" }
    ]
  },
  {
    "type": "TOEFL",
    "children": [
      { "icon": "ReadOutlined", "type": "Reading", "count": 42, "color": "#155dfc" },
      { "icon": "CustomerServiceOutlined", "type": "Listening", "count": 42, "color": "#00a63e" },
      { "icon": "EditOutlined", "type": "Writing", "count": 22, "color": "#fdc700" },
      { "icon": "AudioOutlined", "type": "Speaking", "count": 22, "color": "#fb2c36" }
    ]
  },
  {
    "type": "Khác",
    "children": [
      { "icon": "CalculatorOutlined", "type": "SAT", "count": 18, "color": "#155dfc" },
      { "icon": "ReadOutlined", "type": "Cambridge", "count": 18, "color": "#00a63e" },
      { "icon": "FileTextOutlined", "type": "VSTEP", "count": 18, "color": "#fdc700" },
      { "icon": "GlobalOutlined", "type": "PTE", "count": 18, "color": "#fb2c36" }
    ]
  }
]

