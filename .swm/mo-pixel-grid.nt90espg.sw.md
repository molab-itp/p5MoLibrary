---
title: mo-pix-chip-grid
---

**src/mo-pix-chip-grid** uses the firebase library to store and read data from a realtime database `my.dbase_rootPath` `my.roomName`

<SwmToken path="/src/demo/mo-pix-chip-grid/dbase_site_event.js" pos="25:11:11" line-data="  let path = `${my.dbase_rootPath}/${my.roomName}/device/${my.uid}`;">`dbase_rootPath`</SwmToken>

<SwmToken path="/src/demo/mo-pix-chip-grid/dbase_site_event.js" pos="25:17:17" line-data="  let path = `${my.dbase_rootPath}/${my.roomName}/device/${my.uid}`;">`roomName`</SwmToken>

<SwmSnippet path="/src/demo/mo-pix-chip-grid/dbase_site_event.js" line="25">

---

firebase realtime database path for list of devices

```
  let path = `${my.dbase_rootPath}/${my.roomName}/device/${my.uid}`;
```

---

</SwmSnippet>

\
<SwmPath>[src/demo/mo-pix-chip-grid/index.html](/src/demo/mo-pix-chip-grid/index.html)</SwmPath> includes the library. When the script is in p5js editor, this link will be directly to the github pages for the library.

The query append to each `src=` reference in index file is to force reload from the cache for github pages or other deploy.

<SwmPath>[src/demo/mo-pix-chip-grid/a_sketch.js](/src/demo/mo-pix-chip-grid/a_sketch.js)</SwmPath> Access to firebase begins in with the fb\_.init call. There are two free firebase config accounts that you can use `jht1493` or `jht9629` . If one goes over quota, switch to the other or create your own firebase account and pass the config object to fb\_.init

<SwmSnippet path="/src/demo/mo-pix-chip-grid/a_sketch.js" line="18">

---

establish the connection to firebase using config`'jht9629'` or `'jht1493'`.

```
  // let config = fireb_.init('jht9629');
  let config = fireb_.init('jht1493');
```

---

</SwmSnippet>

### Using your own firebase account

creating your own firebase account and pass the config object to fb\_.init&nbsp;

<SwmToken path="/src/demo/mo-pix-chip-grid/a_sketch.js" pos="18:11:11" line-data="  // let config = fireb_.init(&#39;jht9629&#39;);">`init`</SwmToken>

&nbsp;

&nbsp;

&nbsp;

&nbsp;

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcDVtb0xpYnJhcnklM0ElM0Ftb2xhYi1pdHA=" repo-name="p5moLibrary"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
