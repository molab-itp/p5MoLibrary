---
title: Heavenly3D
---
<SwmPath>[src/demo/Heavenly3D/index.html](/src/demo/Heavenly3D/index.html)</SwmPath> <SwmToken path="/src/demo/Heavenly3D/index.html" pos="13:7:7" line-data="    &lt;script src=&quot;HeavenlyBody.js?v=40&quot;&gt;&lt;/script&gt;">`HeavenlyBody`</SwmToken> class is used to integrate WEBGL with 2D canvas.&nbsp;&nbsp;

<SwmSnippet path="/src/demo/Heavenly3D/HeavenlyBody.js" line="4">

---

props argument is used to pass initial values to class using Object.assign

```javascript
class HeavenlyBody {
```

---

</SwmSnippet>

<SwmSnippet path="/src/demo/Heavenly3D/a_sketch.js" line="39">

---

use of HeavelyBody to create my.earth instance

```
  make_earth();
```

---

</SwmSnippet>

<SwmSnippet path="src/demo/Heavenly3D/make.js" line="20">

---

object literal passed to HeavelyBody to create my.earth

```
  my.earth = new HeavenlyBody({ x, y, width, height, img, orbitControl });
```

---

</SwmSnippet>

<SwmSnippet path="/src/demo/Heavenly3D/a_sketch.js" line="1">

---

reference to p5js sketch that mirrors this code

```javascript
// https://editor.p5js.org/jht9629-nyu/sketches/6VM5IMP4m
```

---

</SwmSnippet>

<SwmToken path="/src/demo/Heavenly3D/a_sketch.js" pos="12:9:9" line-data="  let path = &#39;../../assets&#39;;">`assets`</SwmToken>assests folder reference in p5js sketch is replaces with assets-lorez contents and path updated in the sketch.

<SwmPath>[src/demo/Heavenly3D/index.html](/src/demo/Heavenly3D/index.html)</SwmPath> back to index.hmtl - note modifications notes for p5 sketch sync

<SwmSnippet path="/src/demo/Heavenly3D/index.html" line="22">

---

changes to make when code is put in p5js editor

```
remove ?v=
```

---

</SwmSnippet>

<SwmSnippet path="/src/demo/Heavenly3D/a_sketch.js" line="35">

---

setup the image panning and zooming

```javascript
  init_pan();
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcDVtb0xpYnJhcnklM0ElM0Ftb2xhYi1pdHA=" repo-name="p5moLibrary"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
