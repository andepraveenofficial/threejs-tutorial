# ThreeJS Setup

### Steps

1. Create `HTML` file
1. Create `Script` file

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>threeJS app</title>
		<script type="importmap">
			{
				"imports": {
					"three": "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js",
					"three/addons/": "https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/"
				}
			}
		</script>
	</head>
	<body>
		<h1>ThreeJS</h1>
		<script type="module" src="./index.js"></script>
	</body>
</html>
```

```js
import * as THREE from "three";

console.log(THREE);
```

### Installation

- `npm install`

### Start the Application

- Run the `index.html` on Live Server
