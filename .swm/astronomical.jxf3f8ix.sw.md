---
title: Astronomical
---

<SwmPath>[src/demos/Astronomical/index.html](/src/demos/Astronomical/index.html)</SwmPath>

A big screen presentation of infographic listing 210 notable astronomical objects from\
<https://en.wikipedia.org/wiki/Astronomical_object> and <https://commons.wikimedia.org/wiki/File:The_Celestial_Zoo_infographic_wikimedia.png>\
"Infographic listing 210 notable astronomical objects marked on a central logarithmic map of the observable universe. A small view and some distinguishing features are included for each astronomical object "

JSON is created to mark regions, saved in local storage, and downloaded to file which is incorporated back into the sketch as <SwmToken path="/src/demos/Astronomical/refBox_init.js" pos="1:2:2" line-data="let refBox_init = {">`refBox_init`</SwmToken>

<SwmSnippet path="src/demos/Astronomical/refBox_init.js" line="1">

---

pair of regions that identify an astrononmical object&nbsp;

```
let refBox_init = {
```

---

</SwmSnippet>

```javascript
src/lib/0/RefBox.js
  //   refs: [{ label: '', pts: [{ x, y, w, h, z }, { x, y, w, h, z }], i } ]
  //   refs: [{ label: '', regions: [{ x, y, w, h, z }, { x, y, w, h, z }], i } ]
  pts --> regions

export class Pane {
  ptsIndex --> regionIndex
  pt() { --> region()

```

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcDVtb0xpYnJhcnklM0ElM0Ftb2xhYi1pdHA=" repo-name="p5moLibrary"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
