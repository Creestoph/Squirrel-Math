Node
```json
{
  "name": String,
  "data": Object
}
```

Lesson
```json
{
  "name": "Lesson",
  "data":
  {
    "routeShortVersion": String,
    "routeLongVersion": String,
    "title": LessonTitle,
    "intro": LessonIntro,
    "chapters": [LessonChapter]
  }
}
```

LessonTitle
```json
{
  "name": "LessonTitle",
  "data": String,
}
```

LessonIntro
```json
{
  "name": "LessonIntro",
  "data": [Node],
}
```

LessonChapter
```json
{
  "name": "LessonChapter",
  "data": 
  {
    title: String,
    nodes: [Node],
  },
}
```
