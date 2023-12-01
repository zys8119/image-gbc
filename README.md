# image-gbc
图形边界坐标生成


## 使用教程

```typescript

import img from "./15558.png?url"
import imageGbc from "image-gbc"

/// tolerance 默认0.1，可不填写，更多参数请查看类型
const results = await imageGbc(img, {tolerance:0.1})
console.log(results)
```
